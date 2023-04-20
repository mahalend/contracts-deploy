import {
  ConfigNames,
  getReserveAddresses,
  getTreasuryAddress,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import {
  getAToken,
  getPoolAddressesProvider,
} from "../../helpers/contract-getters";
import {
  ATOKEN_IMPL_ID,
  INCENTIVES_PROXY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  STABLE_DEBT_TOKEN_IMPL_ID,
  TREASURY_PROXY_ID,
  VARIABLE_DEBT_TOKEN_IMPL_ID,
} from "../../helpers/deploy-ids";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import { eNetwork } from "../../helpers";
import { ConfiguratorInputTypes } from "../../typechain/@aave/core-v3/contracts/interfaces/IPoolConfigurator";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AbiCoder } from "ethers/lib/utils";

task(`setup-atoken`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { deployer } = await getNamedAccounts();
    const network = FORK ? FORK : (hre.network.name as eNetwork);

    if (!MARKET_NAME) {
      console.error("Missing MARKET_NAME env variable. Exiting.");
      return false;
    }
    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      ReserveAssets,
      ReservesConfig,
    } = await loadPoolConfig(MARKET_NAME);

    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
    const reserves = await getReserveAddresses(poolConfig, network);

    const poolAddressesProvider = await getPoolAddressesProvider(
      await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
    );

    const incentivesController = await getAddressFromJson(
      network,
      INCENTIVES_PROXY_ID
    );

    const protocolDataProvider = await getAaveProtocolDataProvider(
      await poolAddressesProvider.getPoolDataProvider()
    );
    const poolConfigurator = await getPoolConfiguratorProxy(
      await poolAddressesProvider.getPoolConfigurator()
    );

    const installedReserves = await protocolDataProvider.getAllReservesTokens();
    const installedAddresses = installedReserves.map((i) => i.tokenAddress);
    const treasuryAddress = await getTreasuryAddress(poolConfig, network);

    const reservesToInstall = Object.keys(reserves);

    for (let x = 0; x < reservesToInstall.length; x++) {
      const symbol = reservesToInstall[x];
      const address = reserves[symbol];
      const reservesParams = ReservesConfig[symbol];

      if (installedAddresses.includes(address)) continue;

      console.log("need to install", address, symbol);

      const aTokenToUse = (await deployments.get(ATOKEN_IMPL_ID)).address;
      // const aTokenToUse = (await deployments.get("MasterchefAToken-Arbitrum"))
      //   .address;
      const stableDebtTokenImplementationAddress = (
        await deployments.get(STABLE_DEBT_TOKEN_IMPL_ID)
      ).address;
      const variableDebtTokenImplementationAddress = await (
        await deployments.get(VARIABLE_DEBT_TOKEN_IMPL_ID)
      ).address;

      const strategyAddress = (
        await deployments.get(`ReserveStrategy-${reservesParams.strategy.name}`)
      ).address;

      // const pid = 21;
      // const chefAddr = "0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3";
      // const encoder = new AbiCoder();

      const input: ConfiguratorInputTypes.InitReserveInputStruct = {
        aTokenImpl: aTokenToUse,
        stableDebtTokenImpl: stableDebtTokenImplementationAddress,
        variableDebtTokenImpl: variableDebtTokenImplementationAddress,
        underlyingAssetDecimals: reservesParams.reserveDecimals,
        interestRateStrategyAddress: strategyAddress,
        underlyingAsset: address,
        treasury: treasuryAddress,
        incentivesController,
        aTokenName: `${ATokenNamePrefix} ${symbol}`,
        aTokenSymbol: `${SymbolPrefix}${symbol}`,
        variableDebtTokenName: `${VariableDebtTokenNamePrefix} Variable Debt ${symbol}`,
        variableDebtTokenSymbol: `variableDebt${SymbolPrefix}${symbol}`,
        stableDebtTokenName: `${StableDebtTokenNamePrefix} Stable Debt ${symbol}`,
        stableDebtTokenSymbol: `stableDebt${SymbolPrefix}${symbol}`,
        params: "0x",
      };

      console.log(input);

      await poolConfigurator.initReserves([input]);
    }
  }
);
