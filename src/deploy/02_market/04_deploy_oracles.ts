import { parseUnits } from "ethers/lib/utils";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { V3_CORE_VERSION, ZERO_ADDRESS } from "../../helpers/constants";
import {
  FALLBACK_ORACLE_ID,
  ORACLE_ID,
  POOL_ADDRESSES_PROVIDER_ID,
} from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import { getPairsTokenAggregator } from "../../helpers/init-helpers";
import {
  checkRequiredEnvironment,
  ConfigNames,
  getChainlinkOracles,
  getParamPerNetwork,
  getReserveAddresses,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { eNetwork } from "../../helpers/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  const { OracleQuoteUnit } = poolConfig;
  const { address: addressesProviderAddress } = await deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );
  const fallbackOracleAddress =
    (await getParamPerNetwork(
      poolConfig.FallbackOracle,
      network as eNetwork
    )) || ZERO_ADDRESS;
  const reserveAssets = await getReserveAddresses(
    poolConfig,
    network as eNetwork
  );
  const chainlinkAggregators = await getChainlinkOracles(
    poolConfig,
    network as eNetwork
  );
  const [assets, sources] = getPairsTokenAggregator(
    reserveAssets,
    chainlinkAggregators
  );

  // Deploy AaveOracle
  await deploy(ORACLE_ID, {
    from: deployer,
    args: [
      addressesProviderAddress,
      assets,
      sources,
      fallbackOracleAddress,
      ZERO_ADDRESS,
      parseUnits("1", OracleQuoteUnit),
    ],
    ...COMMON_DEPLOY_PARAMS,
    contract: "AaveOracle",
  });

  // Deploy FallbackOracle
  await deploy(FALLBACK_ORACLE_ID, {
    from: deployer,
    args: [],
    ...COMMON_DEPLOY_PARAMS,
    contract: "PriceOracle",
  });
  return true;
};

func.id = `Oracles:${MARKET_NAME}:aave-v3-core@${V3_CORE_VERSION}`;
func.tags = ["market", "oracle"];
func.dependencies = ["before-deploy"];
func.skip = async () => checkRequiredEnvironment();

export default func;
