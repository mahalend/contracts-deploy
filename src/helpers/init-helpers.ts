import * as hre from 'hardhat';
import { ZERO_ADDRESS } from './constants';
import { ACL_MANAGER_ID, ATOKEN_IMPL_ID, DELEGATION_AWARE_ATOKEN_IMPL_ID, L2_POOL_IMPL_ID, POOL_ADDRESSES_PROVIDER_ID, POOL_CONFIGURATOR_IMPL_ID, POOL_CONFIGURATOR_PROXY_ID, POOL_DATA_PROVIDER, POOL_IMPL_ID, RESERVES_SETUP_HELPER_ID, STABLE_DEBT_TOKEN_IMPL_ID, VARIABLE_DEBT_TOKEN_IMPL_ID } from './deploy-ids';
import * as env from './env';
import { ConfigNames, isL2PoolSupported, loadPoolConfig } from './market-config-helpers';
import { waitForTx } from './misc-utils';
import { eContractid, iMultiPoolsAssets, IReserveParams, tEthereumAddress } from './types';
import { chunk, isValidAddress } from './utilities/utils';

export const initReservesByHelper = async (reservesParams: iMultiPoolsAssets<IReserveParams>, tokenAddresses: {
    [symbol: string]: string;
}, aTokenNamePrefix: string, stableDebtTokenNamePrefix: string, variableDebtTokenNamePrefix: string, symbolPrefix: string, admin: tEthereumAddress, treasuryAddress: tEthereumAddress, incentivesController: tEthereumAddress): Promise<void> => {
    const poolConfig = loadPoolConfig(env.MARKET_NAME as ConfigNames);
    const addressProviderArtifact = await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID);
    const addressProvider = (await hre.ethers.getContractAt(addressProviderArtifact.abi, addressProviderArtifact.address));
    const poolArtifact = await hre.deployments.get(isL2PoolSupported(poolConfig) ? L2_POOL_IMPL_ID : POOL_IMPL_ID);
    const pool = (await hre.ethers.getContractAt(poolArtifact.abi, await addressProvider.getPool()));
    // CHUNK CONFIGURATION
    const initChunks = 3;
    // Initialize variables for future reserves initialization
    let reserveTokens: any = [];
    let reserveInitDecimals: any = [];
    let reserveSymbols: any = [];
    let initInputParams: any = [];
    let strategyRates: any;
    let rateStrategies: any = {};
    let strategyAddresses: any = {};
    let strategyAddressPerAsset: any = {};
    let aTokenType: any = {};
    let delegationAwareATokenImplementationAddress = "";
    let aTokenImplementationAddress = "";
    let stableDebtTokenImplementationAddress = "";
    let variableDebtTokenImplementationAddress = "";
    stableDebtTokenImplementationAddress = (await hre.deployments.get(STABLE_DEBT_TOKEN_IMPL_ID)).address;
    variableDebtTokenImplementationAddress = (await hre.deployments.get(VARIABLE_DEBT_TOKEN_IMPL_ID)).address;
    aTokenImplementationAddress = (await hre.deployments.get(ATOKEN_IMPL_ID))
        .address;
    const delegatedAwareReserves = Object.entries(reservesParams).filter(([_, { aTokenImpl }]) => aTokenImpl === eContractid.DelegationAwareAToken);
    if (delegatedAwareReserves.length > 0) {
        delegationAwareATokenImplementationAddress = (await hre.deployments.get(DELEGATION_AWARE_ATOKEN_IMPL_ID)).address;
    }
    const reserves = Object.entries(reservesParams).filter(([_, { aTokenImpl }]) => aTokenImpl === eContractid.DelegationAwareAToken ||
        aTokenImpl === eContractid.AToken);
    for (let [symbol, params] of reserves) {
        if (!tokenAddresses[symbol]) {
            console.log(`- Skipping init of ${symbol} due token address is not set at markets config`);
            continue;
        }
        const poolReserve = await pool.getReserveData(tokenAddresses[symbol]);
        if (poolReserve.aTokenAddress !== ZERO_ADDRESS) {
            console.log(`- Skipping init of ${symbol} due is already initialized`);
            continue;
        }
        const { strategy, aTokenImpl, reserveDecimals } = params;
        const { optimalUsageRatio, baseVariableBorrowRate, variableRateSlope1, variableRateSlope2, stableRateSlope1, stableRateSlope2, baseStableRateOffset, stableRateExcessOffset, optimalStableToTotalDebtRatio, } = strategy;
        if (!strategyAddresses[strategy.name]) {
            // Strategy does not exist, create a new one
            rateStrategies[strategy.name] = [
                addressProvider.address,
                optimalUsageRatio,
                baseVariableBorrowRate,
                variableRateSlope1,
                variableRateSlope2,
                stableRateSlope1,
                stableRateSlope2,
                baseStableRateOffset,
                stableRateExcessOffset,
                optimalStableToTotalDebtRatio,
            ];
            strategyAddresses[strategy.name] = strategyAddresses[strategy.name] = (await hre.deployments.deploy(`ReserveStrategy-${strategy.name}`, {
                from: admin,
                args: rateStrategies[strategy.name],
                contract: "DefaultReserveInterestRateStrategy",
                log: true,
            })).address;
        }
        strategyAddressPerAsset[symbol] = strategyAddresses[strategy.name];
        console.log("Strategy address for asset %s: %s", symbol, strategyAddressPerAsset[symbol]);
        if (aTokenImpl === eContractid.AToken) {
            aTokenType[symbol] = "generic";
        }
        else if (aTokenImpl === eContractid.DelegationAwareAToken) {
            aTokenType[symbol] = "delegation aware";
        }
        reserveInitDecimals.push(reserveDecimals);
        reserveTokens.push(tokenAddresses[symbol]);
        reserveSymbols.push(symbol);
    }
    for (let i = 0; i < reserveSymbols.length; i++) {
        let aTokenToUse;
        if (aTokenType[reserveSymbols[i]] === "generic") {
            aTokenToUse = aTokenImplementationAddress;
        }
        else {
            aTokenToUse = delegationAwareATokenImplementationAddress;
        }
        initInputParams.push({
            aTokenImpl: aTokenToUse,
            stableDebtTokenImpl: stableDebtTokenImplementationAddress,
            variableDebtTokenImpl: variableDebtTokenImplementationAddress,
            underlyingAssetDecimals: reserveInitDecimals[i],
            interestRateStrategyAddress: strategyAddressPerAsset[reserveSymbols[i]],
            underlyingAsset: reserveTokens[i],
            treasury: treasuryAddress,
            incentivesController,
            underlyingAssetName: reserveSymbols[i],
            aTokenName: `Aave ${aTokenNamePrefix} ${reserveSymbols[i]}`,
            aTokenSymbol: `a${symbolPrefix}${reserveSymbols[i]}`,
            variableDebtTokenName: `Aave ${variableDebtTokenNamePrefix} Var Debt ${reserveSymbols[i]}`,
            variableDebtTokenSymbol: `varDebt${symbolPrefix}${reserveSymbols[i]}`,
            stableDebtTokenName: `Aave ${stableDebtTokenNamePrefix} Stable Debt ${reserveSymbols[i]}`,
            stableDebtTokenSymbol: `stableDebt${symbolPrefix}${reserveSymbols[i]}`,
            params: "0x10",
        });
    }
    // Deploy init reserves per chunks
    const chunkedSymbols = chunk(reserveSymbols, initChunks);
    const chunkedInitInputParams = chunk(initInputParams, initChunks);
    const proxyArtifact = await hre.deployments.get(POOL_CONFIGURATOR_PROXY_ID);
    const configuratorArtifact = await hre.deployments.get(POOL_CONFIGURATOR_IMPL_ID);
    const configurator = (await hre.ethers.getContractAt(configuratorArtifact.abi, proxyArtifact.address));
    console.log(`- Reserves initialization in ${chunkedInitInputParams.length} txs`);
    for (let chunkIndex = 0; chunkIndex < chunkedInitInputParams.length; chunkIndex++) {
        const tx = await waitForTx(await configurator.initReserves(chunkedInitInputParams[chunkIndex]));
        console.log(`  - Reserve ready for: ${chunkedSymbols[chunkIndex].join(", ")}`, `\n    - Tx hash: ${tx.transactionHash}`);
    }
};

export const getPairsTokenAggregator = (allAssetsAddresses: {
    [tokenSymbol: string]: string;
}, aggregatorsAddresses: {
    [tokenSymbol: string]: string;
}): [string[], string[]] => {
    const { ETH, USD, ...assetsAddressesWithoutEth } = allAssetsAddresses;
    const pairs = Object.entries(assetsAddressesWithoutEth).map(([tokenSymbol, tokenAddress]) => {
        const aggregatorAddressIndex = Object.keys(aggregatorsAddresses).findIndex((value) => value === tokenSymbol);
        const [, aggregatorAddress] = Object.entries(aggregatorsAddresses)[aggregatorAddressIndex];
        if (!aggregatorAddress)
            throw `Missing aggregator for ${tokenSymbol}`;
        if (!tokenAddress)
            throw `Missing token address for ${tokenSymbol}`;
        return [tokenAddress, aggregatorAddress];
    });
    const mappedPairs = pairs.map(([asset]) => asset);
    const mappedAggregators = pairs.map(([, source]) => source);
    return [mappedPairs, mappedAggregators];
};

export const configureReservesByHelper = async (reservesParams: iMultiPoolsAssets<IReserveParams>, tokenAddresses: {
    [symbol: string]: string;
}): Promise<void> => {
    const addressProviderArtifact = await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID);
    const addressProvider = (await hre.ethers.getContractAt(addressProviderArtifact.abi, addressProviderArtifact.address));
    const aclManagerArtifact = await hre.deployments.get(ACL_MANAGER_ID);
    const aclManager = (await hre.ethers.getContractAt(aclManagerArtifact.abi, await addressProvider.getACLManager()));
    const reservesSetupArtifact = await hre.deployments.get(RESERVES_SETUP_HELPER_ID);
    const reservesSetupHelper = await hre.ethers.getContractAt(reservesSetupArtifact.abi, reservesSetupArtifact.address);
    const protocolDataArtifact = await hre.deployments.get(POOL_DATA_PROVIDER);
    const protocolDataProvider = (await hre.ethers.getContractAt(protocolDataArtifact.abi, (await hre.deployments.get(POOL_DATA_PROVIDER)).address));
    const tokens = [];
    const symbols = [];
    const inputParams = [];
    for (const [assetSymbol, { baseLTVAsCollateral, liquidationBonus, liquidationThreshold, reserveFactor, borrowCap, supplyCap, stableBorrowRateEnabled, borrowingEnabled, flashLoanEnabled, },] of Object.entries(reservesParams)) {
        if (!tokenAddresses[assetSymbol]) {
            console.log(`- Skipping init of ${assetSymbol} due token address is not set at markets config`);
            continue;
        }
        if (baseLTVAsCollateral === "-1")
            continue;
        const assetAddressIndex = Object.keys(tokenAddresses).findIndex((value) => value === assetSymbol);
        const [, tokenAddress] = Object.entries(tokenAddresses)[assetAddressIndex];
        const { usageAsCollateralEnabled: alreadyEnabled } = await protocolDataProvider.getReserveConfigurationData(tokenAddress);
        if (alreadyEnabled) {
            console.log(`- Reserve ${assetSymbol} is already enabled as collateral, skipping`);
            continue;
        }
        // Push data
        inputParams.push({
            asset: tokenAddress,
            baseLTV: baseLTVAsCollateral,
            liquidationThreshold,
            liquidationBonus,
            reserveFactor,
            borrowCap,
            supplyCap,
            stableBorrowingEnabled: stableBorrowRateEnabled,
            borrowingEnabled: borrowingEnabled,
            flashLoanEnabled: flashLoanEnabled,
        });
        tokens.push(tokenAddress);
        symbols.push(assetSymbol);
    }
    if (tokens.length) {
        // Set aTokenAndRatesDeployer as temporal admin
        const aclAdmin = await hre.ethers.getSigner(await addressProvider.getACLAdmin());
        await waitForTx(await aclManager
            .connect(aclAdmin)
            .addRiskAdmin(reservesSetupHelper.address));
        // Deploy init per chunks
        const enableChunks = 20;
        const chunkedSymbols = chunk(symbols, enableChunks);
        const chunkedInputParams = chunk(inputParams, enableChunks);
        const poolConfiguratorAddress = await addressProvider.getPoolConfigurator();
        console.log(`- Configure reserves in ${chunkedInputParams.length} txs`);
        for (let chunkIndex = 0; chunkIndex < chunkedInputParams.length; chunkIndex++) {
            const tx = await waitForTx(await reservesSetupHelper.configureReserves(poolConfiguratorAddress, chunkedInputParams[chunkIndex]));
            console.log(`  - Init for: ${chunkedSymbols[chunkIndex].join(", ")}`, `\n    - Tx hash: ${tx.transactionHash}`);
        }
        // Remove ReservesSetupHelper from risk admins
        await waitForTx(await aclManager
            .connect(aclAdmin)
            .removeRiskAdmin(reservesSetupHelper.address));
    }
};

export const addMarketToRegistry = async (providerId: number, addressesProvider: tEthereumAddress): Promise<void> => {
    const providerRegistry = await hre.deployments.get("PoolAddressesProviderRegistry");
    const providerRegistryInstance = (await hre.ethers.getContractAt(providerRegistry.abi, providerRegistry.address));
    const providerRegistryOwner = await providerRegistryInstance.owner();
    if (!isValidAddress(addressesProvider)) {
        throw Error('[add-market-to-registry] Input parameter "addressesProvider" is missing or is not an address.');
    }
    const signer = await hre.ethers.getSigner(providerRegistryOwner);
    // 1. Set the provider at the Registry
    await waitForTx(await providerRegistryInstance
        .connect(signer)
        .registerAddressesProvider(addressesProvider, providerId));
    console.log(`Added LendingPoolAddressesProvider with address "${addressesProvider}" to registry located at ${providerRegistry.address}`);
};
