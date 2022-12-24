import {
  DETERMINISTIC_DEPLOYMENT,
  DETERMINISTIC_FACTORIES,
  ETHERSCAN_KEY,
  getCommonNetworkConfig,
  hardhatNetworkSettings,
  loadTasks,
} from "./helpers/hardhat-config-helpers";
import {
  eArbitrumNetwork,
  eAvalancheNetwork,
  eEthereumNetwork,
  eFantomNetwork,
  eHarmonyNetwork,
  eOptimismNetwork,
  ePolygonNetwork,
  eTenderly,
} from "./helpers/types";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "@nomicfoundation/hardhat-chai-matchers";
// import "@typechain/hardhat";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc", "market-registry"];

// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}

export default {
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  networks: {
    hardhat: hardhatNetworkSettings,
    localhost: {
      url: "http://127.0.0.1:8545",
      ...hardhatNetworkSettings,
    },
    tenderly: getCommonNetworkConfig("tenderly", 3030),
    main: getCommonNetworkConfig(eEthereumNetwork.main, 1),
    kovan: getCommonNetworkConfig(eEthereumNetwork.kovan, 42),
    rinkeby: getCommonNetworkConfig(eEthereumNetwork.rinkeby, 4),
    ropsten: getCommonNetworkConfig(eEthereumNetwork.ropsten, 3),
    [ePolygonNetwork.polygon]: getCommonNetworkConfig(
      ePolygonNetwork.polygon,
      137
    ),
    [ePolygonNetwork.mumbai]: getCommonNetworkConfig(
      ePolygonNetwork.mumbai,
      80001
    ),
    arbitrum: getCommonNetworkConfig(eArbitrumNetwork.arbitrum, 42161),
    [eArbitrumNetwork.arbitrumTestnet]: getCommonNetworkConfig(
      eArbitrumNetwork.arbitrumTestnet,
      421611
    ),
    [eHarmonyNetwork.main]: getCommonNetworkConfig(
      eHarmonyNetwork.main,
      1666600000
    ),
    [eHarmonyNetwork.testnet]: getCommonNetworkConfig(
      eHarmonyNetwork.testnet,
      1666700000
    ),
    [eAvalancheNetwork.avalanche]: getCommonNetworkConfig(
      eAvalancheNetwork.avalanche,
      43114
    ),
    [eAvalancheNetwork.fuji]: getCommonNetworkConfig(
      eAvalancheNetwork.fuji,
      43113
    ),
    [eFantomNetwork.main]: getCommonNetworkConfig(eFantomNetwork.main, 250),
    [eFantomNetwork.testnet]: getCommonNetworkConfig(
      eFantomNetwork.testnet,
      4002
    ),
    [eOptimismNetwork.testnet]: getCommonNetworkConfig(
      eOptimismNetwork.testnet,
      420
    ),
    [eOptimismNetwork.main]: getCommonNetworkConfig(eOptimismNetwork.main, 10),
    [eEthereumNetwork.görli]: getCommonNetworkConfig(eEthereumNetwork.görli, 5),
    [eArbitrumNetwork.görliNitro]: getCommonNetworkConfig(
      eArbitrumNetwork.görliNitro,
      421613
    ),
  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS,
  },
  mocha: {
    timeout: 0,
  },
  dependencyCompiler: {
    paths: [
      "@mahalend/core-v3/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol",
      "@mahalend/core-v3/contracts/protocol/configuration/PoolAddressesProvider.sol",
      "@mahalend/core-v3/contracts/misc/AaveOracle.sol",
      "@mahalend/core-v3/contracts/protocol/tokenization/AToken.sol",
      "@mahalend/core-v3/contracts/protocol/tokenization/DelegationAwareAToken.sol",
      "@mahalend/core-v3/contracts/protocol/tokenization/StableDebtToken.sol",
      "@mahalend/core-v3/contracts/protocol/tokenization/VariableDebtToken.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/GenericLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/ValidationLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/ReserveLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/SupplyLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/EModeLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/BorrowLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/BridgeLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/FlashLoanLogic.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/logic/CalldataLogic.sol",
      "@mahalend/core-v3/contracts/protocol/pool/Pool.sol",
      "@mahalend/core-v3/contracts/protocol/pool/L2Pool.sol",
      "@mahalend/core-v3/contracts/protocol/pool/PoolConfigurator.sol",
      "@mahalend/core-v3/contracts/protocol/pool/DefaultReserveInterestRateStrategy.sol",
      "@mahalend/core-v3/contracts/protocol/libraries/aave-upgradeability/InitializableImmutableAdminUpgradeabilityProxy.sol",
      "@mahalend/core-v3/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol",
      "@mahalend/core-v3/contracts/deployments/ReservesSetupHelper.sol",
      "@mahalend/core-v3/contracts/misc/AaveProtocolDataProvider.sol",
      "@mahalend/core-v3/contracts/misc/L2Encoder.sol",
      "@mahalend/core-v3/contracts/protocol/configuration/ACLManager.sol",
      "@mahalend/core-v3/contracts/dependencies/weth/WETH9.sol",
      "@mahalend/core-v3/contracts/mocks/helpers/MockIncentivesController.sol",
      "@mahalend/core-v3/contracts/mocks/helpers/MockReserveConfiguration.sol",
      "@mahalend/core-v3/contracts/mocks/oracle/CLAggregators/MockAggregator.sol",
      "@mahalend/core-v3/contracts/mocks/tokens/MintableERC20.sol",
      "@mahalend/core-v3/contracts/mocks/flashloan/MockFlashLoanReceiver.sol",
      "@mahalend/core-v3/contracts/mocks/tokens/WETH9Mocked.sol",
      "@mahalend/core-v3/contracts/mocks/upgradeability/MockVariableDebtToken.sol",
      "@mahalend/core-v3/contracts/mocks/upgradeability/MockAToken.sol",
      "@mahalend/core-v3/contracts/mocks/upgradeability/MockStableDebtToken.sol",
      "@mahalend/core-v3/contracts/mocks/upgradeability/MockInitializableImplementation.sol",
      "@mahalend/core-v3/contracts/mocks/helpers/MockPool.sol",
      "@mahalend/core-v3/contracts/mocks/helpers/MockL2Pool.sol",
      "@mahalend/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol",
      "@mahalend/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol",
      "@mahalend/core-v3/contracts/mocks/oracle/PriceOracle.sol",
      "@mahalend/core-v3/contracts/mocks/tokens/MintableDelegationERC20.sol",
      "@mahalend/periphery-v3/contracts/misc/UiPoolDataProviderV3.sol",
      "@mahalend/periphery-v3/contracts/misc/WalletBalanceProvider.sol",
      "@mahalend/periphery-v3/contracts/misc/WrappedTokenGatewayV3.sol",
      "@mahalend/periphery-v3/contracts/misc/interfaces/IWETH.sol",
      "@mahalend/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol",
      "@mahalend/periphery-v3/contracts/rewards/RewardsController.sol",
      "@mahalend/periphery-v3/contracts/rewards/transfer-strategies/StakedTokenTransferStrategy.sol",
      "@mahalend/periphery-v3/contracts/rewards/transfer-strategies/PullRewardsTransferStrategy.sol",
      "@mahalend/periphery-v3/contracts/rewards/EmissionManager.sol",
      "@mahalend/periphery-v3/contracts/treasury/Collector.sol",
      "@mahalend/periphery-v3/contracts/treasury/CollectorController.sol",
      "@mahalend/periphery-v3/contracts/treasury/AaveEcosystemReserveV2.sol",
      "@mahalend/periphery-v3/contracts/treasury/AaveEcosystemReserveController.sol",
      "@mahalend/periphery-v3/contracts/adapters/paraswap/ParaSwapLiquiditySwapAdapter.sol",
      "@mahalend/periphery-v3/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol",
      "@openzeppelin/contracts/token/ERC20/IERC20.sol",
    ],
  },
  deterministicDeployment: DETERMINISTIC_DEPLOYMENT
    ? DETERMINISTIC_FACTORIES
    : undefined,
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
