import * as hre from 'hardhat';
import { Libraries } from 'hardhat/types';

import { POOL_CONFIGURATOR_PROXY_ID, TESTNET_TOKEN_PREFIX } from "./deploy-ids";
import { tEthereumAddress } from './types';
import { getContract } from './utilities/tx';

export const getTestnetReserveAddressFromSymbol = async (symbol: string): Promise<string> => {
    const testnetReserve = await hre.deployments.get(
        `${symbol}${TESTNET_TOKEN_PREFIX}`
    );
    return testnetReserve.address;
};

export const getPoolConfiguratorProxy = async (address?: tEthereumAddress) =>
    getContract(
        "PoolConfigurator",
        address ||
        (await hre.deployments.get(POOL_CONFIGURATOR_PROXY_ID))
            .address
    );

export const getPoolLibraries = async (): Promise<Libraries> => {
    const supplyLibraryArtifact = await hre.deployments.get("SupplyLogic");
    const borrowLibraryArtifact = await hre.deployments.get("BorrowLogic");
    const liquidationLibraryArtifact = await hre.deployments.get(
        "LiquidationLogic"
    );
    const eModeLibraryArtifact = await hre.deployments.get("EModeLogic");
    const bridgeLibraryArtifact = await hre.deployments.get("BridgeLogic");
    const flashLoanLogicArtifact = await hre.deployments.get("FlashLoanLogic");
    const poolLogicArtifact = await hre.deployments.get("PoolLogic");
    return {
        LiquidationLogic: liquidationLibraryArtifact.address,
        SupplyLogic: supplyLibraryArtifact.address,
        EModeLogic: eModeLibraryArtifact.address,
        FlashLoanLogic: flashLoanLogicArtifact.address,
        BorrowLogic: borrowLibraryArtifact.address,
        BridgeLogic: bridgeLibraryArtifact.address,
        PoolLogic: poolLogicArtifact.address,
    };
};