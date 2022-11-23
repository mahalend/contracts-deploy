import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAaveIncentivesController, IAaveIncentivesControllerInterface } from "../../../../../@aave/core-v3/contracts/interfaces/IAaveIncentivesController";
export declare class IAaveIncentivesController__factory {
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
    static createInterface(): IAaveIncentivesControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveIncentivesController;
}
