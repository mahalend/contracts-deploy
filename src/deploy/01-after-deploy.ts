import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Bluebird from "bluebird";

import { MARKET_NAME } from "../helpers/env";
import { getPoolConfiguratorProxy } from "../helpers/contract-getter";
import {
  ConfigNames,
  getParamPerNetwork,
  getReserveAddresses,
  isTestnetMarket,
  loadPoolConfig,
} from "../helpers/market-config-helpers";
import { getWalletBalances, waitForTx } from "../helpers/utilities/tx";
import { eNetwork } from "../helpers/types";
import { ZERO_ADDRESS } from "../helpers/constants";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  console.log("=== Post deployment hook ===");
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const poolConfigurator = await getPoolConfiguratorProxy();
  const reservesAddresses = await getReserveAddresses(
    poolConfig,
    network as eNetwork
  );
  const reservesConfig = poolConfig.ReservesConfig;
  if (!reservesConfig) {
    console.log("[Warning] Reserve config not set!");
    return;
  }
  console.log("\n\n+++++ Set up +++++\n\n");
  console.log("- Enable stable borrow in selected assets");
  console.log("Reserves addresses", reservesAddresses);
  await Bluebird.mapSeries(
    Object.keys(reservesAddresses),
    async (symbol: string) => {
      if (reservesConfig[symbol].stableBorrowRateEnabled) {
        console.log(" - Setting enable stable borrow for " + symbol);
        const tx = await waitForTx(
          await poolConfigurator.setReserveStableRateBorrowing(
            reservesAddresses[symbol],
            true
          )
        );
        console.log(
          " - Setup complete enable stable borrow for " +
            symbol +
            "in confirmations " +
            tx.confirmations
        );
      }
    }
  );

  console.log("- Setup debt ceiling");
  await Bluebird.mapSeries(
    Object.keys(reservesAddresses),
    async (symbol: string) => {
      if (
        reservesConfig[symbol].debtCeiling &&
        Number(reservesConfig[symbol].debtCeiling) > 0
      ) {
        console.log(" - Setting debt ceiling for " + symbol);
        const tx = await waitForTx(
          await poolConfigurator.setDebtCeiling(
            reservesAddresses[symbol],
            reservesConfig[symbol].debtCeiling
          )
        );
        console.log(
          " - Setup complete debt ceiling for " +
            symbol +
            "in confirmations " +
            tx.confirmations
        );
      }
    }
  );

  console.log("- Setup Borrowable assets in Isolation Mode");
  await Bluebird.mapSeries(
    Object.keys(reservesAddresses),
    async (symbol: string) => {
      if (reservesConfig[symbol].borrowableIsolation) {
        console.log(" - Setting borrowable isolation for " + symbol);
        const tx = await waitForTx(
          await poolConfigurator.setBorrowableInIsolation(
            reservesAddresses[symbol],
            true
          )
        );
        console.log(
          " - Setup complete borrowable isolation for " +
            symbol +
            "in confirmations " +
            tx.confirmations
        );
      }
    }
  );

  console.log("- Setup Liquidation protocol fee");
  await Bluebird.mapSeries(
    Object.keys(reservesAddresses),
    async (symbol: string) => {
      if (
        reservesConfig[symbol].liquidationProtocolFee &&
        Number(reservesConfig[symbol].liquidationProtocolFee) > 0
      ) {
        console.log(" - Setting liquidation protocol fee for " + symbol);
        const tx = await waitForTx(
          await poolConfigurator.setLiquidationProtocolFee(
            reservesAddresses[symbol],
            reservesConfig[symbol].liquidationProtocolFee
          )
        );
        console.log(
          " - Setup complete liquidation protocol fee for " +
            symbol +
            "in confirmations " +
            tx.confirmations
        );
      }
    }
  );

  console.log("- Setup E-Modes");
  const EModes = poolConfig.EModes;
  await Bluebird.mapSeries(Object.keys(EModes), async (symbol: string) => {
    const eMode = EModes[symbol];
    console.log(" - Setting Emodes category for " + eMode.label);
    const tx = await waitForTx(
      await poolConfigurator.setEModeCategory(
        eMode.id,
        eMode.ltv,
        eMode.liquidationThreshold,
        eMode.liquidationBonus,
        eMode.oracleId || ZERO_ADDRESS,
        eMode.label
      )
    );

    console.log(
      " - Setup complete Emodes category for " +
        eMode.label +
        "in confirmations " +
        tx.confirmations
    );

    await Bluebird.mapSeries(eMode.assets, async (symbol) => {
      console.log(` - Setting emode category to ${eMode.id} for ${symbol}`);
      const tx = await waitForTx(
        await poolConfigurator.setAssetEModeCategory(
          reservesAddresses[symbol],
          eMode.id
        )
      );
      console.log(
        ` - Setting emode category to ${eMode.id} for ${symbol} ` +
          `completed in ${tx.confirmations} confirmations`
      );
    });
  });

  // TODO: replace this
  // console.log("- Review rate strategies");
  // await hre.run("review-rate-strategies");

  if (isTestnetMarket(poolConfig)) {
    // Unpause pool
    await waitForTx(await poolConfigurator.setPoolPause(false));
    console.log("- Pool unpaused and accepting deposits.");
  }

  let formattedDeployments: any = {};
  let mintableTokens: any = {};

  console.log("\nAccounts after deployment");
  console.log("========");

  console.table(await getWalletBalances());

  // Print deployed contracts
  console.log("\nDeployments");
  console.log("===========");
  const allDeployments = await deployments.all();
  Object.keys(allDeployments).forEach((key) => {
    if (!key.includes("Mintable")) {
      formattedDeployments[key] = {
        address: allDeployments[key].address,
      };
    }
  });

  console.table(formattedDeployments);
  // Print Mintable Reserves and Rewards
  Object.keys(allDeployments).forEach((key) => {
    if (key.includes("Mintable")) {
      mintableTokens[key] = {
        address: allDeployments[key].address,
      };
    }
  });
  console.log("\nMintable Reserves and Rewards");
  console.table(mintableTokens);
};

func.tags = ["after-deploy"];
func.runAtTheEnd = true;

export default func;
