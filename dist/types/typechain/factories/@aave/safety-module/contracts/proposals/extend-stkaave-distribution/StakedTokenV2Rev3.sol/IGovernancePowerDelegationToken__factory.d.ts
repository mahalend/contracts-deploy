import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IGovernancePowerDelegationToken, IGovernancePowerDelegationTokenInterface } from "../../../../../../../@aave/safety-module/contracts/proposals/extend-stkaave-distribution/StakedTokenV2Rev3.sol/IGovernancePowerDelegationToken";
export declare class IGovernancePowerDelegationToken__factory {
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
    static createInterface(): IGovernancePowerDelegationTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IGovernancePowerDelegationToken;
}
