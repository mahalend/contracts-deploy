import { eArbitrumNetwork, IAaveConfiguration } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
  strategyDAI,
  strategyUSDC,
  strategyWETH,
  strategyUSDT,
} from "../aave/reservesConfigs";

export const ArbitrumConfig: IAaveConfiguration = {
  ...AaveMarket,
  MarketId: "Arbitrum MahaLend Market",
  ATokenNamePrefix: "Arbitrum",
  StableDebtTokenNamePrefix: "Arbitrum",
  VariableDebtTokenNamePrefix: "Arbitrum",
  SymbolPrefix: "mArb",
  ProviderId: 36,
  ReservesConfig: {
    ARTH: strategyUSDT,
    DAI: strategyDAI,
    SLP_USDTUSDC: strategyWETH,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    WETH: strategyWETH,
  },
  ReserveAssets: {
    [eArbitrumNetwork.arbitrum]: {
      ARTH: "0x5441695f4445E40900b4c4B0Fb3eD2B9E51601A6",
      DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      SLP_USDTUSDC: "0x772500810ab7975073c14E2054f8f891A2190572",
      USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
    [eArbitrumNetwork.arbitrumTestnet]: {
      ARTH: ZERO_ADDRESS,
      DAI: ZERO_ADDRESS,
      SLP_USDTUSDC: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
    },
  },
  EModes: {
    StableEMode: {
      id: "1",
      ltv: "9700",
      liquidationThreshold: "9750",
      liquidationBonus: "10100",
      label: "Stablecoins",
      assets: ["USDC", "USDT", "DAI", "ARTH"],
    },
  },
  ChainlinkAggregator: {
    [eArbitrumNetwork.arbitrum]: {
      // Note: Using EUR/USD Chainlink data feed
      SLP_USDTUSDC: "", // todo
      ARTH: "", // todo
      DAI: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
      USDC: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      USDT: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
      WETH: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    },
  },
};

export default ArbitrumConfig;
