"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const market_config_helpers_1 = require("./../../helpers/market-config-helpers");
const env_1 = require("../../helpers/env");
const constants_1 = require("../../helpers/constants");
const helpers_1 = require("../../helpers");
const env_2 = require("../../helpers/env");
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = (process.env.FORK ? process.env.FORK : hre.network.name);
    const poolConfig = (0, market_config_helpers_1.loadPoolConfig)(env_2.MARKET_NAME);
    // Local networks that are not live or testnet, like hardhat network, will deploy a WETH9 contract as mockup for testing deployments
    if ((0, market_config_helpers_1.isTestnetMarket)(poolConfig)) {
        await deploy(`${poolConfig.WrappedNativeTokenSymbol}${helpers_1.TESTNET_TOKEN_PREFIX}`, {
            from: deployer,
            contract: "NativeWrapperMock",
            args: [
                poolConfig.WrappedNativeTokenSymbol,
                poolConfig.WrappedNativeTokenSymbol,
            ],
            ...env_1.COMMON_DEPLOY_PARAMS,
        });
        return;
    }
    if (!constants_1.WRAPPED_NATIVE_TOKEN_PER_NETWORK[network]) {
        throw `Missing Wrapped native token for network: ${network}, fill the missing configuration at ./helpers/constants.ts`;
    }
};
func.tags = ["periphery-pre", "WrappedNativeToken"];
func.dependencies = [];
func.id = "WrappedNativeToken";
exports.default = func;
