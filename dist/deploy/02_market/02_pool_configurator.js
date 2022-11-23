"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../../helpers/env");
const deploy_ids_1 = require("../../helpers/deploy-ids");
const func = async function ({ getNamedAccounts, deployments, }) {
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const configuratorLogicArtifact = await get("ConfiguratorLogic");
    await deploy(deploy_ids_1.POOL_CONFIGURATOR_IMPL_ID, {
        contract: "PoolConfigurator",
        from: deployer,
        args: [],
        libraries: {
            ConfiguratorLogic: configuratorLogicArtifact.address,
        },
        ...env_1.COMMON_DEPLOY_PARAMS,
    });
    await deploy(deploy_ids_1.RESERVES_SETUP_HELPER_ID, {
        from: deployer,
        args: [],
        contract: "ReservesSetupHelper",
    });
};
func.id = "PoolConfigurator";
func.tags = ["market"];
exports.default = func;
