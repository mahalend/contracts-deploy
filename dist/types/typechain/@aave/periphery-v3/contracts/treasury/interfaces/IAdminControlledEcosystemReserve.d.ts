import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IAdminControlledEcosystemReserveInterface extends utils.Interface {
    functions: {
        "ETH_MOCK_ADDRESS()": FunctionFragment;
        "approve(address,address,uint256)": FunctionFragment;
        "getFundsAdmin()": FunctionFragment;
        "transfer(address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ETH_MOCK_ADDRESS" | "approve" | "getFundsAdmin" | "transfer"): FunctionFragment;
    encodeFunctionData(functionFragment: "ETH_MOCK_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getFundsAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "ETH_MOCK_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFundsAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    events: {
        "NewFundsAdmin(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "NewFundsAdmin"): EventFragment;
}
export interface NewFundsAdminEventObject {
    fundsAdmin: string;
}
export type NewFundsAdminEvent = TypedEvent<[string], NewFundsAdminEventObject>;
export type NewFundsAdminEventFilter = TypedEventFilter<NewFundsAdminEvent>;
export interface IAdminControlledEcosystemReserve extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAdminControlledEcosystemReserveInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<[string]>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getFundsAdmin(overrides?: CallOverrides): Promise<[string]>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<string>;
    approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getFundsAdmin(overrides?: CallOverrides): Promise<string>;
    transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<string>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        getFundsAdmin(overrides?: CallOverrides): Promise<string>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "NewFundsAdmin(address)"(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
        NewFundsAdmin(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
    };
    estimateGas: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getFundsAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getFundsAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
