import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface StakedTokenTransferStrategyInterface extends utils.Interface {
    functions: {
        "dropApproval()": FunctionFragment;
        "emergencyWithdrawal(address,address,uint256)": FunctionFragment;
        "getIncentivesController()": FunctionFragment;
        "getRewardsAdmin()": FunctionFragment;
        "getStakeContract()": FunctionFragment;
        "getUnderlyingToken()": FunctionFragment;
        "performTransfer(address,address,uint256)": FunctionFragment;
        "renewApproval()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "dropApproval" | "emergencyWithdrawal" | "getIncentivesController" | "getRewardsAdmin" | "getStakeContract" | "getUnderlyingToken" | "performTransfer" | "renewApproval"): FunctionFragment;
    encodeFunctionData(functionFragment: "dropApproval", values?: undefined): string;
    encodeFunctionData(functionFragment: "emergencyWithdrawal", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getIncentivesController", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRewardsAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "getStakeContract", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUnderlyingToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "performTransfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "renewApproval", values?: undefined): string;
    decodeFunctionResult(functionFragment: "dropApproval", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "emergencyWithdrawal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getIncentivesController", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRewardsAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getStakeContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnderlyingToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "performTransfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renewApproval", data: BytesLike): Result;
    events: {
        "EmergencyWithdrawal(address,address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "EmergencyWithdrawal"): EventFragment;
}
export interface EmergencyWithdrawalEventObject {
    caller: string;
    token: string;
    to: string;
    amount: BigNumber;
}
export type EmergencyWithdrawalEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber
], EmergencyWithdrawalEventObject>;
export type EmergencyWithdrawalEventFilter = TypedEventFilter<EmergencyWithdrawalEvent>;
export interface StakedTokenTransferStrategy extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StakedTokenTransferStrategyInterface;
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
        dropApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        emergencyWithdrawal(token: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getIncentivesController(overrides?: CallOverrides): Promise<[string]>;
        getRewardsAdmin(overrides?: CallOverrides): Promise<[string]>;
        getStakeContract(overrides?: CallOverrides): Promise<[string]>;
        getUnderlyingToken(overrides?: CallOverrides): Promise<[string]>;
        performTransfer(to: PromiseOrValue<string>, reward: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renewApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    dropApproval(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    emergencyWithdrawal(token: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getIncentivesController(overrides?: CallOverrides): Promise<string>;
    getRewardsAdmin(overrides?: CallOverrides): Promise<string>;
    getStakeContract(overrides?: CallOverrides): Promise<string>;
    getUnderlyingToken(overrides?: CallOverrides): Promise<string>;
    performTransfer(to: PromiseOrValue<string>, reward: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renewApproval(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        dropApproval(overrides?: CallOverrides): Promise<void>;
        emergencyWithdrawal(token: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        getIncentivesController(overrides?: CallOverrides): Promise<string>;
        getRewardsAdmin(overrides?: CallOverrides): Promise<string>;
        getStakeContract(overrides?: CallOverrides): Promise<string>;
        getUnderlyingToken(overrides?: CallOverrides): Promise<string>;
        performTransfer(to: PromiseOrValue<string>, reward: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        renewApproval(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "EmergencyWithdrawal(address,address,address,uint256)"(caller?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): EmergencyWithdrawalEventFilter;
        EmergencyWithdrawal(caller?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): EmergencyWithdrawalEventFilter;
    };
    estimateGas: {
        dropApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        emergencyWithdrawal(token: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getIncentivesController(overrides?: CallOverrides): Promise<BigNumber>;
        getRewardsAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        getStakeContract(overrides?: CallOverrides): Promise<BigNumber>;
        getUnderlyingToken(overrides?: CallOverrides): Promise<BigNumber>;
        performTransfer(to: PromiseOrValue<string>, reward: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renewApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        dropApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        emergencyWithdrawal(token: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getIncentivesController(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRewardsAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getStakeContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUnderlyingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        performTransfer(to: PromiseOrValue<string>, reward: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renewApproval(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
