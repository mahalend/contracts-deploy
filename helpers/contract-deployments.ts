import { EmissionManager } from "./../typechain";
import { MockL2Pool } from "./../typechain";
import { EMPTY_STORAGE_SLOT, ZERO_ADDRESS } from "./constants";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getPoolLibraries } from "./contract-getters";
import { tEthereumAddress, tStringTokenSmallUnits } from "./types";
import { MintableERC20 } from "../typechain";
import { deployContract } from "./utilities/tx";
import { POOL_ADDRESSES_PROVIDER_ID } from "./deploy-ids";
import {
  AaveOracle,
  AaveProtocolDataProvider,
  ACLManager,
  AToken,
  ConfiguratorLogic,
  DefaultReserveInterestRateStrategy,
  DelegationAwareAToken,
  InitializableImmutableAdminUpgradeabilityProxy,
  MintableDelegationERC20,
  InitializableAdminUpgradeabilityProxy,
  UiIncentiveDataProviderV3,
  L2Pool,
  L2Encoder,
} from "../typechain";

import { waitForTx } from "./utilities/tx";
import {
  STAKE_AAVE_IMPL_V1,
  STAKE_AAVE_IMPL_V2,
  STAKE_AAVE_IMPL_V3,
} from "./deploy-ids";
import {
  MockAggregator,
  MockAToken,
  MockFlashLoanReceiver,
  MockIncentivesController,
  MockInitializableFromConstructorImple,
  MockInitializableImple,
  MockInitializableImpleV2,
  MockPool,
  MockPoolInherited,
  MockReentrantInitializableImple,
  MockReserveConfiguration,
  MockStableDebtToken,
  MockVariableDebtToken,
  Pool,
  PoolAddressesProvider,
  PoolAddressesProviderRegistry,
  PoolConfigurator,
  PriceOracle,
  ReservesSetupHelper,
  StableDebtToken,
  UiPoolDataProviderV3,
  VariableDebtToken,
  WETH9Mocked,
  WrappedTokenGatewayV3,
} from "../typechain";

// Prevent error HH9 when importing this file inside tasks or helpers at Hardhat config load
declare var hre: HardhatRuntimeEnvironment;

export const deployUiIncentiveDataProvider =
  async (): Promise<UiIncentiveDataProviderV3> =>
    await deployContract<UiIncentiveDataProviderV3>(
      "UiIncentiveDataProviderV3"
    );

export const deployUiPoolDataProvider = async (
  chainlinkAggregatorProxy: string,
  chainlinkEthUsdAggregatorProxy: string
) =>
  await deployContract<UiPoolDataProviderV3>("UiPoolDataProviderV3", [
    chainlinkAggregatorProxy,
    chainlinkEthUsdAggregatorProxy,
  ]);

export const deployPoolAddressesProvider = async (marketId: string) =>
  await deployContract<PoolAddressesProvider>("PoolAddressesProvider", [
    marketId,
  ]);

export const deployPoolAddressesProviderRegistry = async () =>
  await deployContract<PoolAddressesProviderRegistry>(
    "PoolAddressesProviderRegistry"
  );

export const deployACLManager = async (provider: tEthereumAddress) =>
  await deployContract<ACLManager>("ACLManager", [provider]);

export const deployConfiguratorLogicLibrary = async () =>
  await deployContract<ConfiguratorLogic>("ConfiguratorLogic");

export const deployPoolConfigurator = async () => {
  const configuratorLogicArtifact = await hre.deployments.get(
    "ConfiguratorLogic"
  );
  return await deployContract<PoolConfigurator>("PoolConfigurator", [], {
    ConfiguratorLogic: configuratorLogicArtifact.address,
  });
};

export const deployPool = async (provider?: tEthereumAddress) => {
  const libraries = await getPoolLibraries();
  provider =
    provider ||
    (await (
      await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID)
    ).address);

  return await deployContract<Pool>("Pool", [provider], libraries);
};

export const deployMockPoolInherited = async (provider?: tEthereumAddress) => {
  const libraries = await getPoolLibraries();
  provider =
    provider ||
    (await (
      await hre.deployments.get(POOL_ADDRESSES_PROVIDER_ID)
    ).address);

  return await deployContract<MockPoolInherited>(
    "MockPoolInherited",
    [provider],
    libraries
  );
};

export const deployPriceOracle = async () =>
  await deployContract<PriceOracle>("PriceOracle");

export const deployMockAggregator = async (price: tStringTokenSmallUnits) =>
  await deployContract<MockAggregator>("MockAggregator", [price]);

export const deployAaveOracle = async (
  args: [
    tEthereumAddress,
    tEthereumAddress[],
    tEthereumAddress[],
    tEthereumAddress,
    tEthereumAddress,
    string
  ]
) => deployContract<AaveOracle>("AaveOracle", args);

export const deployMockFlashLoanReceiver = async (
  addressesProvider: tEthereumAddress
) =>
  deployContract<MockFlashLoanReceiver>("MockFlashLoanReceiver", [
    addressesProvider,
  ]);

export const deployAaveProtocolDataProvider = async (
  addressesProvider: tEthereumAddress
) =>
  deployContract<AaveProtocolDataProvider>("AaveProtocolDataProvider", [
    addressesProvider,
  ]);

export const deployMintableERC20 = async (args: [string, string, string]) =>
  deployContract<MintableERC20>("MintableERC20", args);

export const deployMintableDelegationERC20 = async (
  args: [string, string, string]
) => deployContract<MintableDelegationERC20>("MintableDelegationERC20", args);

export const deployDefaultReserveInterestRateStrategy = async (
  args: [
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
  ]
) =>
  deployContract<DefaultReserveInterestRateStrategy>(
    "DefaultReserveInterestRateStrategy",
    args
  );

export const deployGenericStableDebtToken = async (
  poolAddress: tEthereumAddress
) => deployContract<StableDebtToken>("StableDebtToken", [poolAddress]);

export const deployGenericVariableDebtToken = async (
  poolAddress: tEthereumAddress
) => deployContract<VariableDebtToken>("VariableDebtToken", [poolAddress]);

export const deployGenericAToken = async ([
  poolAddress,
  underlyingAssetAddress,
  treasuryAddress,
  incentivesController,
  name,
  symbol,
]: [
  tEthereumAddress,
  tEthereumAddress,
  tEthereumAddress,
  tEthereumAddress,
  string,
  string
]) => {
  const instance = await deployContract<AToken>("AToken", [poolAddress]);

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployGenericATokenImpl = async (poolAddress: tEthereumAddress) =>
  deployContract<AToken>("AToken", [poolAddress]);

export const deployDelegationAwareAToken = async ([
  poolAddress,
  underlyingAssetAddress,
  treasuryAddress,
  incentivesController,
  name,
  symbol,
]: [
  tEthereumAddress,
  tEthereumAddress,
  tEthereumAddress,
  tEthereumAddress,
  string,
  string
]) => {
  const instance = await deployContract<DelegationAwareAToken>(
    "DelegationAwareAToken",
    [poolAddress]
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployDelegationAwareATokenImpl = async (
  poolAddress: tEthereumAddress
) =>
  deployContract<DelegationAwareAToken>("DelegationAwareAToken", [poolAddress]);

export const deployReservesSetupHelper = async () =>
  deployContract<ReservesSetupHelper>("ReservesSetupHelper");

export const deployInitializableImmutableAdminUpgradeabilityProxy = async (
  args: [tEthereumAddress]
) =>
  deployContract<InitializableImmutableAdminUpgradeabilityProxy>(
    "InitializableImmutableAdminUpgradeabilityProxy",
    args
  );

export const deployMockStableDebtToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ]
) => {
  const instance = await deployContract<MockStableDebtToken>(
    "MockStableDebtToken",
    [args[0]]
  );

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    "18",
    args[3],
    args[4],
    args[5]
  );

  return instance;
};

export const deployWETHMocked = async () =>
  deployContract<WETH9Mocked>("WETH9Mocked");

export const deployMockVariableDebtToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ]
) => {
  const instance = await deployContract<MockVariableDebtToken>(
    "MockVariableDebtToken",
    [args[0]]
  );

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    "18",
    args[3],
    args[4],
    args[5]
  );

  return instance;
};

export const deployMockAToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ]
) => {
  const instance = await deployContract<MockAToken>("MockAToken", [args[0]]);

  await instance.initialize(
    args[0],
    args[2],
    args[1],
    args[3],
    "18",
    args[4],
    args[5],
    args[6]
  );

  return instance;
};

export const deployMockIncentivesController = async () =>
  deployContract<MockIncentivesController>("MockIncentivesController");

export const deployMockReserveConfiguration = async () =>
  deployContract<MockReserveConfiguration>("MockReserveConfiguration");

export const deployMockPool = async () => deployContract<MockPool>("MockPool");

export const deployMockInitializableImple = async () =>
  deployContract<MockInitializableImple>("MockInitializableImple");

export const deployMockInitializableImpleV2 = async () =>
  deployContract<MockInitializableImpleV2>("MockInitializableImpleV2");

export const deployMockInitializableFromConstructorImple = async (
  args: [string]
) =>
  deployContract<MockInitializableFromConstructorImple>(
    "MockInitializableFromConstructorImple",
    args
  );

export const deployMockReentrantInitializableImple = async () =>
  deployContract<MockReentrantInitializableImple>(
    "MockReentrantInitializableImple"
  );

export const deployWrappedTokenGateway = async (
  wrappedToken: tEthereumAddress
) =>
  deployContract<WrappedTokenGatewayV3>("WrappedTokenGatewayV3", [
    wrappedToken,
  ]);

export const deployInitializableAdminUpgradeabilityProxy = async (
  slug: string
): Promise<InitializableAdminUpgradeabilityProxy> =>
  deployContract<InitializableAdminUpgradeabilityProxy>(
    "InitializableAdminUpgradeabilityProxy",
    [],
    undefined,
    slug
  );

export const deployCalldataLogicLibrary = async () =>
  deployContract("CalldataLogic");

export const deployL2DeployerImplementation = async (
  addressesProviderAddress: tEthereumAddress
): Promise<L2Pool> => {
  const commonLibraries = await getPoolLibraries();
  const CalldataLogic = await (await hre.deployments.get("EModeLogic")).address;

  return deployContract<L2Pool>("L2Pool", [addressesProviderAddress], {
    ...commonLibraries,
    CalldataLogic,
  });
};

export const deployL2Mock2Pool = async (
  addressesProviderAddress: tEthereumAddress
) => deployContract<MockL2Pool>("MockL2Pool", [addressesProviderAddress]);

export const deployL2Encoder = async (poolProxy: tEthereumAddress) =>
  deployContract<L2Encoder>("L2Encoder", [poolProxy]);

export const deployEmissionManager = async (
  rewardsController: tEthereumAddress,
  owner: tEthereumAddress
) =>
  deployContract<EmissionManager>("EmissionManager", [
    rewardsController,
    owner,
  ]);
