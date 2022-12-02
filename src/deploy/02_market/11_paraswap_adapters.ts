import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { V3_PERIPHERY_VERSION } from "../../helpers/constants";
import { POOL_ADDRESSES_PROVIDER_ID } from "../../helpers/deploy-ids";

import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import {
  ConfigNames,
  getParamPerNetwork,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { eNetwork } from "../../helpers/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
  const paraswapAugustusRegistry = getParamPerNetwork(
    poolConfig.ParaswapRegistry,
    network as eNetwork
  );
  if (!paraswapAugustusRegistry) {
    console.log(
      "[WARNING] Skipping the deployment of the Paraswap Liquidity Swap and Repay adapters due missing 'ParaswapRegistry' address at pool configuration."
    );
    return;
  }
  const { address: addressesProvider } = await deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );
  await deploy("ParaSwapLiquiditySwapAdapter", {
    from: deployer,
    ...COMMON_DEPLOY_PARAMS,
    args: [addressesProvider, paraswapAugustusRegistry, deployer],
  });
  await deploy("ParaSwapRepayAdapter", {
    from: deployer,
    ...COMMON_DEPLOY_PARAMS,
    args: [addressesProvider, paraswapAugustusRegistry, deployer],
  });
  return true;
};

// This script can only be run successfully once per market, core version, and network
func.id = `ParaswapAdapters:${MARKET_NAME}:aave-v3-periphery@${V3_PERIPHERY_VERSION}`;
func.tags = ["market", "paraswap-adapters"];

export default func;
