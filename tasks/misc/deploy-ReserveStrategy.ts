import { task } from "hardhat/config";

import {
  ConfigNames,
  eNetwork,
  IAaveConfiguration,
  loadPoolConfig,
  POOL_ADDRESSES_PROVIDER_ID,
} from "../../helpers";
import { MARKET_NAME } from "../../helpers/env";

task(`deploy-ReserveStrategy`).setAction(async (_, hre) => {
  if (!hre.network.config.chainId) {
    throw new Error("INVALID_CHAIN_ID");
  }

  const network = (
    process.env.FORK ? process.env.FORK : hre.network.name
  ) as eNetwork;
  const { deployer } = await hre.getNamedAccounts();

  const poolConfig = (await loadPoolConfig(
    MARKET_NAME as ConfigNames
  )) as IAaveConfiguration;

  const addressProviderArtifact = await hre.deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );

  const { RateStrategies } = poolConfig;

  // Deploy Rate Strategies
  for (const strategy in RateStrategies) {
    const strategyData = RateStrategies[strategy];
    const args = [
      addressProviderArtifact.address,
      strategyData.optimalUsageRatio,
      strategyData.baseVariableBorrowRate,
      strategyData.variableRateSlope1,
      strategyData.variableRateSlope2,
      strategyData.stableRateSlope1,
      strategyData.stableRateSlope2,
      strategyData.baseStableRateOffset,
      strategyData.stableRateExcessOffset,
      strategyData.optimalStableToTotalDebtRatio,
    ];
    await hre.deployments.deploy(`ReserveStrategy-${strategyData.name}`, {
      from: deployer,
      args: args,
      contract: "DefaultReserveInterestRateStrategy",
      log: true,
    });
  }
});
