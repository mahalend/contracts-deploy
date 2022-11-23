import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IWrappedTokenGatewayV3, IWrappedTokenGatewayV3Interface } from "../../../../../../@aave/periphery-v3/contracts/misc/interfaces/IWrappedTokenGatewayV3";
export declare class IWrappedTokenGatewayV3__factory {
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
    static createInterface(): IWrappedTokenGatewayV3Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IWrappedTokenGatewayV3;
}
