import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Faucet, IERC20FaucetInterface } from "../../../contracts/testnet-helpers/IERC20Faucet";
export declare class IERC20Faucet__factory {
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
    static createInterface(): IERC20FaucetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Faucet;
}
