import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IUiIncentiveDataProviderV3, IUiIncentiveDataProviderV3Interface } from "../../../../../../@aave/periphery-v3/contracts/misc/interfaces/IUiIncentiveDataProviderV3";
export declare class IUiIncentiveDataProviderV3__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IUiIncentiveDataProviderV3Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUiIncentiveDataProviderV3;
}
