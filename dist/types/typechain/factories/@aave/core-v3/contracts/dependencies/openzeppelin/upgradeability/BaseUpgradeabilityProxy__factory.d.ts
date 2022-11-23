import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type { BaseUpgradeabilityProxy, BaseUpgradeabilityProxyInterface } from "../../../../../../../@aave/core-v3/contracts/dependencies/openzeppelin/upgradeability/BaseUpgradeabilityProxy";
type BaseUpgradeabilityProxyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class BaseUpgradeabilityProxy__factory extends ContractFactory {
    constructor(...args: BaseUpgradeabilityProxyConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<BaseUpgradeabilityProxy>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): BaseUpgradeabilityProxy;
    connect(signer: Signer): BaseUpgradeabilityProxy__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060948061001e6000396000f3fe6080604052600a600c565b005b603960357f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b603b565b565b3660008037600080366000845af43d6000803e8080156059573d6000f35b3d6000fdfea2646970667358221220cd9a895a2e5f036a467fb42541d84a1d59ab0925f0986f1df46019dee734be6564736f6c634300080a0033";
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
        stateMutability?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
    })[];
    static createInterface(): BaseUpgradeabilityProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseUpgradeabilityProxy;
}
export {};
