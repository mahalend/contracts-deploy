import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import { waitForTx } from "../../helpers/misc-utils";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  console.log(">>>> in 00_markets_registry");

  const { deploy } = deployments;
  const { deployer, addressesProviderRegistryOwner } = await getNamedAccounts();

  const poolAddressesProviderRegistryArtifact = await deploy(
    "PoolAddressesProviderRegistry",
    {
      from: deployer,
      args: [deployer],
      ...COMMON_DEPLOY_PARAMS,
    }
  );

  const registryInstance = await hre.ethers.getContractAt(
    poolAddressesProviderRegistryArtifact.abi,
    poolAddressesProviderRegistryArtifact.address
  );

  await waitForTx(
    await registryInstance.transferOwnership(addressesProviderRegistryOwner)
  );

  deployments.log(
    `[Deployment] Transferred ownership of PoolAddressesProviderRegistry to: ${addressesProviderRegistryOwner} `
  );
  return true;
};

func.id = "PoolAddressesProviderRegistry";
func.tags = ["core", "registry"];

export default func;
