import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { MARKET_NAME } from "../helpers/env";
import { getPoolConfiguratorProxy } from "../helpers/contract-getter";
import { ConfigNames, isTestnetMarket, loadPoolConfig } from "../helpers/market-config-helpers";
import { waitForTx } from "../helpers/utilities/tx";

const func: DeployFunction = async function ({ getNamedAccounts, deployments, ...hre }: HardhatRuntimeEnvironment) {
    console.log("=== Post deployment hook ===");
    const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);

    // TODO: replace this
    // console.log("- Enable stable borrow in selected assets");
    // await hre.run("review-stable-borrow", { fix: true, vvv: true });
    // console.log("- Review rate strategies");
    // await hre.run("review-rate-strategies");
    // console.log("- Setup Debt Ceiling");
    // await hre.run("setup-debt-ceiling");
    // console.log("- Setup Borrowable assets in Isolation Mode");
    // await hre.run("setup-isolation-mode");
    // console.log("- Setup E-Modes");
    // await hre.run("setup-e-modes");
    // console.log("- Setup Liquidation protocol fee");
    // await hre.run("setup-liquidation-protocol-fee");

    if (isTestnetMarket(poolConfig)) {
        // Unpause pool
        const poolConfigurator = await getPoolConfiguratorProxy();
        await waitForTx(await poolConfigurator.setPoolPause(false));
        console.log("- Pool unpaused and accepting deposits.");
    }

    const allDeployments = await deployments.all();

    let formattedDeployments: any = {};
    let mintableTokens: any = {};

    console.log("\nAccounts after deployment");
    console.log("========");

    console.table(await getWalletBalances());
    // Print deployed contracts
    console.log("\nDeployments");
    console.log("===========");
    Object.keys(allDeployments).forEach((key) => {
        if (!key.includes("Mintable")) {
            formattedDeployments[key] = {
                address: allDeployments[key].address,
            };
        }
    });
    console.table(formattedDeployments);
    // Print Mintable Reserves and Rewards
    Object.keys(allDeployments).forEach((key) => {
        if (key.includes("Mintable")) {
            mintableTokens[key] = {
                address: allDeployments[key].address,
            };
        }
    });
    console.log("\nMintable Reserves and Rewards");
    console.table(mintableTokens);
};

func.tags = ["after-deploy"];
func.runAtTheEnd = true;

export default func;
