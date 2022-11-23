import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { ERC20Faucet, ERC20FaucetInterface } from "../../../contracts/testnet-helpers/ERC20Faucet";
type ERC20FaucetConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20Faucet__factory extends ContractFactory {
    constructor(...args: ERC20FaucetConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ERC20Faucet>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ERC20Faucet;
    connect(signer: Signer): ERC20Faucet__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061019b806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806340c10f1914610030575b600080fd5b61004361003e3660046100f7565b610055565b60405190815260200160405180910390f35b6040517f40c10f190000000000000000000000000000000000000000000000000000000081523360048201526024810182905260009073ffffffffffffffffffffffffffffffffffffffff8416906340c10f19906044016020604051808303816000875af11580156100cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ef919061013c565b509092915050565b6000806040838503121561010a57600080fd5b823573ffffffffffffffffffffffffffffffffffffffff8116811461012e57600080fd5b946020939093013593505050565b60006020828403121561014e57600080fd5b8151801515811461015e57600080fd5b939250505056fea2646970667358221220bf4f8640e07dd768750065f54fa317753c89d44a65bed50c8646711984bb26f364736f6c634300080a0033";
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
    static createInterface(): ERC20FaucetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Faucet;
}
export {};
