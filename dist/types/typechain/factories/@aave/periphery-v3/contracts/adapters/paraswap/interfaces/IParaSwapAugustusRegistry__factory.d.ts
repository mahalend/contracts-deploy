import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IParaSwapAugustusRegistry, IParaSwapAugustusRegistryInterface } from "../../../../../../../@aave/periphery-v3/contracts/adapters/paraswap/interfaces/IParaSwapAugustusRegistry";
export declare class IParaSwapAugustusRegistry__factory {
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
    static createInterface(): IParaSwapAugustusRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IParaSwapAugustusRegistry;
}
