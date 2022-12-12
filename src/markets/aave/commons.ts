import { ZERO_ADDRESS } from "../../helpers/constants";
import {
  ICommonConfiguration,
  eEthereumNetwork,
  TransferStrategy,
  AssetType,
} from "../../helpers/types";

export const CommonsConfig: ICommonConfiguration = {
  MarketId: "MahaLend Market",
  ATokenNamePrefix: "Ethereum",
  StableDebtTokenNamePrefix: "Ethereum",
  VariableDebtTokenNamePrefix: "Ethereum",
  SymbolPrefix: "Eth",
  ProviderId: 8080,
  OracleQuoteCurrencyAddress: ZERO_ADDRESS,
  OracleQuoteCurrency: "USD",
  OracleQuoteUnit: "8",
  WrappedNativeTokenSymbol: "WETH",
  ChainlinkAggregator: {
    [eEthereumNetwork.main]: {
      DAI: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
      USDC: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
      WETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      ARTH: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
      MAHA: ZERO_ADDRESS,
    },
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
      WMATIC: ZERO_ADDRESS,
      MAHA: ZERO_ADDRESS,
      UNI_USDC_DAI_LP: ZERO_ADDRESS,
    },
    [eEthereumNetwork.polygon]: {
      DAI: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
      ARTH: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
      USDC: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
      WETH: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      WMATIC: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
    },
    [eEthereumNetwork.coverage]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.hardhat]: {
      DAI: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
      ARTH: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
      USDC: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
      WETH: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      WMATIC: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
      MAHA: ZERO_ADDRESS,
    },
    [eEthereumNetwork.tenderlyMain]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.goerli]: "0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c",
    [eEthereumNetwork.main]: "0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c",
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
  },
  FallbackOracle: {
    [eEthereumNetwork.goerli]: "0x50913E8E1c650E790F8a1E741FF9B1B1bB251dfe",
    [eEthereumNetwork.main]: "0x5b09e578cfeaa23f1b11127a658855434e4f3e09",
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
  },
  ReservesConfig: {},
  IncentivesConfig: {
    enabled: {
      [eEthereumNetwork.goerli]: true,
      [eEthereumNetwork.polygon]: false,
      [eEthereumNetwork.tenderlyMain]: false,
      [eEthereumNetwork.main]: true,
      [eEthereumNetwork.hardhat]: true,
      [eEthereumNetwork.coverage]: false,
    },
    rewards: {
      [eEthereumNetwork.goerli]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.polygon]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.tenderlyMain]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.main]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.hardhat]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.coverage]: {
        MAHA: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {
      [eEthereumNetwork.goerli]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.polygon]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.tenderlyMain]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.main]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.hardhat]: {
        MAHA: ZERO_ADDRESS,
      },
      [eEthereumNetwork.coverage]: {
        MAHA: ZERO_ADDRESS,
      },
    },
    incentivesInput: {
      [eEthereumNetwork.goerli]: [
        {
          emissionPerSecond: "34629756533",
          duration: 7890000,
          asset: "DAI",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
        {
          emissionPerSecond: "34629756533",
          duration: 7890000,
          asset: "UNI_USDC_DAI_LP",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
        {
          emissionPerSecond: "300801036720127500",
          duration: 7890000,
          asset: "USDC",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
        {
          emissionPerSecond: "300801036720127500",
          duration: 7890000,
          asset: "ARTH",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
        {
          emissionPerSecond: "300801036720127500",
          duration: 7890000,
          asset: "WETH",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
      ],
      [eEthereumNetwork.polygon]: [],
      [eEthereumNetwork.tenderlyMain]: [],
      [eEthereumNetwork.main]: [
        {
          emissionPerSecond: "11709600000000000", // 1000 MAHA in 30 days
          duration: 2592000,
          asset: "ARTH",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
      ],
      [eEthereumNetwork.hardhat]: [
        {
          emissionPerSecond: "11709600000000000", // 1000 MAHA in 30 days
          duration: 2592000,
          asset: "ARTH",
          assetType: AssetType.AToken,
          reward: "MAHA",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.PullRewardsStrategy,
          transferStrategyParams: "0",
        },
      ],
      [eEthereumNetwork.coverage]: [],
    },
  },
  EModes: {
    StableEMode: {
      id: "1",
      ltv: "9700",
      liquidationThreshold: "9900",
      liquidationBonus: "13000",
      label: "Stablecoins",
      assets: ["USDC", "ARTH", "DAI"],
    },
  },
  L2PoolEnabled: {
    [eEthereumNetwork.goerli]: false,
    [eEthereumNetwork.polygon]: false,
    [eEthereumNetwork.tenderlyMain]: false,
    [eEthereumNetwork.main]: false,
    [eEthereumNetwork.hardhat]: false,
    [eEthereumNetwork.coverage]: false,
  },
  ParaswapRegistry: {
    [eEthereumNetwork.main]: ZERO_ADDRESS,
    [eEthereumNetwork.goerli]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
  },
  FlashLoanPremiums: {
    total: 0.0005e4,
    protocol: 0.0004e4,
  },
};
