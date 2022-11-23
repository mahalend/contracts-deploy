"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const utils_1 = require("ethers/lib/utils");
/**
 * The following script runs before the deployment starts
 */
const func = async function ({ getNamedAccounts, deployments, ...hre }) {
    // Print the accounts with their balance before the deployment script
    const { incentivesProxyAdmin } = await getNamedAccounts();
    const proxyAdminBalance = await hre.ethers.provider.getBalance(incentivesProxyAdmin);
    if (proxyAdminBalance.lt((0, utils_1.parseEther)("0.05"))) {
        const [deployer] = await hre.ethers.getSigners();
        await (await deployer.sendTransaction({
            to: incentivesProxyAdmin,
            value: (0, utils_1.parseEther)("0.07"),
        })).wait();
        console.log("- Sent 0.07 ETH to incentives proxy admin");
    }
    const balances = await (0, helpers_1.getWalletBalances)();
    console.log("\nAccounts");
    console.log("========");
    console.table(balances);
};
func.tags = ["before-deploy"];
exports.default = func;
