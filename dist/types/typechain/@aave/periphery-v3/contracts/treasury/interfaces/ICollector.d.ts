import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface ICollectorInterface extends utils.Interface {
    functions: {
        "REVISION()": FunctionFragment;
        "approve(address,address,uint256)": FunctionFragment;
        "getFundsAdmin()": FunctionFragment;
        "setFundsAdmin(address)": FunctionFragment;
        "transfer(address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "REVISION" | "approve" | "getFundsAdmin" | "setFundsAdmin" | "transfer"): FunctionFragment;
    encodeFunctionData(functionFragment: "REVISION", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getFundsAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFundsAdmin", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "REVISION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFundsAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFundsAdmin", data: BytesLike): Result;
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
export interface ICollector extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ICollectorInterface;
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
        REVISION(overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getFundsAdmin(overrides?: CallOverrides): Promise<[string]>;
        setFundsAdmin(admin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    REVISION(overrides?: CallOverrides): Promise<BigNumber>;
    approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getFundsAdmin(overrides?: CallOverrides): Promise<string>;
    setFundsAdmin(admin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        getFundsAdmin(overrides?: CallOverrides): Promise<string>;
        setFundsAdmin(admin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "NewFundsAdmin(address)"(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
        NewFundsAdmin(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
    };
    estimateGas: {
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getFundsAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        setFundsAdmin(admin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getFundsAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setFundsAdmin(admin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
