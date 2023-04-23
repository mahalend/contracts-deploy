import {
  AssetType,
  ezkSyncNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
  strategyUSDC,
  strategyWETH,
  strategyUSDT,
  strategyLP,
} from "../aave/reservesConfigs";
import { BigNumber } from "ethers";

const e18 = BigNumber.from(10).pow(18);

export const zkSyncEraConfig: IAaveConfiguration = {
  ...AaveMarket,
  MarketId: "zkSyncEra MahaLend Market",
  ATokenNamePrefix: "MahaLend zkSyncEra",
  StableDebtTokenNamePrefix: "MahaLend zkSyncEra",
  VariableDebtTokenNamePrefix: "MahaLend zkSyncEra",
  SymbolPrefix: "m",
  ProviderId: 36,
  ReservesConfig: {
    // ARTH: strategyUSDT,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    WETH: strategyWETH,
  },
  ReserveFactorTreasuryAddress: {
    [ezkSyncNetwork.era]: "0x6bfc9db28f0a6d11a8d9d64c86026ddd2fad293b",
  },
  ReserveAssets: {
    [ezkSyncNetwork.era]: {
      // ARTH: "0x5441695f4445E40900b4c4B0Fb3eD2B9E51601A6",
      SLP_USDT_USDC: "0x79bf7147ebcd0d55e83cb42ed3ba1bb2bb23ef20",
      USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
  },
  EModes: {
    StableEMode: {
      id: "1",
      ltv: "9700",
      liquidationThreshold: "9750",
      liquidationBonus: "10100",
      label: "Stablecoins",
      assets: ["USDC", "USDT"],
    },
  },
  ChainlinkAggregator: {
    [ezkSyncNetwork.era]: {
      // Note: Using EUR/USD Chainlink data feed
      SLP_USDT_USDC: "0xEDe13A2f72eaDd2262818c535d456c1D63CCe90B",
      USDC: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      USDT: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
      WETH: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    },
  },
  IncentivesConfig: {
    enabled: {
      [ezkSyncNetwork.era]: true,
    },
    rewards: {
      [ezkSyncNetwork.era]: {},
    },
    rewardsOracle: {
      [ezkSyncNetwork.era]: {},
    },
    incentivesInput: {
      [ezkSyncNetwork.era]: [
        // {
        //   emissionPerSecond: e18
        //     .mul(1000)
        //     .div(86400 * 30)
        //     .toString(), // 1000 maha per month
        //   duration: 86400 * 365, // 1 year
        //   asset: "USDC",
        //   assetType: AssetType.AToken,
        //   reward: "MAHA",
        //   rewardOracle: "0xF6D51cf808A7A848ea825D41DD2651C4AF236fe1",
        //   transferStrategy: TransferStrategy.PullRewardsStrategy,
        //   transferStrategyParams: "0",
        // },
      ],
    },
  },
};

export default zkSyncEraConfig;
