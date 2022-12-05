import { utils } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { V3_CORE_VERSION, ZERO_ADDRESS } from "../../helpers/constants";
import {
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_DATA_PROVIDER,
} from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import { addMarketToRegistry } from "../../helpers/init-helpers";
import {
  checkRequiredEnvironment,
  ConfigNames,
  getReserveAddresses,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { waitForTx } from "../../helpers/misc-utils";
import { eNetwork } from "../../helpers/types";
import {
  containsSameMembers,
  isEqualAddress,
} from "../../helpers/utilities/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  // 0. Check beforehand that all reserves have non-zero addresses
  const reserves = await getReserveAddresses(poolConfig, network as eNetwork);
  const reservesConfig = poolConfig.ReservesConfig;
  const reserveConfigSymbols = Object.keys(reservesConfig);
  const reserveSymbols = Object.keys(reserves);

  if (!containsSameMembers(reserveConfigSymbols, reserveSymbols)) {
    console.log(reserveConfigSymbols);
    console.log(reserveSymbols);
    throw "[Deployment][Error] Mismatch between Config.ReservesConfig and Config.ReserveAssets token symbols";
  }
  if (reserveSymbols.length === 0) {
    throw "[Deployment][Error] Missing ReserveAssets configuration";
  }

  for (let y = 0; y < reserveSymbols.length; y++) {
    if (
      !reserves[reserveSymbols[y]] ||
      utils.getAddress(reserves[reserveSymbols[y]]) === ZERO_ADDRESS
    ) {
      throw `[Deployment][Error] Missing token ${reserveSymbols[y]} ReserveAssets configuration`;
    }
  }

  // 1. Deploy PoolAddressesProvider
  // NOTE: The script passes 0 as market id to create the same address of PoolAddressesProvider
  // in multiple networks via CREATE2. Later in this script it will update the corresponding Market ID.
  const addressesProviderArtifact = await deploy(POOL_ADDRESSES_PROVIDER_ID, {
    from: deployer,
    contract: "PoolAddressesProvider",
    args: ["0", deployer],
    ...COMMON_DEPLOY_PARAMS,
  });
  const addressesProviderInstance = await hre.ethers.getContractAt(
    addressesProviderArtifact.abi,
    addressesProviderArtifact.address
  );

  // 2. Set the MarketId
  console.log("2. Set the MarketId");
  await waitForTx(
    await addressesProviderInstance.setMarketId(poolConfig.MarketId)
  );

  // 3. Add AddressesProvider to Registry
  console.log("3. Add AddressesProvider to Registry");
  await addMarketToRegistry(
    poolConfig.ProviderId,
    addressesProviderArtifact.address
  );

  // 4. Deploy AaveProtocolDataProvider getters contract
  console.log("4. Deploy AaveProtocolDataProvider getters contract");
  const protocolDataProvider = await deploy(POOL_DATA_PROVIDER, {
    from: deployer,
    contract: "AaveProtocolDataProvider",
    args: [addressesProviderArtifact.address],
    ...COMMON_DEPLOY_PARAMS,
  });

  const currentProtocolDataProvider =
    await addressesProviderInstance.getPoolDataProvider();

  // Set the ProtocolDataProvider if is not already set at addresses provider
  console.log(
    "Set the ProtocolDataProvider if is not already set at addresses provider"
  );
  if (
    !isEqualAddress(protocolDataProvider.address, currentProtocolDataProvider)
  ) {
    await waitForTx(
      await addressesProviderInstance.setPoolDataProvider(
        protocolDataProvider.address
      )
    );
  }

  return true;
};

// This script can only be run successfully once per market, core version, and network
func.id = `PoolAddressesProvider:${MARKET_NAME}:aave-v3-core@${V3_CORE_VERSION}`;
func.tags = ["market", "provider"];
func.dependencies = ["before-deploy", "core", "periphery-pre", "token-setup"];
func.skip = async () => checkRequiredEnvironment();

export default func;
