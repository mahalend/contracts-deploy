import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type { ValidationLogic, ValidationLogicInterface } from "../../../../../../../@aave/core-v3/contracts/protocol/libraries/logic/ValidationLogic";
type ValidationLogicConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ValidationLogic__factory extends ContractFactory {
    constructor(...args: ValidationLogicConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ValidationLogic>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ValidationLogic;
    connect(signer: Signer): ValidationLogic__factory;
    static readonly bytecode = "0x60b8610039600b82828239805160001a60731461002c57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060475760003560e01c8063561cbec914604c578063abfcc86a14606c578063c3525c28146074575b600080fd5b605a670d2f13f7789f000081565b60405190815260200160405180910390f35b605a61232881565b605a670de0b6b3a76400008156fea26469706673582212208ff2a380c3c4b4886f273b360e7d02937f42f3bf586b46cd493fcce98ea7338564736f6c634300080a0033";
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
    static createInterface(): ValidationLogicInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ValidationLogic;
}
export {};
