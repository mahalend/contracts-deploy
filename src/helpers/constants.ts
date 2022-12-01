import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import { eEthereumNetwork, eNetwork } from './types';

export const PERCENTAGE_FACTOR = '10000';
export const HALF_PERCENTAGE = BigNumber.from(PERCENTAGE_FACTOR).div(2).toString();
export const WAD = BigNumber.from(10).pow(18).toString();
export const HALF_WAD = BigNumber.from(WAD).div(2).toString();
export const RAY = BigNumber.from(10).pow(27).toString();
export const HALF_RAY = BigNumber.from(RAY).div(2).toString();
export const WAD_RAY_RATIO = parseUnits('1', 9).toString();
export const oneEther = parseUnits('1', 18);
export const oneRay = parseUnits('1', 27);
export const MAX_UINT_AMOUNT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const MAX_BORROW_CAP = '68719476735';
export const MAX_SUPPLY_CAP = '68719476735';
export const MAX_UNBACKED_MINT_CAP = '68719476735';
export const ONE_YEAR = '31536000';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ONE_ADDRESS = '0x0000000000000000000000000000000000000001';

export const MOCK_USD_PRICE_IN_WEI = '5848466240000000';
export const USD_ADDRESS = '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96';
export const AAVE_REFERRAL = '0';

export const TEST_SNAPSHOT_ID = '0x1';
export const HARDHAT_CHAINID = 31337;
export const COVERAGE_CHAINID = 1337;

export const WRAPPED_NATIVE_TOKEN_PER_NETWORK: { [key: string | eNetwork]: string } = {
  [eEthereumNetwork.kovan]: ZERO_ADDRESS,
  [eEthereumNetwork.ropsten]: ZERO_ADDRESS,
  [eEthereumNetwork.coverage]: ZERO_ADDRESS,
  [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
  [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
  [eEthereumNetwork.rinkeby]: ZERO_ADDRESS,
  [eEthereumNetwork.main]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

export const V3_CORE_VERSION: string = require("@mahalend/core-v3/package.json");

export const V3_PERIPHERY_VERSION: string = require("@mahalend/periphery-v3/package.json");

export const EMPTY_STORAGE_SLOT =
  "0x0000000000000000000000000000000000000000000000000000000000000000";


export const ZERO_BYTES_32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const MOCK_CHAINLINK_AGGREGATORS_PRICES: { [key: string | eEthereumNetwork]: string } = {
  AAVE: parseUnits("300", 8).toString(),
  WETH: parseUnits("4000", 8).toString(),
  ETH: parseUnits("4000", 8).toString(),
  DAI: parseUnits("1", 8).toString(),
  USDC: parseUnits("1", 8).toString(),
  USDT: parseUnits("1", 8).toString(),
  WBTC: parseUnits("60000", 8).toString(),
  USD: parseUnits("1", 8).toString(),
  LINK: parseUnits("30", 8).toString(),
  CRV: parseUnits("6", 8).toString(),
  BAL: parseUnits("19.70", 8).toString(),
  REW: parseUnits("1", 8).toString(),
  EURS: parseUnits("1.126", 8).toString(),
  ONE: parseUnits("0.28", 8).toString(),
  WONE: parseUnits("0.28", 8).toString(),
  WAVAX: parseUnits("86.59", 8).toString(),
  WFTM: parseUnits("2.42", 8).toString(),
  WMATIC: parseUnits("1.40", 8).toString(),
  SUSD: parseUnits("1", 8).toString(),
  SUSHI: parseUnits("2.95", 8).toString(),
  GHST: parseUnits("2.95", 8).toString(),
  AGEUR: parseUnits("1.126", 8).toString(),
  JEUR: parseUnits("1.126", 8).toString(),
  DPI: parseUnits("149", 8).toString(),
};

export const chainlinkAggregatorProxy: { [key: string | eEthereumNetwork]: string } = {
  main: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  kovan: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  polygon: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
  mumbai: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
  avalanche: "0x0A77230d17318075983913bC2145DB16C7366156",
  fuji: "0x5498BB86BC934c8D34FDA08E81D444153d0D06aD",
  tenderly: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  "arbitrum-testnet": "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8",
  rinkeby: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  harmony: "0xdCD81FbbD6c4572A69a534D8b8152c562dA8AbEF",
  optimism: "0xA969bEB73d918f6100163Cd0fba3C586C269bee1",
  fantom: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc",
  "harmony-testnet": "0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD",
  "optimism-testnet": "0xEFFC18fC3b7eb8E676dac549E0c693ad50D1Ce31",
  "fantom-testnet": "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D",
  ropsten: "0x12BAaa24D85A4A180F0d5ae67b6aCbDDD58968EA",
  görli: "0x60E4B131f0F219c72b0346675283E73888e4AB24",
};

export const chainlinkEthUsdAggregatorProxy: { [key: string | eEthereumNetwork]: string } = {
  main: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  kovan: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  polygon: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  mumbai: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
  avalanche: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
  fuji: "0x86d67c3D38D2bCeE722E601025C25a575021c6EA",
  tenderly: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  "arbitrum-testnet": "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8",
  rinkeby: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  harmony: "0xbaf7C8149D586055ed02c286367A41E0aDA96b7C",
  optimism: "0xA969bEB73d918f6100163Cd0fba3C586C269bee1",
  fantom: "0x11DdD3d147E5b83D01cee7070027092397d63658",
  "harmony-testnet": "0x4f11696cE92D78165E1F8A9a4192444087a45b64",
  "optimism-testnet": "0xEFFC18fC3b7eb8E676dac549E0c693ad50D1Ce31",
  "fantom-testnet": "0xB8C458C957a6e6ca7Cc53eD95bEA548c52AFaA24",
  ropsten: "0x12BAaa24D85A4A180F0d5ae67b6aCbDDD58968EA",
  görli: "0x60E4B131f0F219c72b0346675283E73888e4AB24",
};