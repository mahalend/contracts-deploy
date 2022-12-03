import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { waitForTx } from "../../helpers/misc-utils";
import { ZERO_ADDRESS } from "../../helpers/constants";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import {
  TREASURY_CONTROLLER_ID,
  TREASURY_IMPL_ID,
  TREASURY_PROXY_ID,
} from "../../helpers/deploy-ids";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer, treasuryProxyAdmin } = await getNamedAccounts();

  // Deploy Treasury proxy
  const treasuryProxyArtifact = await deploy(TREASURY_PROXY_ID, {
    from: deployer,
    contract: "InitializableAdminUpgradeabilityProxy",
    args: [],
  });

  // Deploy Treasury Controller
  const treasuryController = await deploy(TREASURY_CONTROLLER_ID, {
    from: deployer,
    contract: "AaveEcosystemReserveController",
    args: [treasuryProxyAdmin],
  });

  // Deploy Treasury implementation and initialize proxy
  const treasuryImplArtifact = await deploy(TREASURY_IMPL_ID, {
    from: deployer,
    contract: "AaveEcosystemReserveV2",
    args: [],
    ...COMMON_DEPLOY_PARAMS,
  });

  const treasuryImpl = await hre.ethers.getContractAt(
    treasuryImplArtifact.abi,
    treasuryImplArtifact.address
  );
  await waitForTx(await treasuryImpl.initialize(ZERO_ADDRESS));

  const proxy = await hre.ethers.getContractAt(
    treasuryProxyArtifact.abi,
    treasuryProxyArtifact.address
  );
  const initializePayload = treasuryImpl.interface.encodeFunctionData(
    "initialize",
    [treasuryController.address]
  );

  await waitForTx(
    await proxy["initialize(address,address,bytes)"](
      treasuryImplArtifact.address,
      treasuryProxyAdmin,
      initializePayload
    )
  );

  return true;
};

func.tags = ["periphery-pre", "TreasuryProxy"];
func.dependencies = [];
func.id = "Treasury";

export default func;
