import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getPoolLibraries } from "../../helpers/contract-getter";
import {
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_IMPL_ID,
} from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import {
  ConfigNames,
  isL2PoolSupported,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const network = process.env.FORK ? process.env.FORK : hre.network.name;

  const { address: addressesProviderAddress } = await get(
    POOL_ADDRESSES_PROVIDER_ID
  );

  if (isL2PoolSupported(poolConfig)) {
    console.log(
      `[INFO] Skipped common Pool due current network '${network}' is not supported`
    );
    return;
  }
  const commonLibraries = await getPoolLibraries();

  // Deploy common Pool contract
  await deploy(POOL_IMPL_ID, {
    contract: "Pool",
    from: deployer,
    args: [addressesProviderAddress],
    libraries: {
      ...commonLibraries,
    },
    ...COMMON_DEPLOY_PARAMS,
  });
};

func.id = "PoolImplementation";
func.tags = ["market"];

export default func;
