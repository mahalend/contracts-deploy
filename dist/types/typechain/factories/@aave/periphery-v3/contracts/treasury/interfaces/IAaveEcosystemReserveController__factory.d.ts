import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAaveEcosystemReserveController, IAaveEcosystemReserveControllerInterface } from "../../../../../../@aave/periphery-v3/contracts/treasury/interfaces/IAaveEcosystemReserveController";
export declare class IAaveEcosystemReserveController__factory {
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
    static createInterface(): IAaveEcosystemReserveControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveEcosystemReserveController;
}
