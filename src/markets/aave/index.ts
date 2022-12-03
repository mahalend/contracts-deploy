import { ZERO_ADDRESS } from "../../helpers/constants";
import { IAaveConfiguration, eEthereumNetwork } from "../../helpers/types";

import { CommonsConfig } from "./commons";
import {
  strategyDAI,
  strategyUSDC,
  strategyARTH,
  strategyWETH,
} from "./reservesConfigs";

export const AaveConfig: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: "Ethereum MahaLend Market",
  ATokenNamePrefix: "Ethereum",
  StableDebtTokenNamePrefix: "Ethereum",
  VariableDebtTokenNamePrefix: "Ethereum",
  SymbolPrefix: "ETH",
  ProviderId: 30,
  ReservesConfig: {
    DAI: strategyDAI,
    ARTH: strategyARTH,
    USDC: strategyUSDC,
    WETH: strategyWETH,
  },
  ReserveAssets: {
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.coverage]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.polygon]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.hardhat]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.tenderlyMain]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.main]: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      ARTH: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
  },
  StkAaveProxy: {
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.goerli]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.main]: "0x4da27a545c0c5B758a6BA100e3a049001de870f5",
  },
};

export default AaveConfig;
