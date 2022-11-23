import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { GovernancePowerDelegationERC20, GovernancePowerDelegationERC20Interface } from "../../../../../../@aave/aave-token/contracts/token/base/GovernancePowerDelegationERC20";
export declare class GovernancePowerDelegationERC20__factory {
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
    static createInterface(): GovernancePowerDelegationERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): GovernancePowerDelegationERC20;
}
