import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Bluebird from "bluebird";

import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../../helpers/env";
import {
  checkRequiredEnvironment,
  ConfigNames,
  getParamPerNetwork,
  isIncentivesEnabled,
  isProductionMarket,
  loadPoolConfig,
} from "../../../helpers/market-config-helpers";
import {
  FAUCET_ID,
  TESTNET_REWARD_TOKEN_PREFIX,
  TESTNET_TOKEN_PREFIX,
} from "../../../helpers/deploy-ids";
import { eNetwork } from "../../../helpers/types";
import { deployInitializableAdminUpgradeabilityProxy } from "../../../helpers/contract-deployments";
import { waitForTx } from "../../../helpers/utilities/tx";
import { BigNumber } from "ethers";
import { ZERO_ADDRESS } from "../../../helpers/constants";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...DRE
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const {
    deployer,
    incentivesEmissionManager,
    incentivesProxyAdmin,
    incentivesRewardsVault,
  } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);

  const network = process.env.FORK ? process.env.FORK : DRE.network.name;
  console.log("Live network:", !!DRE.config.networks[network].live);
  if (isProductionMarket(poolConfig)) {
    console.log(
      "[Deployment] Skipping testnet token setup at production market"
    );
    // Early exit if is not a testnet market
    return;
  }
  console.log(
    `- Setting up testnet tokens for "${MARKET_NAME}" market at "${network}" network`
  );

  const reservesConfig = poolConfig.ReservesConfig;
  const reserveAddresses = getParamPerNetwork(
    poolConfig.ReserveAssets,
    network as eNetwork
  );
  const reserveSymbols = Object.keys(reservesConfig);
  if (reserveSymbols.length === 0) {
    throw "[Deployment][Error] Missing ReserveAssets configuration";
  }

  // 0. Deployment of ERC20 mintable tokens for testing purposes
  await Bluebird.each(reserveSymbols, async (symbol: string) => {
    if (!reservesConfig[symbol]) {
      throw `[Deployment] Missing token "${symbol}" at ReservesConfig`;
    }
    // WETH9 native mock token already deployed at deploy/01_periphery/02_native_token_gateway.ts
    if (symbol !== poolConfig.WrappedNativeTokenSymbol) {
      if (reserveAddresses && reserveAddresses[symbol] === ZERO_ADDRESS) {
        const tokenArtifact = await deploy(`${symbol}${TESTNET_TOKEN_PREFIX}`, {
          from: deployer,
          contract: "MintableERC20",
          args: [symbol, symbol, reservesConfig[symbol].reserveDecimals],
          ...COMMON_DEPLOY_PARAMS,
        });
        const token = await DRE.ethers.getContractAt(
          tokenArtifact.abi,
          tokenArtifact.address
        );
        await waitForTx(
          await token["mint(address,uint256)"](
            incentivesRewardsVault,
            BigNumber.from(10).pow(18).mul(1e6)
          )
        );
      }
    }
  });

  // 1. Deployment of Faucet helper contract
  console.log("- Deployment of Faucet contract");
  await deploy(FAUCET_ID, {
    from: deployer,
    contract: "ERC20Faucet",
    args: [],
    ...COMMON_DEPLOY_PARAMS,
  });

  if (isIncentivesEnabled(poolConfig)) {
    // 2. Deployment of Reward Tokens
    const rewardSymbols = Object.keys(
      poolConfig.IncentivesConfig.rewards[network as eNetwork] || {}
    );
    for (let y = 0; y < rewardSymbols.length; y++) {
      const reward = rewardSymbols[y];
      const tokenArtifact = await deploy(
        `${reward}${TESTNET_REWARD_TOKEN_PREFIX}`,
        {
          from: deployer,
          contract: "MintableERC20",
          args: [reward, reward, 18],
          ...COMMON_DEPLOY_PARAMS,
        }
      );
      const token = await DRE.ethers.getContractAt(
        tokenArtifact.abi,
        tokenArtifact.address
      );
      await waitForTx(
        await token["mint(address,uint256)"](
          incentivesRewardsVault,
          BigNumber.from(10).pow(18).mul(1e6)
        )
      );
    }
    console.log("Testnet Reserve Tokens");
    console.log("======================");
    const allDeployments = await deployments.all();
    const testnetDeployment = Object.keys(allDeployments).filter((x) =>
      x.includes(TESTNET_TOKEN_PREFIX)
    );
    testnetDeployment.forEach((key) =>
      console.log(key, allDeployments[key].address)
    );
    console.log("Testnet Reward Tokens");
    console.log("======================");
    const rewardDeployment = Object.keys(allDeployments).filter((x) =>
      x.includes(TESTNET_REWARD_TOKEN_PREFIX)
    );
    rewardDeployment.forEach((key) =>
      console.log(key, allDeployments[key].address)
    );
    console.log(
      "Native Token Wrapper WETH9",
      (
        await deployments.get(
          `${poolConfig.WrappedNativeTokenSymbol}${TESTNET_TOKEN_PREFIX}`
        )
      ).address
    );
  }
  console.log(
    "[Deployment][WARNING] Remember to setup the above testnet addresses at the ReservesConfig field inside the market configuration file and reuse testnet tokens"
  );
  console.log(
    "[Deployment][WARNING] Remember to setup the Native Token Wrapper (ex WETH or WMATIC) at `helpers/constants.ts`"
  );
};

func.tags = ["market", "init-testnet", "token-setup"];
func.dependencies = ["before-deploy", "periphery-pre"];
func.skip = async () => checkRequiredEnvironment();

export default func;
