import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20DetailedBytes, IERC20DetailedBytesInterface } from "../../../../../../@aave/periphery-v3/contracts/misc/interfaces/IERC20DetailedBytes";
export declare class IERC20DetailedBytes__factory {
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
    static createInterface(): IERC20DetailedBytesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20DetailedBytes;
}
