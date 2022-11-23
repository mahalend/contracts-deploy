import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDelegationToken, IDelegationTokenInterface } from "../../../../../@aave/core-v3/contracts/interfaces/IDelegationToken";
export declare class IDelegationToken__factory {
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
    static createInterface(): IDelegationTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDelegationToken;
}
