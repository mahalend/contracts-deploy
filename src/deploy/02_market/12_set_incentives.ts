import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    EMPTY_STORAGE_SLOT,
    MAX_UINT_AMOUNT,
    V3_PERIPHERY_VERSION,
    ZERO_ADDRESS,
} from "../../helpers/constants";
import {
    ATOKEN_PREFIX,
    EMISSION_MANAGER_ID,
    INCENTIVES_PROXY_ID,
    INCENTIVES_PULL_REWARDS_STRATEGY_ID,
    INCENTIVES_V2_IMPL_ID,
    TESTNET_PRICE_AGGR_PREFIX,
    TESTNET_REWARD_TOKEN_PREFIX,
    TESTNET_TOKEN_PREFIX,
} from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import {
    ConfigNames,
    getParamPerNetwork,
    isIncentivesEnabled,
    isTestnetMarket,
    loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { eNetwork, IncentivesConfig, RewardsConfigInput, RewardsInput, TransferStrategy } from "../../helpers/types";
import { waitForTx } from "../../helpers/misc-utils";
import Bluebird from "bluebird";
import { BigNumberish } from "ethers";

const func: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    ...hre
}: HardhatRuntimeEnvironment) {
    console.log()
    console.log()
    console.log("*********** Insentive setup ***************")
    const { deploy } = deployments;
    const network = process.env.FORK ? process.env.FORK : hre.network.name;
    const {
        deployer,
        incentivesProxyAdmin,
        incentivesRewardsVault,
        incentivesEmissionManager,
    } = await getNamedAccounts();
    const incentivesEmissionManagerSigner = await hre.ethers.getSigner(incentivesEmissionManager);
    const incentivesRewardsVaultSigner = await hre.ethers.getSigner(incentivesRewardsVault);
    const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
    const isTestnet: boolean = isTestnetMarket(poolConfig);
    const emissionManagerArtifact = await deployments.get(EMISSION_MANAGER_ID);
    const pullRewardsStrategyArtifact = await deployments.get(INCENTIVES_PULL_REWARDS_STRATEGY_ID);

    if (!isIncentivesEnabled(poolConfig)) {
        console.log("[Warning] Skipping incentives config since it's disable in config");
        return;
    }

    const incentivesConfig = poolConfig.IncentivesConfig;
    const rewards = getParamPerNetwork(incentivesConfig.rewards, network as eNetwork);
    if (!rewards) {
        console.log("[Warning] skipping incentives configuration since rewards are not mentioned in incentive config");
        return;
    }

    const emissionManager = await hre.ethers.getContractAt(emissionManagerArtifact.abi, emissionManagerArtifact.address);
    await Bluebird.mapSeries(Object.keys(rewards), async (symbol: string) => {
        let address: string = rewards[symbol];
        if (isTestnet && address === ZERO_ADDRESS) {
            const testTokenArtifact = await deployments.get(`${symbol}${TESTNET_REWARD_TOKEN_PREFIX}`)
            address = testTokenArtifact.address;
            const testToken = await hre.ethers.getContractAt(testTokenArtifact.abi, testTokenArtifact.address);
            console.log("- Approving pull strategy to access rewards");
            await waitForTx(await testToken.connect(incentivesRewardsVaultSigner).approve(pullRewardsStrategyArtifact.address, MAX_UINT_AMOUNT))
        }

        if (!address || address === ZERO_ADDRESS) {
            console.log("[Warning] skipping incentives configuration for reward " + symbol + " since reward address is not mentioned or is 0x00..0");
        } else {
            console.log(`Setting emissions admin for ${symbol}`)
            await waitForTx(await emissionManager.connect(incentivesEmissionManagerSigner).setEmissionAdmin(address, incentivesEmissionManager));
        }
    });

    const rewardTokenOracles = getParamPerNetwork(incentivesConfig.rewardsOracle, network as eNetwork);
    const incentivesInput = getParamPerNetwork(incentivesConfig.incentivesInput, network as eNetwork);
    if (!incentivesInput || !incentivesInput.length || !rewardTokenOracles) {
        console.log("[Warning] skipping incentives configuration since rewards are not mentioned in incentive config");
        return;
    }

    await Bluebird.mapSeries(incentivesInput as Array<any>, async (input: RewardsConfigInput) => {
        const params: {
            emissionPerSecond: BigNumberish;
            totalSupply: BigNumberish;
            distributionEnd: BigNumberish;
            asset: string;
            reward: string;
            transferStrategy: string;
            rewardOracle: string;
        } = {
            emissionPerSecond: input.emissionPerSecond,
            totalSupply: 0,
            distributionEnd: Math.floor(Date.now() / 1000) + Number(input.duration),
            asset: (await deployments.get(`${input.asset}${ATOKEN_PREFIX}`)).address,
            reward: isTestnet
                ? (await deployments.get(`${input.reward}${TESTNET_REWARD_TOKEN_PREFIX}`)).address
                : rewards[input.reward],
            transferStrategy: pullRewardsStrategyArtifact.address,
            rewardOracle: isTestnet
                ? (await deployments.get(`${input.reward}${TESTNET_PRICE_AGGR_PREFIX}`)).address
                : rewardTokenOracles[input.reward],
        }

        console.log(`Configuring emissions assets for ${input.asset}`)
        await waitForTx(await emissionManager.connect(incentivesEmissionManagerSigner).configureAssets([params,]));
    });

    console.log("*********** Insentive setup ***************")
    console.log()
    console.log()

    return true;
};

func.id = `Incentives:set:${MARKET_NAME}:aave-v3-periphery@${V3_PERIPHERY_VERSION}`;
func.tags = ["market", "IncentivesProxy", "configureAssets"];
func.dependencies = [];

export default func;
