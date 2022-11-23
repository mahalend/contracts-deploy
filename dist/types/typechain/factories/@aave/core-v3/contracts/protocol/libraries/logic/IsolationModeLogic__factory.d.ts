import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../common";
import type { IsolationModeLogic, IsolationModeLogicInterface } from "../../../../../../../@aave/core-v3/contracts/protocol/libraries/logic/IsolationModeLogic";
type IsolationModeLogicConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class IsolationModeLogic__factory extends ContractFactory {
    constructor(...args: IsolationModeLogicConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<IsolationModeLogic>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): IsolationModeLogic;
    connect(signer: Signer): IsolationModeLogic__factory;
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220796ad2e04fce962475ad7ecc3a024ae951068fbf8d026de709807ad03719a49a64736f6c634300080a0033";
    static readonly abi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
    static createInterface(): IsolationModeLogicInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IsolationModeLogic;
}
export {};
