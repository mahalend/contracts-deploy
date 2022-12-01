import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getPoolLibraries } from "../../helpers/contract-getter";
import { L2_POOL_IMPL_ID, POOL_ADDRESSES_PROVIDER_ID } from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import { ConfigNames, isL2PoolSupported, loadPoolConfig } from "../../helpers/market-config-helpers";

const func: DeployFunction = async function ({ getNamedAccounts, deployments, ...hre }: HardhatRuntimeEnvironment) {
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    if (!isL2PoolSupported(poolConfig)) {
        console.log(`[INFO] Skipped L2 Pool due current network '${network}' is not supported`);
        return;
    }
    const { address: addressesProviderAddress } = await deployments.get(POOL_ADDRESSES_PROVIDER_ID);
    const commonLibraries = await getPoolLibraries();
    // Deploy L2 libraries
    const calldataLogicLibrary = await deploy("CalldataLogic", {
        from: deployer,
    });
    // Deploy L2 supported Pool
    await deploy(L2_POOL_IMPL_ID, {
        contract: "L2Pool",
        from: deployer,
        args: [addressesProviderAddress],
        libraries: {
            ...commonLibraries,
            CalldataLogic: calldataLogicLibrary.address,
        },
        ...COMMON_DEPLOY_PARAMS,
    });
};

func.id = "L2PoolImplementations";
func.tags = ["market"];

export default func;
