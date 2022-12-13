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
      ARTH: "0xfccA31d5f16B06aB9D6743330d4c113DB6D7e878",
      MAHA: ZERO_ADDRESS,
    },
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
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
      DAI: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
      ARTH: "0xBc7A9a2ae5151741e4cA57F8Aeb441D3F7bE7E8C",
      USDC: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
      WETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      MAHA: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    },
    [eEthereumNetwork.tenderlyMain]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.goerli]: "0x67c569F960C1Cc0B9a7979A851f5a67018c5A3b0",
    [eEthereumNetwork.main]: "0x6357EDbfE5aDA570005ceB8FAd3139eF5A8863CC",
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: "0x67c569F960C1Cc0B9a7979A851f5a67018c5A3b0",
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
      [eEthereumNetwork.goerli]: false,
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
        MAHA: "0xb4d930279552397bba2ee473229f89ec245bc365",
      },
      [eEthereumNetwork.hardhat]: {
        MAHA: "0xb4d930279552397bba2ee473229f89ec245bc365",
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
        MAHA: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
      },
      [eEthereumNetwork.hardhat]: {
        MAHA: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
      },
      [eEthereumNetwork.coverage]: {
        MAHA: ZERO_ADDRESS,
      },
    },
    incentivesInput: {
      [eEthereumNetwork.goerli]: [
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
      liquidationThreshold: "9750",
      liquidationBonus: "10100",
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
    [eEthereumNetwork.main]: "0xa68bEA62Dc4034A689AA0F58A76681433caCa663",
    [eEthereumNetwork.goerli]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: "0xa68bEA62Dc4034A689AA0F58A76681433caCa663",
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
  },
  FlashLoanPremiums: {
    total: 0.0005e4,
    protocol: 0.0004e4,
  },
};
