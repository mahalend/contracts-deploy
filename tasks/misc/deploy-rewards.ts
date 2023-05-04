import { task } from "hardhat/config";

import {
  EMISSION_MANAGER_ID,
  EmissionManager,
  getContract,
  INCENTIVES_PROXY_ID,
  INCENTIVES_SIMPLE_REWARDS_STRATEGY_ID,
  INCENTIVES_V2_IMPL_ID,
  PoolAddressesProvider,
  RewardsController,
  waitForTx,
  ZERO_ADDRESS,
} from "../../helpers";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";

task(`deploy-rewards`).setAction(async (_, hre) => {
  const { save, deploy } = hre.deployments;

  const { deployer, incentivesRewardsVault, incentivesEmissionManager } =
    await hre.getNamedAccounts();

  const proxyArtifact = await hre.deployments.getExtendedArtifact(
    "InitializableImmutableAdminUpgradeabilityProxy"
  );

  // const { address: addressesProvider } = await hre.deployments.get(
  //   POOL_ADDRESSES_PROVIDER_ID
  // );

  const addressesProviderInstance = (
    await getContract(
      "PoolAddressesProvider",
      "0x3Bbf9f4762508b4DcC3C98B59030D33277949276"
    )
  ).connect(await hre.ethers.getSigner(deployer)) as PoolAddressesProvider;

  // Deploy EmissionManager
  const emissionManagerArtifact = await deploy(EMISSION_MANAGER_ID, {
    from: deployer,
    contract: "EmissionManager",
    args: [deployer],
    ...COMMON_DEPLOY_PARAMS,
  });
  const emissionManager = (await hre.ethers.getContractAt(
    emissionManagerArtifact.abi,
    emissionManagerArtifact.address
  )) as EmissionManager;

  // Deploy Incentives Implementation
  const incentivesImplArtifact = await deploy(INCENTIVES_V2_IMPL_ID, {
    from: deployer,
    contract: "RewardsController",
    args: [emissionManagerArtifact.address],
    ...COMMON_DEPLOY_PARAMS,
  });

  const incentivesImpl = (await hre.ethers.getContractAt(
    incentivesImplArtifact.abi,
    incentivesImplArtifact.address
  )) as RewardsController;

  // Call to initialize at implementation contract to prevent others.
  await waitForTx(await incentivesImpl.initialize(ZERO_ADDRESS));

  // The Rewards Controller must be set at PoolAddressesProvider with id keccak256("INCENTIVES_CONTROLLER"):
  // 0x703c2c8634bed68d98c029c18f310e7f7ec0e5d6342c590190b3cb8b3ba54532
  const incentivesControllerId = hre.ethers.utils.keccak256(
    hre.ethers.utils.toUtf8Bytes("INCENTIVES_CONTROLLER")
  );

  const isRewardsProxyPending =
    (await addressesProviderInstance.getAddress(incentivesControllerId)) ===
    ZERO_ADDRESS;

  if (isRewardsProxyPending) {
    const setRewardsAsProxyTx = await waitForTx(
      await addressesProviderInstance.setAddressAsProxy(
        incentivesControllerId,
        incentivesImpl.address
      )
    );

    const proxyAddress = await addressesProviderInstance.getAddress(
      incentivesControllerId
    );
    await save(INCENTIVES_PROXY_ID, {
      ...proxyArtifact,
      address: proxyAddress,
    });

    hre.deployments.log(
      `[Deployment] Attached Rewards implementation and deployed proxy contract: `
    );
    hre.deployments.log("- Tx hash:", setRewardsAsProxyTx.transactionHash);
  }

  const { address: rewardsProxyAddress } = await hre.deployments.get(
    INCENTIVES_PROXY_ID
  );

  // Init RewardsController address
  await waitForTx(
    await emissionManager.setRewardsController(rewardsProxyAddress)
  );

  await deploy(INCENTIVES_SIMPLE_REWARDS_STRATEGY_ID, {
    from: deployer,
    contract: "SimpleRewardsTransferStrategy",
    args: [rewardsProxyAddress, incentivesEmissionManager],
    ...COMMON_DEPLOY_PARAMS,
  });

  // Transfer emission manager ownership
  // await waitForTx(
  //   await emissionManager.transferOwnership(incentivesEmissionManager)
  // );

  return true;
});
