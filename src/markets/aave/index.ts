import { ZERO_ADDRESS } from "../../helpers/constants";
import { IAaveConfiguration, eEthereumNetwork } from "../../helpers/types";

import { CommonsConfig } from "./commons";
import {
  strategyDAI,
  strategyUSDC,
  strategyARTH,
  strategyWETH,
  strategyUNI_USDC_DAI_LP,
} from "./reservesConfigs";

export const AaveConfig: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: "MahaLend",
  ATokenNamePrefix: "Ethereum",
  StableDebtTokenNamePrefix: "Ethereum",
  VariableDebtTokenNamePrefix: "Ethereum",
  SymbolPrefix: "",
  ProviderId: 30,
  ReservesConfig: {
    DAI: strategyDAI,
    ARTH: strategyARTH,
    USDC: strategyUSDC,
    WETH: strategyWETH,
    UNI_USDC_DAI_LP: strategyUNI_USDC_DAI_LP,
    // WMATIC: strategyWETH,
  },
  ReserveAssets: {
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
      UNI_USDC_DAI_LP: "0xC82C32C39Ea083288Ce91F89df59442eCf2612E0",
      // WMATIC: ZERO_ADDRESS,
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
    [eEthereumNetwork.tenderlyMain]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
    },
    [eEthereumNetwork.hardhat]: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      ARTH: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    [eEthereumNetwork.main]: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      ARTH: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
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
    [eEthereumNetwork.main]: ZERO_ADDRESS,
  },
};

export default AaveConfig;
