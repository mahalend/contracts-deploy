"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../helpers/constants");
const deploy_ids_1 = require("../../helpers/deploy-ids");
const env_1 = require("../../helpers/env");
const deploy_ids_2 = require("../../helpers/deploy-ids");
const helpers_1 = require("../../helpers");
/**
 * @notice A treasury proxy can be deployed per network or per market.
 * You need to take care to upgrade this proxy to the desired implementation.
 */
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const { deploy } = deployments;
    const { deployer, treasuryProxyAdmin } = await getNamedAccounts();
    // Deploy Treasury proxy
    const treasuryProxyArtifact = await deploy(deploy_ids_2.TREASURY_PROXY_ID, {
        from: deployer,
        contract: "InitializableAdminUpgradeabilityProxy",
        args: [],
    });
    // Deploy Treasury Controller
    const treasuryController = await deploy(deploy_ids_1.TREASURY_CONTROLLER_ID, {
        from: deployer,
        contract: "AaveEcosystemReserveController",
        args: [treasuryProxyAdmin],
        ...env_1.COMMON_DEPLOY_PARAMS,
    });
    // Deploy Treasury implementation and initialize proxy
    const treasuryImplArtifact = await deploy(deploy_ids_1.TREASURY_IMPL_ID, {
        from: deployer,
        contract: "AaveEcosystemReserveV2",
        args: [],
        ...env_1.COMMON_DEPLOY_PARAMS,
    });
    const treasuryImpl = (await hre.ethers.getContractAt(treasuryImplArtifact.abi, treasuryImplArtifact.address));
    // Call to initialize at implementation contract to prevent other calls.
    await (0, helpers_1.waitForTx)(await treasuryImpl.initialize(constants_1.ZERO_ADDRESS));
    // Initialize proxy
    const proxy = (await hre.ethers.getContractAt(treasuryProxyArtifact.abi, treasuryProxyArtifact.address));
    const initializePayload = treasuryImpl.interface.encodeFunctionData("initialize", [treasuryController.address]);
    await (0, helpers_1.waitForTx)(await proxy["initialize(address,address,bytes)"](treasuryImplArtifact.address, treasuryProxyAdmin, initializePayload));
    return true;
};
func.tags = ["periphery-pre", "TreasuryProxy"];
func.dependencies = [];
func.id = "Treasury";
exports.default = func;
