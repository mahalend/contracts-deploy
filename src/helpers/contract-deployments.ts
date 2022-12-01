import { hre } from './misc-utils';

import { EmissionManager, StakedAave, StakedAaveV2, StakedTokenV2Rev3, UiIncentiveDataProviderV3, UiPoolDataProviderV3, WrappedTokenGatewayV3 } from "../dist/types/typechain";
import { AToken } from '../dist/types/typechain/@aave/core-v3/contracts/protocol/tokenization';
import { PoolAddressesProviderRegistry, PoolAddressesProvider, ACLManager, ConfiguratorLogic, PoolConfigurator, Pool, MockPoolInherited, PriceOracle, MockAggregator, AaveOracle, MockFlashLoanReceiver, AaveProtocolDataProvider, MintableERC20, MintableDelegationERC20, DefaultReserveInterestRateStrategy, StableDebtToken, VariableDebtToken, DelegationAwareAToken, ReservesSetupHelper, InitializableImmutableAdminUpgradeabilityProxy, MockStableDebtToken, WETH9Mocked, MockVariableDebtToken, MockAToken, MockIncentivesController, MockReserveConfiguration, MockPool, MockInitializableImple, MockInitializableImpleV2, MockInitializableFromConstructorImple, MockReentrantInitializableImple, InitializableAdminUpgradeabilityProxy, L2Pool, MockL2Pool, L2Encoder } from "../contract-types";
import { EMPTY_STORAGE_SLOT, ZERO_ADDRESS } from './constants';
import { getPoolLibraries } from './contract-getter';
import { POOL_ADDRESSES_PROVIDER_ID, STAKE_AAVE_IMPL_V1, STAKE_AAVE_IMPL_V2, STAKE_AAVE_IMPL_V3 } from './deploy-ids';
import { waitForTx } from './misc-utils';
import { tEthereumAddress, tStringTokenSmallUnits } from "./types";
import { deployContract } from "./utilities/tx";

export const deployUiIncentiveDataProvider = async (): Promise<UiIncentiveDataProviderV3> => await deployContract("UiIncentiveDataProviderV3");

export const deployUiPoolDataProvider = async (chainlinkAggregatorProxy: string, chainlinkEthUsdAggregatorProxy: string): Promise<UiPoolDataProviderV3> => await deployContract("UiPoolDataProviderV3", [
    chainlinkAggregatorProxy,
    chainlinkEthUsdAggregatorProxy,
]);

export const deployPoolAddressesProvider = async (marketId: string): Promise<PoolAddressesProvider> => await deployContract("PoolAddressesProvider", [
    marketId,
]);

export const deployPoolAddressesProviderRegistry = async (): Promise<PoolAddressesProviderRegistry> => await deployContract("PoolAddressesProviderRegistry");

export const deployACLManager = async (provider: tEthereumAddress): Promise<ACLManager> => await deployContract("ACLManager", [provider]);

export const deployConfiguratorLogicLibrary = async (): Promise<ConfiguratorLogic> => await deployContract("ConfiguratorLogic");

export const deployPoolConfigurator = async (): Promise<PoolConfigurator> => {
    const configuratorLogicArtifact = await hre.deployments.get("ConfiguratorLogic");
    return await deployContract("PoolConfigurator", [], {
        ConfiguratorLogic: configuratorLogicArtifact.address,
    });
};

export const deployPool = async (provider: tEthereumAddress): Promise<Pool> => {
    const libraries = await getPoolLibraries();

    provider =
        provider ||
        (await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID)).address;
    return await deployContract("Pool", [provider], libraries);
};

export const deployMockPoolInherited = async (provider: tEthereumAddress): Promise<MockPoolInherited> => {
    const libraries = await getPoolLibraries();
    provider =
        provider ||
        (await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID)).address;
    return await deployContract("MockPoolInherited", [provider], libraries);
};

export const deployPriceOracle = async (): Promise<PriceOracle> => await deployContract("PriceOracle");

export const deployMockAggregator = async (price: tStringTokenSmallUnits): Promise<MockAggregator> => await deployContract("MockAggregator", [price]);

export const deployAaveOracle = async (args: [
    tEthereumAddress,
    tEthereumAddress[],
    tEthereumAddress[],
    tEthereumAddress,
    tEthereumAddress,
    string
]): Promise<AaveOracle> => deployContract("AaveOracle", args);

export const deployMockFlashLoanReceiver = async (addressesProvider: tEthereumAddress): Promise<MockFlashLoanReceiver> => deployContract("MockFlashLoanReceiver", [
    addressesProvider,
]);

export const deployAaveProtocolDataProvider = async (addressesProvider: tEthereumAddress): Promise<AaveProtocolDataProvider> => deployContract("AaveProtocolDataProvider", [
    addressesProvider,
]);

export const deployMintableERC20 = async (args: [string, string, string]): Promise<MintableERC20> => deployContract("MintableERC20", args);

export const deployMintableDelegationERC20 = async (args: [string, string, string]): Promise<MintableDelegationERC20> => deployContract("MintableDelegationERC20", args);

export const deployDefaultReserveInterestRateStrategy = async (args: [
    tEthereumAddress,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
]): Promise<DefaultReserveInterestRateStrategy> => deployContract("DefaultReserveInterestRateStrategy", args);

export const deployGenericStableDebtToken = async (poolAddress: tEthereumAddress): Promise<StableDebtToken> => deployContract("StableDebtToken", [poolAddress]);

export const deployGenericVariableDebtToken = async (poolAddress: tEthereumAddress): Promise<VariableDebtToken> => deployContract("VariableDebtToken", [poolAddress]);

export const deployGenericAToken = async ([poolAddress, underlyingAssetAddress, treasuryAddress, incentivesController, name, symbol,]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
]): Promise<AToken> => {
    const instance = await deployContract("AToken", [poolAddress]);
    await instance.initialize(poolAddress, treasuryAddress, underlyingAssetAddress, incentivesController, "18", name, symbol, "0x10");
    return instance as AToken;
};

export const deployGenericATokenImpl = async (poolAddress: tEthereumAddress): Promise<AToken> => deployContract("AToken", [poolAddress]);

export const deployDelegationAwareAToken = async ([poolAddress, underlyingAssetAddress, treasuryAddress, incentivesController, name, symbol,]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
]): Promise<DelegationAwareAToken> => {
    const instance = await deployContract("DelegationAwareAToken", [poolAddress]);
    await instance.initialize(poolAddress, treasuryAddress, underlyingAssetAddress, incentivesController, "18", name, symbol, "0x10");
    return instance as DelegationAwareAToken;
};

export const deployDelegationAwareATokenImpl = async (poolAddress: tEthereumAddress): Promise<DelegationAwareAToken> => deployContract("DelegationAwareAToken", [poolAddress]);

export const deployReservesSetupHelper = async (): Promise<ReservesSetupHelper> => deployContract("ReservesSetupHelper");

export const deployInitializableImmutableAdminUpgradeabilityProxy = async (args: [tEthereumAddress]): Promise<InitializableImmutableAdminUpgradeabilityProxy> => deployContract("InitializableImmutableAdminUpgradeabilityProxy", args);

export const deployMockStableDebtToken = async (args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
]): Promise<MockStableDebtToken> => {
    const instance = await deployContract("MockStableDebtToken", [args[0]]);
    await instance.initialize(args[0], args[1], args[2], "18", args[3], args[4], args[5]);
    return instance as MockStableDebtToken;
};

export const deployWETHMocked = async (): Promise<WETH9Mocked> => deployContract("WETH9Mocked");

export const deployMockVariableDebtToken = async (args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
]): Promise<MockVariableDebtToken> => {
    const instance = await deployContract("MockVariableDebtToken", [args[0]]);
    await instance.initialize(args[0], args[1], args[2], "18", args[3], args[4], args[5]);
    return instance as MockVariableDebtToken;
};

export const deployMockAToken = async (args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
]): Promise<MockAToken> => {
    const instance = await deployContract("MockAToken", [args[0]]);
    await instance.initialize(args[0], args[2], args[1], args[3], "18", args[4], args[5], args[6]);
    return instance as MockAToken;
};

export const deployMockIncentivesController = async (): Promise<MockIncentivesController> => deployContract("MockIncentivesController");

export const deployMockReserveConfiguration = async (): Promise<MockReserveConfiguration> => deployContract("MockReserveConfiguration");

export const deployMockPool = async (): Promise<MockPool> => deployContract("MockPool");

export const deployMockInitializableImple = async (): Promise<MockInitializableImple> => deployContract("MockInitializableImple");

export const deployMockInitializableImpleV2 = async (): Promise<MockInitializableImpleV2> => deployContract("MockInitializableImpleV2");

export const deployMockInitializableFromConstructorImple = async (args: [string]): Promise<MockInitializableFromConstructorImple> => deployContract("MockInitializableFromConstructorImple", args);

export const deployMockReentrantInitializableImple = async (): Promise<MockReentrantInitializableImple> => deployContract("MockReentrantInitializableImple");

export const deployWrappedTokenGateway = async (wrappedToken: tEthereumAddress): Promise<WrappedTokenGatewayV3> => deployContract("WrappedTokenGatewayV3", [
    wrappedToken,
]);

export const deployStakedAaveV3 = async ([stakedToken, rewardsToken, cooldownSeconds, unstakeWindow, rewardsVault, emissionManager, distributionDuration,]: [
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    tEthereumAddress,
    tEthereumAddress,
    string
]): Promise<StakedTokenV2Rev3> => {
    const args = [
        stakedToken,
        rewardsToken,
        cooldownSeconds,
        unstakeWindow,
        rewardsVault,
        emissionManager,
        distributionDuration,
        "Staked AAVE",
        "stkAAVE",
        "18",
        ZERO_ADDRESS, // gov
    ];
    return deployContract("StakedTokenV2Rev3", args, undefined, STAKE_AAVE_IMPL_V3);
};

export const deployStakedAaveV2 = async ([stakedToken, rewardsToken, cooldownSeconds, unstakeWindow, rewardsVault, emissionManager, distributionDuration,]: [
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    tEthereumAddress,
    tEthereumAddress,
    string
]): Promise<StakedAaveV2> => {
    const { deployer } = await hre.getNamedAccounts();
    const args = [
        stakedToken,
        rewardsToken,
        cooldownSeconds,
        unstakeWindow,
        rewardsVault,
        emissionManager,
        distributionDuration,
        ZERO_ADDRESS, // gov address
    ];
    return deployContract("StakedAaveV2", args, undefined, STAKE_AAVE_IMPL_V2);
};

export const deployStakedAaveV1 = async ([stakedToken, rewardsToken, cooldownSeconds, unstakeWindow, rewardsVault, emissionManager, distributionDuration,]: [
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    tEthereumAddress,
    tEthereumAddress,
    string
]): Promise<StakedAave> => {
    const { deployer } = await hre.getNamedAccounts();
    const args = [
        stakedToken,
        rewardsToken,
        cooldownSeconds,
        unstakeWindow,
        rewardsVault,
        emissionManager,
        distributionDuration,
    ];
    return deployContract("StakedAave", args, undefined, STAKE_AAVE_IMPL_V1);
};

export const setupStkAave = async (proxy: InitializableAdminUpgradeabilityProxy, args: [
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    tEthereumAddress,
    tEthereumAddress,
    string
]): Promise<void> => {
    const { incentivesProxyAdmin } = await hre.getNamedAccounts();
    const proxyAdmin = await hre.ethers.getSigner(incentivesProxyAdmin);
    const implRev1 = await deployStakedAaveV1(args);
    const implRev2 = await deployStakedAaveV2(args);
    const implRev3 = await deployStakedAaveV3(args);

    const proxyAdminSlot = await hre.ethers.provider.getStorageAt(proxy.address, "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103" // keccak-256 eip1967.proxy.admin sub 1
    );
    const initialPayloadStkAaveRev1 = implRev1
        .connect(proxyAdmin)
        .interface.encodeFunctionData("initialize", [
            ZERO_ADDRESS,
            "Staked AAVE",
            "stkAAVE",
            18,
        ]);
    const upgradePayloadStkAaveRev2andRev3 = implRev2
        .connect(proxyAdmin)
        .interface.encodeFunctionData("initialize");
    const stkProxy = proxy.connect(proxyAdmin);
    const proxyWithImpl = implRev1.attach(stkProxy.address);
    if (proxyAdminSlot === EMPTY_STORAGE_SLOT) {
        // Initialize
        await waitForTx(await stkProxy["initialize(address,address,bytes)"](implRev1.address, proxyAdmin.address, initialPayloadStkAaveRev1));
        console.log("- Initializing admin proxy for stkAAVE");
    }
    const revisionV1 = Number((await proxyWithImpl.REVISION()).toString());
    if (revisionV1 < 2) {
        // Upgrade to Revision 2
        await waitForTx(await stkProxy.upgradeToAndCall(implRev2.address, upgradePayloadStkAaveRev2andRev3));
        console.log("- Upgraded stkAAVE to Revision 2");
    }
    const revisionV2 = Number((await proxyWithImpl.REVISION()).toString());
    if (revisionV2 < 3) {
        // Upgrade to Revision 3
        await waitForTx(await stkProxy.upgradeToAndCall(implRev3.address, upgradePayloadStkAaveRev2andRev3));
        console.log("- Upgraded stkAAVE to Revision 3");
    }
    const revisionV3 = Number((await proxyWithImpl.REVISION()).toString());
    console.log("stkAAVE:");
    console.log("- revision:", revisionV3);
    console.log("- name:", await proxyWithImpl.name());
    console.log("- symbol:", await proxyWithImpl.symbol());
    console.log("- decimals:", await proxyWithImpl.decimals());
};

export const deployInitializableAdminUpgradeabilityProxy = async (slug: string): Promise<InitializableAdminUpgradeabilityProxy> => deployContract("InitializableAdminUpgradeabilityProxy", [], undefined, slug);

export const deployCalldataLogicLibrary = async (): Promise<import("ethers").Contract> => deployContract("CalldataLogic");

export const deployL2DeployerImplementation = async (addressesProviderAddress: tEthereumAddress): Promise<L2Pool> => {
    const commonLibraries = await getPoolLibraries();
    const CalldataLogic = (await hre.deployments.get("EModeLogic")).address;
    return deployContract("L2Pool", [addressesProviderAddress], {
        ...commonLibraries,
        CalldataLogic,
    });
};

export const deployL2Mock2Pool = async (addressesProviderAddress: tEthereumAddress): Promise<MockL2Pool> => deployContract("MockL2Pool", [addressesProviderAddress]);

export const deployL2Encoder = async (poolProxy: tEthereumAddress): Promise<L2Encoder> => deployContract("L2Encoder", [poolProxy]);

export const deployEmissionManager = async (rewardsController: tEthereumAddress, owner: tEthereumAddress): Promise<EmissionManager> => deployContract("EmissionManager", [
    rewardsController,
    owner,
]);

