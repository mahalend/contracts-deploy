import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IParaSwapAugustus, IParaSwapAugustusInterface } from "../../../../../../../@aave/periphery-v3/contracts/adapters/paraswap/interfaces/IParaSwapAugustus";
export declare class IParaSwapAugustus__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IParaSwapAugustusInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IParaSwapAugustus;
}
