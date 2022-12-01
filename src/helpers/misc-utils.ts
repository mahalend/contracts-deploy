import { Wallet, BigNumber, ContractTransaction } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { BuidlerRuntimeEnvironment } from '@nomiclabs/buidler/types';

export let hre: HardhatRuntimeEnvironment;

export const createRandomAddress = () => Wallet.createRandom().address;

export const timeLatest = async () => {
  const block = await hre.ethers.provider.getBlock('latest');
  return BigNumber.from(block.timestamp);
};

export const sethre = (_DRE: HardhatRuntimeEnvironment | BuidlerRuntimeEnvironment) => {
  hre = _DRE;
};

export const waitForTx = async (tx: ContractTransaction) => await tx.wait(1);

export const setBlocktime = async (time: number) => {
  await hre.ethers.provider.send('evm_setNextBlockTimestamp', [time]);
};

export const setAutomine = async (activate: boolean) => {
  await hre.network.provider.send('evm_setAutomine', [activate]);
  if (activate) await hre.network.provider.send('evm_mine', []);
};

export const setAutomineEvm = async (activate: boolean) => {
  await hre.network.provider.send('evm_setAutomine', [activate]);
};

export const impersonateAccountsHardhat = async (accounts: string[]) => {
  if (process.env.TENDERLY === 'true') {
    return;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    // eslint-disable-next-line no-await-in-loop
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [account],
    });
  }
};
