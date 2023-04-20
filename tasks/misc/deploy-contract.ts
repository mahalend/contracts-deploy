import { task } from "hardhat/config";

import {
  ConfigNames,
  eNetwork,
  IAaveConfiguration,
  loadPoolConfig,
  POOL_ADDRESSES_PROVIDER_ID,
} from "../../helpers";
import { MARKET_NAME } from "../../helpers/env";

task(`deploy-contract`).setAction(async (_, hre) => {
  if (!hre.network.config.chainId) {
    throw new Error("INVALID_CHAIN_ID");
  }

  const { deployer } = await hre.getNamedAccounts();

  const instance = await hre.deployments.deploy(`MasterchefAToken-Arbitrum`, {
    from: deployer,
    args: ["0x88c6a98430Cc833E168430DaC427e9796C9EC576"],
    contract: "MasterchefAToken",
    log: true,
  });

  console.log("deployed to", instance.address);
});
