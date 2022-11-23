import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AdminControlledEcosystemReserve, AdminControlledEcosystemReserveInterface } from "../../../../../@aave/periphery-v3/contracts/treasury/AdminControlledEcosystemReserve";
export declare class AdminControlledEcosystemReserve__factory {
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
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): AdminControlledEcosystemReserveInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AdminControlledEcosystemReserve;
}
