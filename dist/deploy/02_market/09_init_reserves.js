"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../helpers/constants");
const market_config_helpers_1 = require("../../helpers/market-config-helpers");
const init_helpers_1 = require("../../helpers/init-helpers");
const deploy_ids_1 = require("../../helpers/deploy-ids");
const env_1 = require("../../helpers/env");
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    const { deployer } = await getNamedAccounts();
    const poolConfig = (await (0, market_config_helpers_1.loadPoolConfig)(env_1.MARKET_NAME));
    const { ATokenNamePrefix, StableDebtTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix, ReservesConfig, } = poolConfig;
    const reservesAddresses = await (0, market_config_helpers_1.getReserveAddresses)(poolConfig, network);
    const treasuryAddress = await (0, market_config_helpers_1.getTreasuryAddress)(poolConfig, network);
    const incentivesController = await deployments.get("IncentivesProxy");
    // Deploy Reserves ATokens
    await (0, init_helpers_1.initReservesByHelper)(ReservesConfig, reservesAddresses, ATokenNamePrefix, StableDebtTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix, deployer, treasuryAddress, incentivesController.address);
    deployments.log(`[Deployment] Initialized all reserves`);
    await (0, init_helpers_1.configureReservesByHelper)(ReservesConfig, reservesAddresses);
    // Save AToken and Debt tokens artifacts
    const dataProvider = await deployments.get(deploy_ids_1.POOL_DATA_PROVIDER);
    await (0, market_config_helpers_1.savePoolTokens)(reservesAddresses, dataProvider.address);
    deployments.log(`[Deployment] Configured all reserves`);
    return true;
};
// This script can only be run successfully once per market, core version, and network
func.id = `ReservesInit:${env_1.MARKET_NAME}:aave-v3-core@${constants_1.V3_CORE_VERSION}`;
func.tags = ["market", "init-reserves"];
func.dependencies = [
    "before-deploy",
    "core",
    "periphery-pre",
    "provider",
    "init-pool",
    "oracles",
];
func.skip = async () => (0, market_config_helpers_1.checkRequiredEnvironment)();
exports.default = func;
