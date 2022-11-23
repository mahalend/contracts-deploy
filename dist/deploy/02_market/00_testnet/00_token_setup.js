"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_ids_1 = require("./../../../helpers/deploy-ids");
const env_1 = require("../../../helpers/env");
const market_config_helpers_1 = require("../../../helpers/market-config-helpers");
const deploy_ids_2 = require("../../../helpers/deploy-ids");
const bluebird_1 = __importDefault(require("bluebird"));
const contract_deployments_1 = require("../../../helpers/contract-deployments");
const env_2 = require("../../../helpers/env");
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const { deploy } = deployments;
    const { deployer, incentivesEmissionManager, incentivesProxyAdmin, incentivesRewardsVault, } = await getNamedAccounts();
    const poolConfig = await (0, market_config_helpers_1.loadPoolConfig)(env_2.MARKET_NAME);
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    console.log("Live network:", !!hre.config.networks[network].live);
    if ((0, market_config_helpers_1.isProductionMarket)(poolConfig)) {
        console.log("[Deployment] Skipping testnet token setup at production market");
        // Early exit if is not a testnet market
        return;
    }
    console.log(`- Setting up testnet tokens for "${env_2.MARKET_NAME}" market at "${network}" network`);
    const reservesConfig = poolConfig.ReservesConfig;
    const reserveSymbols = Object.keys(reservesConfig);
    if (reserveSymbols.length === 0) {
        throw "[Deployment][Error] Missing ReserveAssets configuration";
    }
    // 0. Deployment of ERC20 mintable tokens for testing purposes
    await bluebird_1.default.each(reserveSymbols, async (symbol) => {
        if (!reservesConfig[symbol]) {
            throw `[Deployment] Missing token "${symbol}" at ReservesConfig`;
        }
        // WETH9 native mock token already deployed at deploy/01_periphery/02_native_token_gateway.ts
        if (symbol !== poolConfig.WrappedNativeTokenSymbol) {
            await deploy(`${symbol}${deploy_ids_2.TESTNET_TOKEN_PREFIX}`, {
                from: deployer,
                contract: "MintableERC20",
                args: [symbol, symbol, reservesConfig[symbol].reserveDecimals],
                ...env_1.COMMON_DEPLOY_PARAMS,
            });
        }
    });
    // 1. Deployment of Faucet helper contract
    console.log("- Deployment of Faucet contract");
    await deploy(deploy_ids_2.FAUCET_ID, {
        from: deployer,
        contract: "ERC20Faucet",
        args: [],
        ...env_1.COMMON_DEPLOY_PARAMS,
    });
    if ((0, market_config_helpers_1.isIncentivesEnabled)(poolConfig)) {
        // 2. Deployment of Reward Tokens
        const rewardSymbols = Object.keys(poolConfig.IncentivesConfig.rewards[network] || {});
        for (let y = 0; y < rewardSymbols.length; y++) {
            const reward = rewardSymbols[y];
            await deploy(`${reward}${deploy_ids_1.TESTNET_REWARD_TOKEN_PREFIX}`, {
                from: deployer,
                contract: "MintableERC20",
                args: [reward, reward, 18],
                ...env_1.COMMON_DEPLOY_PARAMS,
            });
        }
        // 3. Deployment of Stake Aave
        const COOLDOWN_SECONDS = "3600";
        const UNSTAKE_WINDOW = "1800";
        const aaveTokenArtifact = await deployments.get(`AAVE${deploy_ids_2.TESTNET_TOKEN_PREFIX}`);
        const stakeProxy = await (0, contract_deployments_1.deployInitializableAdminUpgradeabilityProxy)(deploy_ids_1.STAKE_AAVE_PROXY);
        // Setup StkAave
        await (0, contract_deployments_1.setupStkAave)(stakeProxy, [
            aaveTokenArtifact.address,
            aaveTokenArtifact.address,
            COOLDOWN_SECONDS,
            UNSTAKE_WINDOW,
            incentivesRewardsVault,
            incentivesEmissionManager,
            (1000 * 60 * 60).toString(),
        ]);
        console.log("Testnet Reserve Tokens");
        console.log("======================");
        const allDeployments = await deployments.all();
        const testnetDeployment = Object.keys(allDeployments).filter((x) => x.includes(deploy_ids_2.TESTNET_TOKEN_PREFIX));
        testnetDeployment.forEach((key) => console.log(key, allDeployments[key].address));
        console.log("Testnet Reward Tokens");
        console.log("======================");
        const rewardDeployment = Object.keys(allDeployments).filter((x) => x.includes(deploy_ids_1.TESTNET_REWARD_TOKEN_PREFIX));
        rewardDeployment.forEach((key) => console.log(key, allDeployments[key].address));
        console.log("Native Token Wrapper WETH9", (await deployments.get(`${poolConfig.WrappedNativeTokenSymbol}${deploy_ids_2.TESTNET_TOKEN_PREFIX}`)).address);
    }
    console.log("[Deployment][WARNING] Remember to setup the above testnet addresses at the ReservesConfig field inside the market configuration file and reuse testnet tokens");
    console.log("[Deployment][WARNING] Remember to setup the Native Token Wrapper (ex WETH or WMATIC) at `helpers/constants.ts`");
};
func.tags = ["market", "init-testnet", "token-setup"];
func.dependencies = ["before-deploy", "periphery-pre"];
func.skip = async () => (0, market_config_helpers_1.checkRequiredEnvironment)();
exports.default = func;
