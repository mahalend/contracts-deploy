import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../../common";
export interface IGovernancePowerDelegationTokenInterface extends utils.Interface {
    functions: {
        "delegate(address)": FunctionFragment;
        "delegateByType(address,uint8)": FunctionFragment;
        "getDelegateeByType(address,uint8)": FunctionFragment;
        "getPowerAtBlock(address,uint256,uint8)": FunctionFragment;
        "getPowerCurrent(address,uint8)": FunctionFragment;
        "totalSupplyAt(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "delegate" | "delegateByType" | "getDelegateeByType" | "getPowerAtBlock" | "getPowerCurrent" | "totalSupplyAt"): FunctionFragment;
    encodeFunctionData(functionFragment: "delegate", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "delegateByType", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDelegateeByType", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getPowerAtBlock", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getPowerCurrent", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupplyAt", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "delegateByType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDelegateeByType", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPowerAtBlock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPowerCurrent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupplyAt", data: BytesLike): Result;
    events: {
        "DelegateChanged(address,address,uint8)": EventFragment;
        "DelegatedPowerChanged(address,uint256,uint8)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DelegateChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DelegatedPowerChanged"): EventFragment;
}
export interface DelegateChangedEventObject {
    delegator: string;
    delegatee: string;
    delegationType: number;
}
export type DelegateChangedEvent = TypedEvent<[
    string,
    string,
    number
], DelegateChangedEventObject>;
export type DelegateChangedEventFilter = TypedEventFilter<DelegateChangedEvent>;
export interface DelegatedPowerChangedEventObject {
    user: string;
    amount: BigNumber;
    delegationType: number;
}
export type DelegatedPowerChangedEvent = TypedEvent<[
    string,
    BigNumber,
    number
], DelegatedPowerChangedEventObject>;
export type DelegatedPowerChangedEventFilter = TypedEventFilter<DelegatedPowerChangedEvent>;
export interface IGovernancePowerDelegationToken extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IGovernancePowerDelegationTokenInterface;
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
        delegate(delegatee: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        delegateByType(delegatee: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getDelegateeByType(delegator: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getPowerAtBlock(user: PromiseOrValue<string>, blockNumber: PromiseOrValue<BigNumberish>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getPowerCurrent(user: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalSupplyAt(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    delegate(delegatee: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    delegateByType(delegatee: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getDelegateeByType(delegator: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getPowerAtBlock(user: PromiseOrValue<string>, blockNumber: PromiseOrValue<BigNumberish>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getPowerCurrent(user: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    totalSupplyAt(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        delegate(delegatee: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        delegateByType(delegatee: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        getDelegateeByType(delegator: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getPowerAtBlock(user: PromiseOrValue<string>, blockNumber: PromiseOrValue<BigNumberish>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPowerCurrent(user: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupplyAt(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "DelegateChanged(address,address,uint8)"(delegator?: PromiseOrValue<string> | null, delegatee?: PromiseOrValue<string> | null, delegationType?: null): DelegateChangedEventFilter;
        DelegateChanged(delegator?: PromiseOrValue<string> | null, delegatee?: PromiseOrValue<string> | null, delegationType?: null): DelegateChangedEventFilter;
        "DelegatedPowerChanged(address,uint256,uint8)"(user?: PromiseOrValue<string> | null, amount?: null, delegationType?: null): DelegatedPowerChangedEventFilter;
        DelegatedPowerChanged(user?: PromiseOrValue<string> | null, amount?: null, delegationType?: null): DelegatedPowerChangedEventFilter;
    };
    estimateGas: {
        delegate(delegatee: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        delegateByType(delegatee: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getDelegateeByType(delegator: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPowerAtBlock(user: PromiseOrValue<string>, blockNumber: PromiseOrValue<BigNumberish>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getPowerCurrent(user: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupplyAt(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        delegate(delegatee: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        delegateByType(delegatee: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getDelegateeByType(delegator: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPowerAtBlock(user: PromiseOrValue<string>, blockNumber: PromiseOrValue<BigNumberish>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPowerCurrent(user: PromiseOrValue<string>, delegationType: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupplyAt(blockNumber: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
