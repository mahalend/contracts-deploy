import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStreamable, IStreamableInterface } from "../../../../../../@aave/periphery-v3/contracts/treasury/interfaces/IStreamable";
export declare class IStreamable__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): IStreamableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStreamable;
}
