require("dotenv").config();

import { HardhatUserConfig } from "hardhat/types";
import { accounts } from "./test-wallets";
import { eEthereumNetwork, eNetwork } from "./src/helpers/types";

import {
  BUIDLEREVM_CHAINID,
  COVERAGE_CHAINID,
} from "./src/helpers/buidler-constants";
import {
  NETWORKS_RPC_URL,
  buildForkConfig,
  GWEI,
} from "./src/helpers/helper-hardhat-config";

import "hardhat-deploy";
import "hardhat-deploy-ethers";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "hardhat-typechain";
// import "@tenderly/hardhat-tenderly";
import "solidity-coverage";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const DEFAULT_BLOCK_GAS_LIMIT = 8000000;
const DEFAULT_GAS_MUL = 5;
const HARDFORK = "istanbul";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY || "";
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || "";
const UNLIMITED_BYTECODE_SIZE = process.env.UNLIMITED_BYTECODE_SIZE === "true";
const PRIVATE_KEYS = process.env.PRIVATE_KEYS;

const getCommonNetworkConfig = (networkName: eNetwork, networkId: number) => ({
  url: NETWORKS_RPC_URL[networkName],
  hardfork: HARDFORK,
  blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
  gasMultiplier: DEFAULT_GAS_MUL,
  gasPrice: 10 * GWEI,
  chainId: networkId,
  deploy: ["./src/deploy/"],
  accounts: PRIVATE_KEYS
    ? PRIVATE_KEYS.split(",")
    : {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
      },
});

const buidlerConfig: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: { enabled: true, runs: 100000 },
      evmVersion: "london",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  verify: {
    etherscan: {
      apiKey: POLYGONSCAN_KEY,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
    },
  },
  mocha: {
    timeout: 0,
  },
  // tenderly: {
  //   project: process.env.TENDERLY_PROJECT || "",
  //   username: process.env.TENDERLY_USERNAME || "",
  //   forkNetwork: "1", //Network id of the network we want to fork
  // },
  namedAccounts: {
    deployer: {
      default: 0, // Here this will by default take the first account as deployer
    },
    treasuryProxyAdmin: {
      default: 0,
    },
    incentivesProxyAdmin: {
      default: 0,
    },
    addressesProviderRegistryOwner: {
      default: 0,
    },
    poolAdmin: {
      default: 0,
    },
    aclAdmin: {
      default: 0,
    },
    emergencyAdmin: {
      default: 0,
    },
    incentivesEmissionManager: {
      default: 0,
    },
    incentivesRewardsVault: {
      default: 0,
    },
  },
  external: {
    contracts: [
      {
        artifacts: "./src/helpers/contract-artifacts/core",
      },
      {
        artifacts: "./src/helpers/contract-artifacts/periphery",
      },
    ],
  },
  networks: {
    coverage: {
      url: "http://localhost:8555",
      chainId: COVERAGE_CHAINID,
    },
    polygon: {
      ...getCommonNetworkConfig(eEthereumNetwork.polygon, 137),
      live: true,
      gasPrice: 50 * GWEI,
    },
    goerli: getCommonNetworkConfig(eEthereumNetwork.goerli, 5),
    main: {
      ...getCommonNetworkConfig(eEthereumNetwork.main, 1),
      live: true,
      gasPrice: 15 * GWEI,
    },
    tenderly: getCommonNetworkConfig(eEthereumNetwork.tenderlyMain, 3030),
    hardhat: {
      allowUnlimitedContractSize: UNLIMITED_BYTECODE_SIZE,
      chainId: BUIDLEREVM_CHAINID,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      live: true,
      accounts: accounts.map(
        ({ secretKey, balance }: { secretKey: string; balance: string }) => ({
          privateKey: secretKey,
          balance,
        })
      ),
      forking: buildForkConfig(),
      deploy: ["src/deploy/"],
    },
    buidlerevm_docker: {
      hardfork: "berlin",
      blockGasLimit: 9500000,
      gas: 9500000,
      gasPrice: 8000000000,
      chainId: BUIDLEREVM_CHAINID,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      url: "http://localhost:8545",
    },
    ganache: {
      url: "http://ganache:8545",
      accounts: {
        mnemonic:
          "fox sight canyon orphan hotel grow hedgehog build bless august weather swarm",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  },
};

export default buidlerConfig;
