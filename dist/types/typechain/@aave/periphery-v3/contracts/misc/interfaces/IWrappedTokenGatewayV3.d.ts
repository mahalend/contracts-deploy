import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../../common";
export interface IWrappedTokenGatewayV3Interface extends utils.Interface {
    functions: {
        "borrowETH(address,uint256,uint256,uint16)": FunctionFragment;
        "depositETH(address,address,uint16)": FunctionFragment;
        "repayETH(address,uint256,uint256,address)": FunctionFragment;
        "withdrawETH(address,uint256,address)": FunctionFragment;
        "withdrawETHWithPermit(address,uint256,address,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "borrowETH" | "depositETH" | "repayETH" | "withdrawETH" | "withdrawETHWithPermit"): FunctionFragment;
    encodeFunctionData(functionFragment: "borrowETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "depositETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "repayETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawETH", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "withdrawETHWithPermit", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    decodeFunctionResult(functionFragment: "borrowETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "repayETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawETHWithPermit", data: BytesLike): Result;
    events: {};
}
export interface IWrappedTokenGatewayV3 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IWrappedTokenGatewayV3Interface;
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
        borrowETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, interestRateMode: PromiseOrValue<BigNumberish>, referralCode: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        depositETH(pool: PromiseOrValue<string>, onBehalfOf: PromiseOrValue<string>, referralCode: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        repayETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, rateMode: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawETHWithPermit(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, to: PromiseOrValue<string>, deadline: PromiseOrValue<BigNumberish>, permitV: PromiseOrValue<BigNumberish>, permitR: PromiseOrValue<BytesLike>, permitS: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    borrowETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, interestRateMode: PromiseOrValue<BigNumberish>, referralCode: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    depositETH(pool: PromiseOrValue<string>, onBehalfOf: PromiseOrValue<string>, referralCode: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    repayETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, rateMode: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawETHWithPermit(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, to: PromiseOrValue<string>, deadline: PromiseOrValue<BigNumberish>, permitV: PromiseOrValue<BigNumberish>, permitR: PromiseOrValue<BytesLike>, permitS: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        borrowETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, interestRateMode: PromiseOrValue<BigNumberish>, referralCode: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        depositETH(pool: PromiseOrValue<string>, onBehalfOf: PromiseOrValue<string>, referralCode: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        repayETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, rateMode: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdrawETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdrawETHWithPermit(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, to: PromiseOrValue<string>, deadline: PromiseOrValue<BigNumberish>, permitV: PromiseOrValue<BigNumberish>, permitR: PromiseOrValue<BytesLike>, permitS: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        borrowETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, interestRateMode: PromiseOrValue<BigNumberish>, referralCode: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        depositETH(pool: PromiseOrValue<string>, onBehalfOf: PromiseOrValue<string>, referralCode: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        repayETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, rateMode: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawETHWithPermit(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, to: PromiseOrValue<string>, deadline: PromiseOrValue<BigNumberish>, permitV: PromiseOrValue<BigNumberish>, permitR: PromiseOrValue<BytesLike>, permitS: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        borrowETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, interestRateMode: PromiseOrValue<BigNumberish>, referralCode: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        depositETH(pool: PromiseOrValue<string>, onBehalfOf: PromiseOrValue<string>, referralCode: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        repayETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, rateMode: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawETH(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, onBehalfOf: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawETHWithPermit(pool: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, to: PromiseOrValue<string>, deadline: PromiseOrValue<BigNumberish>, permitV: PromiseOrValue<BigNumberish>, permitR: PromiseOrValue<BytesLike>, permitS: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
