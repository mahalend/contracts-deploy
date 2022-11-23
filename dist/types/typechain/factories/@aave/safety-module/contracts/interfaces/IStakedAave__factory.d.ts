import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStakedAave, IStakedAaveInterface } from "../../../../../@aave/safety-module/contracts/interfaces/IStakedAave";
export declare class IStakedAave__factory {
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
    static createInterface(): IStakedAaveInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStakedAave;
}
