import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IAaveDistributionManager, IAaveDistributionManagerInterface } from "../../../../../../../@aave/safety-module/contracts/proposals/extend-stkaave-distribution/StakedTokenV2Rev3.sol/IAaveDistributionManager";
export declare class IAaveDistributionManager__factory {
    static readonly abi: {
        inputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IAaveDistributionManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveDistributionManager;
}
