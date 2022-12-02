import path from 'path';
import crypto from 'crypto';
import bluebird from 'bluebird';
import * as hre from 'hardhat';
import { Contract, utils } from 'ethers/lib';
import promises from 'fs/promises';
import { TransactionResponse } from '@ethersproject/providers';
import { Libraries } from 'hardhat-deploy/types';
import { ContractType } from 'hardhat/internal/hardhat-network/stack-traces/model';

import { tEthereumAddress } from '../types';

export const waitForTx = async (tx: TransactionResponse) => await tx.wait(1);

export const getCurrentBlock = async () => {
  return (await hre.ethers.provider.getBlock('latest')).number;
};

export const evmSnapshot = async () => await hre.ethers.provider.send('evm_snapshot', []);

export const evmRevert = async (id: string) => hre.ethers.provider.send('evm_revert', [id]);

export const advanceBlock = async (timestamp: number) =>
  await hre.ethers.provider.send('evm_mine', [timestamp]);

export const increaseTime = async (secondsToIncrease: number) => {
  await hre.ethers.provider.send('evm_increaseTime', [secondsToIncrease]);
  await hre.ethers.provider.send('evm_mine', []);
};

// Workaround for time travel tests bug: https://github.com/Tonyhaenn/hh-time-travel/blob/0161d993065a0b7585ec5a043af2eb4b654498b8/test/test.js#L12
export const advanceTimeAndBlock = async function (forwardTime: number) {
  const currentBlockNumber = await getCurrentBlock();
  const currentBlock = await hre.ethers.provider.getBlock(currentBlockNumber);
  if (currentBlock === null) {
    /* Workaround for https://github.com/nomiclabs/hardhat/issues/1183
     */
    await hre.ethers.provider.send('evm_increaseTime', [forwardTime]);
    await hre.ethers.provider.send('evm_mine', []);
    //Set the next blocktime back to 15 seconds
    await hre.ethers.provider.send('evm_increaseTime', [15]);
    return;
  }
  const currentTime = currentBlock.timestamp;
  const futureTime = currentTime + forwardTime;
  await hre.ethers.provider.send('evm_setNextBlockTimestamp', [futureTime]);
  await hre.ethers.provider.send('evm_mine', []);
};

export const parseUnitsFromToken = async (tokenAddress: tEthereumAddress, amount: string) => {
  const artifact = await hre.deployments.getArtifact(
    '@mahalend/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol:IERC20Detailed'
  );
  const token = await hre.ethers.getContractAt(artifact.abi, tokenAddress);
  const decimals = (await token.decimals()).toString();
  return hre.ethers.utils.parseUnits(amount, decimals);
};

export const waitDeployment = async <ContractType extends Contract>(
  instance: ContractType
): Promise<ContractType> => {
  await exports.waitForTx(instance.deployTransaction);
  return instance;
};

export const getBlockTimestamp = async (blockNumber: number): Promise<number> => {
  if (!blockNumber) {
    const block = await hre.ethers.provider.getBlock('latest');
    if (!block) {
      throw `getBlockTimestamp: missing block number ${blockNumber}`;
    }
    return block.timestamp;
  }
  let block = await hre.ethers.provider.getBlock(blockNumber);
  if (!block) {
    throw `getBlockTimestamp: missing block number ${blockNumber}`;
  }
  return block.timestamp;
};

export const deployContract = async <ContractType extends Contract>(
  contract: string,
  args?: (string | string[])[],
  libraries?: Libraries | undefined,
  id?: string
): Promise<ContractType> => {
  const { deployer: from } = await hre.getNamedAccounts();
  const artifact = await hre.deployments.deploy(
    id || `${contract}-${crypto['randomUUID']()}`, // Prevent collisions with principal deployment in tests environment
    {
      contract,
      args,
      from,
      libraries,
    }
  );
  return hre.ethers.getContractAt(artifact.abi, artifact.address) as unknown as ContractType;
};

export interface AccountItem {
  name: string;
  account: string;
  balance: string;
}

export const getContract = async <ContractType extends Contract>(
  id: string,
  address: tEthereumAddress
): Promise<ContractType> => {
  const artifact = await hre.deployments.getArtifact(id);
  return hre.ethers.getContractAt(
    artifact.abi,
    address || (await (await hre.deployments.get(id)).address)
  ) as unknown as ContractType;
};

export const getWalletBalances = async (): Promise<AccountItem[]> => {
  const accounts = await hre.getNamedAccounts();
  const accountTable = await bluebird.reduce(
    Object.keys(accounts),
    async (acc: Array<AccountItem>, accKey: string) => {
      acc.push({
        name: accKey,
        account: accounts[accKey],
        balance: utils.formatEther(await hre.ethers.provider.getBalance(accounts[accKey])),
      });
      return acc;
    },
    []
  );
  return accountTable;
};

export const getProxyAdminBySlot = async (proxyAddress: tEthereumAddress): Promise<string> => {
  const proxyAdminSlot = await hre.ethers.provider.getStorageAt(
    proxyAddress,
    '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103' // keccak-256 eip1967.proxy.admin sub 1
  );
  return hre.ethers.utils.getAddress(
    hre.ethers.utils.defaultAbiCoder.decode(['address'], proxyAdminSlot).toString()
  );
};

export const getAddressFromJson = async (network: string, id: string): Promise<any> => {
  const artifactPath = path.join(__dirname, '../../deployments', network, `${id}.json`);
  const artifact = await promises.readFile(artifactPath, 'utf8');
  const artifactJson = JSON.parse(artifact);
  if (artifactJson.address) {
    return artifactJson.address;
  }
  throw `Missing artifact at ${artifactPath}`;
};
