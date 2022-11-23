import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TransferStrategyBase, TransferStrategyBaseInterface } from "../../../../../../@aave/periphery-v3/contracts/rewards/transfer-strategies/TransferStrategyBase";
export declare class TransferStrategyBase__factory {
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
    static createInterface(): TransferStrategyBaseInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TransferStrategyBase;
}
