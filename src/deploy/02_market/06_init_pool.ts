import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { V3_CORE_VERSION, ZERO_ADDRESS } from "../../helpers/constants";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getter";
import {
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_CONFIGURATOR_IMPL_ID,
  POOL_CONFIGURATOR_PROXY_ID,
  POOL_IMPL_ID,
  POOL_PROXY_ID,
} from "../../helpers/deploy-ids";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import {
  checkRequiredEnvironment,
  ConfigNames,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { getContract, waitForTx } from "../../helpers/utilities/tx";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { save, deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);

  const proxyArtifact = await deployments.getExtendedArtifact(
    "InitializableImmutableAdminUpgradeabilityProxy"
  );

  const poolImplDeployment = await get(POOL_IMPL_ID);
  const poolConfiguratorImplDeployment = await get(POOL_CONFIGURATOR_IMPL_ID);
  const poolAddrProviderDeployment = await get(POOL_ADDRESSES_PROVIDER_ID);

  const poolAddressesProviderInstance = await getContract(
    "PoolAddressesProvider",
    poolAddrProviderDeployment.address
  );

  // SETUP POOL

  // Set Pool implementation to Addresses provider and save the proxy deployment artifact at disk
  if ((await poolAddressesProviderInstance.getPool()) === ZERO_ADDRESS) {
    const setPoolImplTx = await waitForTx(
      await poolAddressesProviderInstance.setPoolImpl(
        poolImplDeployment.address
      )
    );
    deployments.log(
      `[Deployment] Attached Pool implementation and deployed proxy contract: `
    );
    deployments.log("- Tx hash:", setPoolImplTx.transactionHash);

    const poolProxyAddress = await poolAddressesProviderInstance.getPool();
    deployments.log("- Deployed Proxy:", poolProxyAddress);
    await save(POOL_PROXY_ID, {
      ...proxyArtifact,
      address: poolProxyAddress,
      args: [poolAddressesProviderInstance.address],
    });
  }

  // SETUP POOL CONFIGURATOR

  // Set Pool Configurator to Addresses Provider proxy deployment artifact at disk
  if (
    (await poolAddressesProviderInstance.getPoolConfigurator()) === ZERO_ADDRESS
  ) {
    const setPoolConfiguratorTx = await waitForTx(
      await poolAddressesProviderInstance.setPoolConfiguratorImpl(
        poolConfiguratorImplDeployment.address
      )
    );

    deployments.log(
      `[Deployment] Attached PoolConfigurator implementation and deployed proxy `
    );
    deployments.log("- Tx hash:", setPoolConfiguratorTx.transactionHash);

    const poolConfiguratorProxyAddress =
      await poolAddressesProviderInstance.getPoolConfigurator();
    deployments.log("- Deployed Proxy:", poolConfiguratorProxyAddress);
    await save(POOL_CONFIGURATOR_PROXY_ID, {
      ...proxyArtifact,
      address: poolConfiguratorProxyAddress,
      args: [poolAddressesProviderInstance.address],
    });
  }

  // Set Flash Loan premiums
  const poolConfiguratorInstance = await getPoolConfiguratorProxy();

  // Set total Flash Loan Premium
  await waitForTx(
    await poolConfiguratorInstance.updateFlashloanPremiumTotal(
      poolConfig.FlashLoanPremiums.total
    )
  );

  // Set protocol Flash Loan Premium
  await waitForTx(
    await poolConfiguratorInstance.updateFlashloanPremiumToProtocol(
      poolConfig.FlashLoanPremiums.protocol
    )
  );
  return true;
};

// This script can only be run successfully once per market, core version, and network
func.id = `PoolInitalization:${MARKET_NAME}:aave-v3-core@${V3_CORE_VERSION}`;
func.tags = ["market", "init-pool"];
func.dependencies = ["before-deploy", "core", "periphery-pre", "provider"];
func.skip = async () => checkRequiredEnvironment();

exports.default = func;
