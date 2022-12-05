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
  MarketId: "MahaLend",
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
    // WMATIC: strategyWETH,
  },
  ReserveAssets: {
    [eEthereumNetwork.goerli]: {
      DAI: "0x378fa66Ea6604B4aBc3ac8dA7498F7f30cDf7E87",
      USDC: "0x79126e68BBF94365073E498F7D7929d337EAFB33",
      WETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      ARTH: "0x2a318FC3565FDaF0234f67D6dE3c11CA960Ea715",
      // WMATIC: "0xD869cb58B7AF4BF9034AAFfBD6F370B9923C1294",
    },
    [eEthereumNetwork.coverage]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.polygon]: {
      DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      ARTH: "0xe52509181feb30eb4979e29ec70d50fd5c44d590",
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      WETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
    [eEthereumNetwork.hardhat]: {
      DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      ARTH: "0xe52509181feb30eb4979e29ec70d50fd5c44d590",
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      WETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
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
