"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const market_config_helpers_1 = require("./../../helpers/market-config-helpers");
const constants_1 = require("./../../helpers/constants");
const deploy_ids_1 = require("./../../helpers/deploy-ids");
const constants_2 = require("../../helpers/constants");
const deploy_ids_2 = require("../../helpers/deploy-ids");
const env_1 = require("../../helpers/env");
const helpers_1 = require("../../helpers");
const env_2 = require("../../helpers/env");
const hardhat_1 = require("hardhat");
/**
 * @notice An incentives proxy can be deployed per network or per market.
 * You need to take care to upgrade the incentives proxy to the desired implementation,
 * following the IncentivesController interface to be compatible with ATokens or Debt Tokens.
 */
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const { deploy } = deployments;
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    const isLive = hre.config.networks[network].live;
    const { deployer, incentivesProxyAdmin, incentivesRewardsVault, incentivesEmissionManager, } = await getNamedAccounts();
    const poolConfig = await (0, helpers_1.loadPoolConfig)(env_2.MARKET_NAME);
    const proxyArtifact = await deploy(deploy_ids_2.INCENTIVES_PROXY_ID, {
        from: deployer,
        contract: "InitializableAdminUpgradeabilityProxy",
        args: [],
        deterministicDeployment: hardhat_1.ethers.utils.formatBytes32String("rewards"),
    });
    const emissionManagerArtifact = await deploy(deploy_ids_1.EMISSION_MANAGER_ID, {
        from: deployer,
        contract: "EmissionManager",
        args: [proxyArtifact.address, incentivesEmissionManager],
        ...env_1.COMMON_DEPLOY_PARAMS,
    });
    const proxyAdminSlot = await hre.ethers.provider.getStorageAt(proxyArtifact.address, "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103" // keccak-256 eip1967.proxy.admin sub 1
    );
    if (proxyAdminSlot === constants_1.EMPTY_STORAGE_SLOT) {
        const incentivesImplArtifact = await deploy(deploy_ids_2.INCENTIVES_V2_IMPL_ID, {
            from: deployer,
            contract: "RewardsController",
            args: [],
            ...env_1.COMMON_DEPLOY_PARAMS,
        });
        // Ethers Contract Instances
        const incentivesImpl = (await hre.ethers.getContractAt(incentivesImplArtifact.abi, incentivesImplArtifact.address));
        // Call to initialize at implementation contract to prevent others.
        await (0, helpers_1.waitForTx)(await incentivesImpl.initialize(emissionManagerArtifact.address));
        // Initialize proxy
        const proxy = (await hre.ethers.getContractAt(proxyArtifact.abi, proxyArtifact.address));
        const incentivesInit = incentivesImpl.interface.encodeFunctionData("initialize", [emissionManagerArtifact.address]);
        await (await proxy["initialize(address,address,bytes)"](incentivesImplArtifact.address, incentivesProxyAdmin, incentivesInit)).wait();
    }
    if (!isLive) {
        await deploy(deploy_ids_2.INCENTIVES_PULL_REWARDS_STRATEGY_ID, {
            from: deployer,
            contract: "PullRewardsTransferStrategy",
            args: [
                proxyArtifact.address,
                incentivesEmissionManager,
                incentivesRewardsVault,
            ],
            ...env_1.COMMON_DEPLOY_PARAMS,
        });
        const stakedAaveAddress = isLive
            ? (0, market_config_helpers_1.getParamPerNetwork)(poolConfig.StkAaveProxy, network)
            : (await deployments.getOrNull(deploy_ids_1.STAKE_AAVE_PROXY))?.address;
        if (stakedAaveAddress) {
            await deploy(deploy_ids_1.INCENTIVES_STAKED_TOKEN_STRATEGY_ID, {
                from: deployer,
                contract: "StakedTokenTransferStrategy",
                args: [
                    proxyArtifact.address,
                    incentivesEmissionManager,
                    stakedAaveAddress,
                ],
                ...env_1.COMMON_DEPLOY_PARAMS,
            });
        }
        else {
            console.log("[WARNING] Missing StkAave address. Skipping StakedTokenTransferStrategy deployment.");
        }
    }
    return true;
};
func.id = `Incentives:${env_2.MARKET_NAME}:aave-v3-periphery@${constants_2.V3_PERIPHERY_VERSION}`;
func.tags = ["market", "IncentivesProxy"];
func.dependencies = [];
exports.default = func;
