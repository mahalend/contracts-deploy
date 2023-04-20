import {
  ConfigNames,
  getReserveAddresses,
  getTreasuryAddress,
  loadPoolConfig,
} from "../../helpers/market-config-helpers";
import {
  getAToken,
  getPoolAddressesProvider,
} from "../../helpers/contract-getters";
import {
  ATOKEN_IMPL_ID,
  INCENTIVES_PROXY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  STABLE_DEBT_TOKEN_IMPL_ID,
  TREASURY_PROXY_ID,
  VARIABLE_DEBT_TOKEN_IMPL_ID,
} from "../../helpers/deploy-ids";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";
import { eNetwork } from "../../helpers";
import { ConfiguratorInputTypes } from "../../typechain/@aave/core-v3/contracts/interfaces/IPoolConfigurator";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AbiCoder } from "ethers/lib/utils";

task(`update-atoken`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { deployer } = await getNamedAccounts();
    const network = FORK ? FORK : (hre.network.name as eNetwork);

    if (!MARKET_NAME) {
      console.error("Missing MARKET_NAME env variable. Exiting.");
      return false;
    }
    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      ReserveAssets,
      ReservesConfig,
    } = await loadPoolConfig(MARKET_NAME);

    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
    const reserves = await getReserveAddresses(poolConfig, network);

    const poolAddressesProvider = await getPoolAddressesProvider(
      await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
    );

    const incentivesController = await getAddressFromJson(
      network,
      INCENTIVES_PROXY_ID
    );

    const protocolDataProvider = await getAaveProtocolDataProvider(
      await poolAddressesProvider.getPoolDataProvider()
    );
    const poolConfigurator = await getPoolConfiguratorProxy(
      await poolAddressesProvider.getPoolConfigurator()
    );

    // await poolConfigurator.dropReserve(
    //   "0x79bf7147ebcd0d55e83cb42ed3ba1bb2bb23ef20"
    // );

    const installedReserves = await protocolDataProvider.getAllReservesTokens();
    const installedAddresses = installedReserves.map((i) => i.tokenAddress);
    const treasuryAddress = await getTreasuryAddress(poolConfig, network);

    const reservesToInstall = Object.keys(reserves);

    for (let x = 0; x < reservesToInstall.length; x++) {
      const symbol = reservesToInstall[x];
      const address = reserves[symbol];
      const reservesParams = ReservesConfig[symbol];

      if (
        address.toLowerCase() !=
        "0x79bf7147ebcd0d55e83cb42ed3ba1bb2bb23ef20".toLowerCase()
      )
        continue;

      console.log("need to install", address, symbol);

      // const aTokenToUse = (await deployments.get(ATOKEN_IMPL_ID)).address;
      const aTokenToUse = (await deployments.get("MasterchefAToken-Arbitrum"))
        .address;

      const pid = 21;
      const chefAddr = "0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3";

      const encoder = new AbiCoder();

      await poolConfigurator.updateAToken({
        asset: address,
        treasury: treasuryAddress,
        incentivesController,
        name: `${ATokenNamePrefix} ${symbol}`,
        symbol: `${SymbolPrefix}${symbol}`,
        implementation: aTokenToUse,
        params: encoder.encode(
          ["uint256", "uint256", "address", "address", "address"],
          [
            30000000000, // uint256 _rewardFee = 30%
            pid, // uint256 _pid,
            "0x6818F17E4894CB1dAE9fD115f6da280291193C7b", // address _rewardDestination,
            chefAddr, // IMiniChefV2 _chef,
            "0xd4d42f0b6def4ce0383636770ef773390d85c61a", // address _rewardToken,
          ]
        ),
      });
    }
  }
);
