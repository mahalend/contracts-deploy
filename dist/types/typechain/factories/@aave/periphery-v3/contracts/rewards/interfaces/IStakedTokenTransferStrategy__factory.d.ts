import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStakedTokenTransferStrategy, IStakedTokenTransferStrategyInterface } from "../../../../../../@aave/periphery-v3/contracts/rewards/interfaces/IStakedTokenTransferStrategy";
export declare class IStakedTokenTransferStrategy__factory {
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
    static createInterface(): IStakedTokenTransferStrategyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStakedTokenTransferStrategy;
}
