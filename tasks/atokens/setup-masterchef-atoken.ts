import {
  ConfigNames,
  getReserveAddresses,
  getTreasuryAddress,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import { getPoolAddressesProvider } from "../../helpers/contract-getters";
import {
  INCENTIVES_PROXY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_PROXY_ID,
  STABLE_DEBT_TOKEN_IMPL_ID,
  VARIABLE_DEBT_TOKEN_IMPL_ID,
} from "../../helpers/deploy-ids";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { MARKET_NAME } from "../../helpers/env";
import { eNetwork } from "../../helpers";
import { ConfiguratorInputTypes } from "../../typechain/@aave/core-v3/contracts/interfaces/IPoolConfigurator";
import { AbiCoder } from "ethers/lib/utils";

task(`setup-masterchef-atoken`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const network = FORK ? FORK : (hre.network.name as eNetwork);

    if (!MARKET_NAME) {
      console.error("Missing MARKET_NAME env variable. Exiting.");
      return false;
    }

    const { deployer } = await getNamedAccounts();

    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      ReservesConfig,
    } = await loadPoolConfig(MARKET_NAME);

    const configSymbol = "SLP_USDT_USDC";
    const pid = 21;
    const chefAddr = "0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3";
    const sushi = "0xd4d42f0b6def4ce0383636770ef773390d85c61a";
    const encoder = new AbiCoder();

    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
    const reserves = await getReserveAddresses(poolConfig, network);

    const poolAddressesProvider = await getPoolAddressesProvider(
      await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
    );

    const incentivesController = await getAddressFromJson(
      network,
      INCENTIVES_PROXY_ID
    );

    const poolConfigurator = await getPoolConfiguratorProxy(
      await poolAddressesProvider.getPoolConfigurator()
    );

    const treasuryAddress = await getTreasuryAddress(poolConfig, network);

    const reservesToInstall = Object.keys(reserves);

    const artifact = await deployments.deploy("MasterchefAToken", {
      args: [await getAddressFromJson(network, POOL_PROXY_ID)],
      from: deployer,
    });

    for (let x = 0; x < reservesToInstall.length; x++) {
      const symbol = reservesToInstall[x];
      const address = reserves[symbol];
      const reservesParams = ReservesConfig[symbol];

      if (symbol != configSymbol) continue;

      console.log("installing", address, symbol);

      const aTokenToUse = artifact.address;

      const stableDebtTokenImplementationAddress = (
        await deployments.get(STABLE_DEBT_TOKEN_IMPL_ID)
      ).address;
      const variableDebtTokenImplementationAddress = await (
        await deployments.get(VARIABLE_DEBT_TOKEN_IMPL_ID)
      ).address;

      const strategyAddress = (
        await deployments.get(`ReserveStrategy-${reservesParams.strategy.name}`)
      ).address;

      const input: ConfiguratorInputTypes.InitReserveInputStruct = {
        aTokenImpl: aTokenToUse,
        stableDebtTokenImpl: stableDebtTokenImplementationAddress,
        variableDebtTokenImpl: variableDebtTokenImplementationAddress,
        underlyingAssetDecimals: reservesParams.reserveDecimals,
        interestRateStrategyAddress: strategyAddress,
        underlyingAsset: address,
        treasury: treasuryAddress,
        incentivesController,
        aTokenName: `${ATokenNamePrefix} ${symbol}`,
        aTokenSymbol: `${SymbolPrefix}${symbol}`,
        variableDebtTokenName: `${VariableDebtTokenNamePrefix} Variable Debt ${symbol}`,
        variableDebtTokenSymbol: `variableDebt${SymbolPrefix}${symbol}`,
        stableDebtTokenName: `${StableDebtTokenNamePrefix} Stable Debt ${symbol}`,
        stableDebtTokenSymbol: `stableDebt${SymbolPrefix}${symbol}`,
        params: encoder.encode(
          ["uint256", "uint256", "address", "address", "address"],
          [
            10000000000, // uint256 _rewardFeeRate,
            pid, // uint256 _pid,
            "0x6818F17E4894CB1dAE9fD115f6da280291193C7b", // address _rewardFeeDestination,
            chefAddr, // address _chef,
            sushi, // address _rewardToken
          ]
        ),
      };

      console.log(input);

      await poolConfigurator.initReserves([input]);
    }
  }
);
