import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { EIP712Base, EIP712BaseInterface } from "../../../../../../../@mahalend/core-v3/contracts/protocol/tokenization/base/EIP712Base";
export declare class EIP712Base__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): EIP712BaseInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): EIP712Base;
}