import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IAaveEcosystemReserveControllerInterface extends utils.Interface {
    functions: {
        "approve(address,address,address,uint256)": FunctionFragment;
        "cancelStream(address,uint256)": FunctionFragment;
        "createStream(address,address,uint256,address,uint256,uint256)": FunctionFragment;
        "transfer(address,address,address,uint256)": FunctionFragment;
        "withdrawFromStream(address,uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "approve" | "cancelStream" | "createStream" | "transfer" | "withdrawFromStream"): FunctionFragment;
    encodeFunctionData(functionFragment: "approve", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "cancelStream", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "createStream", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transfer", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawFromStream", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelStream", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createStream", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFromStream", data: BytesLike): Result;
    events: {};
}
export interface IAaveEcosystemReserveController extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAaveEcosystemReserveControllerInterface;
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
        approve(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cancelStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        createStream(collector: PromiseOrValue<string>, recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transfer(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawFromStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, funds: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    approve(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cancelStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    createStream(collector: PromiseOrValue<string>, recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transfer(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawFromStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, funds: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        approve(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        cancelStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        createStream(collector: PromiseOrValue<string>, recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transfer(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        withdrawFromStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, funds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        approve(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cancelStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        createStream(collector: PromiseOrValue<string>, recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transfer(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawFromStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, funds: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        approve(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cancelStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        createStream(collector: PromiseOrValue<string>, recipient: PromiseOrValue<string>, deposit: PromiseOrValue<BigNumberish>, tokenAddress: PromiseOrValue<string>, startTime: PromiseOrValue<BigNumberish>, stopTime: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transfer(collector: PromiseOrValue<string>, token: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawFromStream(collector: PromiseOrValue<string>, streamId: PromiseOrValue<BigNumberish>, funds: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
