import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IL2Pool, IL2PoolInterface } from "../../../../../@aave/core-v3/contracts/interfaces/IL2Pool";
export declare class IL2Pool__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IL2PoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL2Pool;
}
