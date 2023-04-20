import { task } from "hardhat/config";

task(`verify-specific`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    await hre.run("verify:verify", {
      // contract:
      //   "@mahalend/core/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol:InitializableAdminUpgradeabilityProxy",
      address: "0x25CD0CcECad3665372d525E134f2D36B22A13f18",
      constructorArguments: ["0x23463CDF1F9ea54f5aa568C307D0C5e9bEa02F14"],
    });
  }
);
