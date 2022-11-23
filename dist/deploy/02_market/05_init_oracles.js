"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const market_config_helpers_1 = require("../../helpers/market-config-helpers");
const deploy_ids_1 = require("../../helpers/deploy-ids");
const constants_1 = require("../../helpers/constants");
const tx_1 = require("../../helpers/utilities/tx");
const typechain_1 = require("../../typechain");
const deploy_ids_2 = require("../../helpers/deploy-ids");
const address_1 = require("@ethersproject/address");
const market_config_helpers_2 = require("../../helpers/market-config-helpers");
const bluebird_1 = __importDefault(require("bluebird"));
const env_1 = require("../../helpers/env");
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const { deployer } = await getNamedAccounts();
    const poolConfig = await (0, market_config_helpers_2.loadPoolConfig)(env_1.MARKET_NAME);
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    const addressesProviderArtifact = await deployments.get(deploy_ids_2.POOL_ADDRESSES_PROVIDER_ID);
    const addressesProviderInstance = (await hre.ethers.getContractAt(addressesProviderArtifact.abi, addressesProviderArtifact.address));
    // 1. Set price oracle
    const configPriceOracle = (await deployments.get(deploy_ids_1.ORACLE_ID)).address;
    const statePriceOracle = await addressesProviderInstance.getPriceOracle();
    if ((0, address_1.getAddress)(configPriceOracle) === (0, address_1.getAddress)(statePriceOracle)) {
        console.log("[addresses-provider] Price oracle already set. Skipping tx.");
    }
    else {
        await (0, tx_1.waitForTx)(await addressesProviderInstance.setPriceOracle(configPriceOracle));
        console.log(`[Deployment] Added PriceOracle ${configPriceOracle} to PoolAddressesProvider`);
    }
    // 2. Set fallback oracle
    const aaveOracle = (await (0, tx_1.getContract)("AaveOracle", await addressesProviderInstance.getPriceOracle()));
    const configFallbackOracle = (await deployments.get(deploy_ids_1.FALLBACK_ORACLE_ID))
        .address;
    const stateFallbackOracle = await aaveOracle.getFallbackOracle();
    if ((0, address_1.getAddress)(configFallbackOracle) === (0, address_1.getAddress)(stateFallbackOracle)) {
        console.log("[aave-oracle] Fallback oracle already set. Skipping tx.");
    }
    else {
        await (0, tx_1.waitForTx)(await aaveOracle.setFallbackOracle(configFallbackOracle));
        console.log(`[Deployment] Added Fallback oracle ${configPriceOracle} to AaveOracle`);
    }
    // 3. If testnet, setup fallback token prices
    if ((0, market_config_helpers_2.isProductionMarket)(poolConfig)) {
        console.log("[Deployment] Skipping testnet token prices setup");
        // Early exit if is not a testnet market
        return true;
    }
    else {
        console.log("[Deployment] Setting up fallback oracle default prices for testnet environment");
        const reserves = await (0, market_config_helpers_2.getReserveAddresses)(poolConfig, network);
        const rewards = (0, market_config_helpers_1.isIncentivesEnabled)(poolConfig)
            ? await (0, market_config_helpers_1.getSubTokensByPrefix)(deploy_ids_1.TESTNET_REWARD_TOKEN_PREFIX)
            : [];
        const rewardsSymbols = rewards.map(({ symbol }) => symbol);
        const symbols = [...Object.keys(reserves), ...rewardsSymbols];
        const allTokens = {
            ...reserves,
        };
        rewards.forEach(({ symbol, artifact: { address } }) => {
            allTokens[symbol] = address;
        });
        // Iterate each token symbol and deploy a mock aggregator
        await bluebird_1.default.each(symbols, async (symbol) => {
            const price = symbol === "StkAave"
                ? constants_1.MOCK_CHAINLINK_AGGREGATORS_PRICES["AAVE"]
                : constants_1.MOCK_CHAINLINK_AGGREGATORS_PRICES[symbol];
            if (!price) {
                throw `[ERROR] Missing mock price for asset ${symbol} at MOCK_CHAINLINK_AGGREGATORS_PRICES constant located at src/constants.ts`;
            }
            await (0, tx_1.waitForTx)(await typechain_1.PriceOracle__factory.connect(configFallbackOracle, await hre.ethers.getSigner(deployer)).setAssetPrice(allTokens[symbol], price));
        });
        console.log("[Deployment] Fallback oracle asset prices updated");
        return true;
    }
};
// This script can only be run successfully once per market, core version, and network
func.id = `InitOracles:${env_1.MARKET_NAME}:aave-v3-core@${constants_1.V3_CORE_VERSION}`;
func.tags = ["market", "oracles"];
func.dependencies = ["before-deploy", "core", "periphery-pre", "provider"];
func.skip = async () => (0, market_config_helpers_2.checkRequiredEnvironment)();
exports.default = func;
