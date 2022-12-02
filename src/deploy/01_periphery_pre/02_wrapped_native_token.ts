import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { WRAPPED_NATIVE_TOKEN_PER_NETWORK } from "../../helpers/constants";
import { TESTNET_TOKEN_PREFIX } from "../../helpers/deploy-ids";

import { eNetwork } from "../../helpers/types";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import {
  ConfigNames,
  isTestnetMarket,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const network: string = process.env.FORK
    ? process.env.FORK
    : hre.network.name;
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);

  // Local networks that are not live or testnet, like hardhat network, will deploy a WETH9 contract as mockup for testing deployments
  if (isTestnetMarket(poolConfig)) {
    await deploy(
      `${poolConfig.WrappedNativeTokenSymbol}${TESTNET_TOKEN_PREFIX}`,
      {
        from: deployer,
        contract: "NativeWrapperMock",
        args: [
          poolConfig.WrappedNativeTokenSymbol,
          poolConfig.WrappedNativeTokenSymbol,
        ],
        ...COMMON_DEPLOY_PARAMS,
      }
    );
    return;
  }

  if (!WRAPPED_NATIVE_TOKEN_PER_NETWORK[network as eNetwork]) {
    throw `Missing Wrapped native token for network: ${network}, fill the missing configuration at ./helpers/constants.ts`;
  }

  return true;
};

func.tags = ["periphery-pre", "WrappedNativeToken"];
func.dependencies = [];
func.id = "WrappedNativeToken";

export default func;
