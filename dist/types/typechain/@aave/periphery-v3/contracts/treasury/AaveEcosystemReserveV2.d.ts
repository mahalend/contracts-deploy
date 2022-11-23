import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export interface AaveEcosystemReserveV2Interface extends utils.Interface {
    functions: {
        "ETH_MOCK_ADDRESS()": FunctionFragment;
        "REVISION()": FunctionFragment;
        "approve(address,address,uint256)": FunctionFragment;
        "balanceOf(uint256,address)": FunctionFragment;
        "cancelStream(uint256)": FunctionFragment;
        "createStream(address,uint256,address,uint256,uint256)": FunctionFragment;
        "deltaOf(uint256)": FunctionFragment;
        "getFundsAdmin()": FunctionFragment;
        "getNextStreamId()": FunctionFragment;
        "getStream(uint256)": FunctionFragment;
        "initialize(address)": FunctionFragment;
        "transfer(address,address,uint256)": FunctionFragment;
        "withdrawFromStream(uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ETH_MOCK_ADDRESS" | "REVISION" | "approve" | "balanceOf" | "cancelStream" | "createStream" | "deltaOf" | "getFundsAdmin" | "getNextStreamId" | "getStream" | "initialize" | "transfer" | "withdrawFromStream"): FunctionFragment;
    encodeFunctionData(functionFragment: "ETH_MOCK_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "REVISION", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "cancelStream", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "createStream", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "deltaOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getFundsAdmin", values?: undefined): string;
    encodeFunctionData(functionFragment: "getNextStreamId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getStream", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawFromStream", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "ETH_MOCK_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REVISION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelStream", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createStream", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deltaOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFundsAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNextStreamId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getStream", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFromStream", data: BytesLike): Result;
    events: {
        "CancelStream(uint256,address,address,uint256,uint256)": EventFragment;
        "CreateStream(uint256,address,address,uint256,address,uint256,uint256)": EventFragment;
        "NewFundsAdmin(address)": EventFragment;
        "WithdrawFromStream(uint256,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CancelStream"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CreateStream"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewFundsAdmin"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawFromStream"): EventFragment;
}
export interface CancelStreamEventObject {
    streamId: BigNumber;
    sender: string;
    recipient: string;
    senderBalance: BigNumber;
    recipientBalance: BigNumber;
}
export type CancelStreamEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber
], CancelStreamEventObject>;
export type CancelStreamEventFilter = TypedEventFilter<CancelStreamEvent>;
export interface CreateStreamEventObject {
    streamId: BigNumber;
    sender: string;
    recipient: string;
    deposit: BigNumber;
    tokenAddress: string;
    startTime: BigNumber;
    stopTime: BigNumber;
}
export type CreateStreamEvent = TypedEvent<[
    BigNumber,
    string,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber
], CreateStreamEventObject>;
export type CreateStreamEventFilter = TypedEventFilter<CreateStreamEvent>;
export interface NewFundsAdminEventObject {
    fundsAdmin: string;
}
export type NewFundsAdminEvent = TypedEvent<[string], NewFundsAdminEventObject>;
export type NewFundsAdminEventFilter = TypedEventFilter<NewFundsAdminEvent>;
export interface WithdrawFromStreamEventObject {
    streamId: BigNumber;
    recipient: string;
    amount: BigNumber;
}
export type WithdrawFromStreamEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber
], WithdrawFromStreamEventObject>;
export type WithdrawFromStreamEventFilter = TypedEventFilter<WithdrawFromStreamEvent>;
export interface AaveEcosystemReserveV2 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AaveEcosystemReserveV2Interface;
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
        REVISION(overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(streamId: PromiseOrValue<BigNumberish>, who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            balance: BigNumber;
        }>;
        cancelStream(streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        createStream(recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deltaOf(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            delta: BigNumber;
        }>;
        getFundsAdmin(overrides?: CallOverrides): Promise<[string]>;
        getNextStreamId(overrides?: CallOverrides): Promise<[BigNumber]>;
        getStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            sender: string;
            recipient: string;
            deposit: BigNumber;
            tokenAddress: string;
            startTime: BigNumber;
            stopTime: BigNumber;
            remainingBalance: BigNumber;
            ratePerSecond: BigNumber;
        }>;
        initialize(fundsAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawFromStream(streamId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<string>;
    REVISION(overrides?: CallOverrides): Promise<BigNumber>;
    approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(streamId: PromiseOrValue<BigNumberish>, who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    cancelStream(streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    createStream(recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deltaOf(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getFundsAdmin(overrides?: CallOverrides): Promise<string>;
    getNextStreamId(overrides?: CallOverrides): Promise<BigNumber>;
    getStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        string,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        sender: string;
        recipient: string;
        deposit: BigNumber;
        tokenAddress: string;
        startTime: BigNumber;
        stopTime: BigNumber;
        remainingBalance: BigNumber;
        ratePerSecond: BigNumber;
    }>;
    initialize(fundsAdmin: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawFromStream(streamId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<string>;
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(streamId: PromiseOrValue<BigNumberish>, who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        createStream(recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        deltaOf(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getFundsAdmin(overrides?: CallOverrides): Promise<string>;
        getNextStreamId(overrides?: CallOverrides): Promise<BigNumber>;
        getStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            string,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            sender: string;
            recipient: string;
            deposit: BigNumber;
            tokenAddress: string;
            startTime: BigNumber;
            stopTime: BigNumber;
            remainingBalance: BigNumber;
            ratePerSecond: BigNumber;
        }>;
        initialize(fundsAdmin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        withdrawFromStream(streamId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "CancelStream(uint256,address,address,uint256,uint256)"(streamId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, senderBalance?: null, recipientBalance?: null): CancelStreamEventFilter;
        CancelStream(streamId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, senderBalance?: null, recipientBalance?: null): CancelStreamEventFilter;
        "CreateStream(uint256,address,address,uint256,address,uint256,uint256)"(streamId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, deposit?: null, tokenAddress?: null, startTime?: null, stopTime?: null): CreateStreamEventFilter;
        CreateStream(streamId?: PromiseOrValue<BigNumberish> | null, sender?: PromiseOrValue<string> | null, recipient?: PromiseOrValue<string> | null, deposit?: null, tokenAddress?: null, startTime?: null, stopTime?: null): CreateStreamEventFilter;
        "NewFundsAdmin(address)"(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
        NewFundsAdmin(fundsAdmin?: PromiseOrValue<string> | null): NewFundsAdminEventFilter;
        "WithdrawFromStream(uint256,address,uint256)"(streamId?: PromiseOrValue<BigNumberish> | null, recipient?: PromiseOrValue<string> | null, amount?: null): WithdrawFromStreamEventFilter;
        WithdrawFromStream(streamId?: PromiseOrValue<BigNumberish> | null, recipient?: PromiseOrValue<string> | null, amount?: null): WithdrawFromStreamEventFilter;
    };
    estimateGas: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(streamId: PromiseOrValue<BigNumberish>, who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelStream(streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        createStream(recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deltaOf(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getFundsAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        getNextStreamId(overrides?: CallOverrides): Promise<BigNumber>;
        getStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(fundsAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawFromStream(streamId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ETH_MOCK_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(streamId: PromiseOrValue<BigNumberish>, who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelStream(streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        createStream(recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deltaOf(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getFundsAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNextStreamId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getStream(streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(fundsAdmin: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transfer(token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawFromStream(streamId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
