import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ITransferHook, ITransferHookInterface } from "../../../../../@aave/safety-module/contracts/interfaces/ITransferHook";
export declare class ITransferHook__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ITransferHookInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITransferHook;
}
