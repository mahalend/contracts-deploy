import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { V3_CORE_VERSION } from "../../helpers/constants";
import { POOL_DATA_PROVIDER } from "../../helpers/deploy-ids";
import { MARKET_NAME } from "../../helpers/env";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../helpers/init-helpers";
import {
  checkRequiredEnvironment,
  ConfigNames,
  getReserveAddresses,
  getTreasuryAddress,
  loadPoolConfig,
  savePoolTokens,
} from "../../helpers/market-config-helpers";
import { eNetwork } from "../../helpers/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  const { deployer } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const {
    ATokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
    ReservesConfig,
  } = poolConfig;
  const reservesAddresses = await getReserveAddresses(
    poolConfig,
    network as eNetwork
  );
  const treasuryAddress = await getTreasuryAddress(
    poolConfig,
    network as eNetwork
  );
  const incentivesController = await deployments.get("IncentivesProxy");
  // Deploy Reserves ATokens
  await initReservesByHelper(
    ReservesConfig,
    reservesAddresses,
    ATokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
    deployer,
    treasuryAddress,
    incentivesController.address
  );
  deployments.log(`[Deployment] Initialized all reserves`);
  await configureReservesByHelper(ReservesConfig, reservesAddresses);
  // Save AToken and Debt tokens artifacts
  const dataProvider = await deployments.get(POOL_DATA_PROVIDER);
  await savePoolTokens(reservesAddresses, dataProvider.address);
  deployments.log(`[Deployment] Configured all reserves`);
  return true;
};

// This script can only be run successfully once per market, core version, and network
func.id = `ReservesInit:${MARKET_NAME}:aave-v3-core@${V3_CORE_VERSION}`;
func.tags = ["market", "init-reserves"];
func.dependencies = [
  "before-deploy",
  "core",
  "periphery-pre",
  "provider",
  "init-pool",
  "oracles",
];

func.skip = async () => checkRequiredEnvironment();
exports.default = func;
