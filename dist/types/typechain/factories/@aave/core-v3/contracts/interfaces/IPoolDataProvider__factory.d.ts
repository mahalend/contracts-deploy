import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IPoolDataProvider, IPoolDataProviderInterface } from "../../../../../@aave/core-v3/contracts/interfaces/IPoolDataProvider";
export declare class IPoolDataProvider__factory {
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
    static createInterface(): IPoolDataProviderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPoolDataProvider;
}
