import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../../../common";
export declare namespace DistributionTypes {
    type AssetConfigInputStruct = {
        emissionPerSecond: PromiseOrValue<BigNumberish>;
        totalStaked: PromiseOrValue<BigNumberish>;
        underlyingAsset: PromiseOrValue<string>;
    };
    type AssetConfigInputStructOutput = [BigNumber, BigNumber, string] & {
        emissionPerSecond: BigNumber;
        totalStaked: BigNumber;
        underlyingAsset: string;
    };
}
export interface StakedAaveInterface extends utils.Interface {
    functions: {
        "COOLDOWN_SECONDS()": FunctionFragment;
        "DISTRIBUTION_END()": FunctionFragment;
        "EMISSION_MANAGER()": FunctionFragment;
        "PRECISION()": FunctionFragment;
        "REVISION()": FunctionFragment;
        "REWARDS_VAULT()": FunctionFragment;
        "REWARD_TOKEN()": FunctionFragment;
        "STAKED_TOKEN()": FunctionFragment;
        "UNSTAKE_WINDOW()": FunctionFragment;
        "_aaveGovernance()": FunctionFragment;
        "_countsSnapshots(address)": FunctionFragment;
        "_snapshots(address,uint256)": FunctionFragment;
        "allowance(address,address)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "assets(address)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "claimRewards(address,uint256)": FunctionFragment;
        "configureAssets((uint128,uint256,address)[])": FunctionFragment;
        "cooldown()": FunctionFragment;
        "decimals()": FunctionFragment;
        "decreaseAllowance(address,uint256)": FunctionFragment;
        "getNextCooldownTimestamp(uint256,uint256,address,uint256)": FunctionFragment;
        "getTotalRewardsBalance(address)": FunctionFragment;
        "getUserAssetData(address,address)": FunctionFragment;
        "increaseAllowance(address,uint256)": FunctionFragment;
        "initialize(address,string,string,uint8)": FunctionFragment;
        "name()": FunctionFragment;
        "redeem(address,uint256)": FunctionFragment;
        "stake(address,uint256)": FunctionFragment;
        "stakerRewardsToClaim(address)": FunctionFragment;
        "stakersCooldowns(address)": FunctionFragment;
        "symbol()": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transfer(address,uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "COOLDOWN_SECONDS" | "DISTRIBUTION_END" | "EMISSION_MANAGER" | "PRECISION" | "REVISION" | "REWARDS_VAULT" | "REWARD_TOKEN" | "STAKED_TOKEN" | "UNSTAKE_WINDOW" | "_aaveGovernance" | "_countsSnapshots" | "_snapshots" | "allowance" | "approve" | "assets" | "balanceOf" | "claimRewards" | "configureAssets" | "cooldown" | "decimals" | "decreaseAllowance" | "getNextCooldownTimestamp" | "getTotalRewardsBalance" | "getUserAssetData" | "increaseAllowance" | "initialize" | "name" | "redeem" | "stake" | "stakerRewardsToClaim" | "stakersCooldowns" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
    encodeFunctionData(functionFragment: "COOLDOWN_SECONDS", values?: undefined): string;
    encodeFunctionData(functionFragment: "DISTRIBUTION_END", values?: undefined): string;
    encodeFunctionData(functionFragment: "EMISSION_MANAGER", values?: undefined): string;
    encodeFunctionData(functionFragment: "PRECISION", values?: undefined): string;
    encodeFunctionData(functionFragment: "REVISION", values?: undefined): string;
    encodeFunctionData(functionFragment: "REWARDS_VAULT", values?: undefined): string;
    encodeFunctionData(functionFragment: "REWARD_TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "STAKED_TOKEN", values?: undefined): string;
    encodeFunctionData(functionFragment: "UNSTAKE_WINDOW", values?: undefined): string;
    encodeFunctionData(functionFragment: "_aaveGovernance", values?: undefined): string;
    encodeFunctionData(functionFragment: "_countsSnapshots", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "_snapshots", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "allowance", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "assets", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "claimRewards", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "configureAssets", values: [DistributionTypes.AssetConfigInputStruct[]]): string;
    encodeFunctionData(functionFragment: "cooldown", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getNextCooldownTimestamp", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getTotalRewardsBalance", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getUserAssetData", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "redeem", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "stake", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "stakerRewardsToClaim", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "stakersCooldowns", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "COOLDOWN_SECONDS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DISTRIBUTION_END", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "EMISSION_MANAGER", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PRECISION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REVISION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REWARDS_VAULT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "REWARD_TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "STAKED_TOKEN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UNSTAKE_WINDOW", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_aaveGovernance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_countsSnapshots", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_snapshots", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "assets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimRewards", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "configureAssets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cooldown", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNextCooldownTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalRewardsBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserAssetData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stakerRewardsToClaim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stakersCooldowns", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "AssetConfigUpdated(address,uint256)": EventFragment;
        "AssetIndexUpdated(address,uint256)": EventFragment;
        "Cooldown(address)": EventFragment;
        "Redeem(address,address,uint256)": EventFragment;
        "RewardsAccrued(address,uint256)": EventFragment;
        "RewardsClaimed(address,address,uint256)": EventFragment;
        "SnapshotDone(address,uint128,uint128)": EventFragment;
        "Staked(address,address,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "UserIndexUpdated(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetConfigUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AssetIndexUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Cooldown"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RewardsAccrued"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RewardsClaimed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SnapshotDone"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UserIndexUpdated"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    spender: string;
    value: BigNumber;
}
export type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface AssetConfigUpdatedEventObject {
    asset: string;
    emission: BigNumber;
}
export type AssetConfigUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], AssetConfigUpdatedEventObject>;
export type AssetConfigUpdatedEventFilter = TypedEventFilter<AssetConfigUpdatedEvent>;
export interface AssetIndexUpdatedEventObject {
    asset: string;
    index: BigNumber;
}
export type AssetIndexUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], AssetIndexUpdatedEventObject>;
export type AssetIndexUpdatedEventFilter = TypedEventFilter<AssetIndexUpdatedEvent>;
export interface CooldownEventObject {
    user: string;
}
export type CooldownEvent = TypedEvent<[string], CooldownEventObject>;
export type CooldownEventFilter = TypedEventFilter<CooldownEvent>;
export interface RedeemEventObject {
    from: string;
    to: string;
    amount: BigNumber;
}
export type RedeemEvent = TypedEvent<[
    string,
    string,
    BigNumber
], RedeemEventObject>;
export type RedeemEventFilter = TypedEventFilter<RedeemEvent>;
export interface RewardsAccruedEventObject {
    user: string;
    amount: BigNumber;
}
export type RewardsAccruedEvent = TypedEvent<[
    string,
    BigNumber
], RewardsAccruedEventObject>;
export type RewardsAccruedEventFilter = TypedEventFilter<RewardsAccruedEvent>;
export interface RewardsClaimedEventObject {
    from: string;
    to: string;
    amount: BigNumber;
}
export type RewardsClaimedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], RewardsClaimedEventObject>;
export type RewardsClaimedEventFilter = TypedEventFilter<RewardsClaimedEvent>;
export interface SnapshotDoneEventObject {
    owner: string;
    oldValue: BigNumber;
    newValue: BigNumber;
}
export type SnapshotDoneEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], SnapshotDoneEventObject>;
export type SnapshotDoneEventFilter = TypedEventFilter<SnapshotDoneEvent>;
export interface StakedEventObject {
    from: string;
    onBehalfOf: string;
    amount: BigNumber;
}
export type StakedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], StakedEventObject>;
export type StakedEventFilter = TypedEventFilter<StakedEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    value: BigNumber;
}
export type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface UserIndexUpdatedEventObject {
    user: string;
    asset: string;
    index: BigNumber;
}
export type UserIndexUpdatedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], UserIndexUpdatedEventObject>;
export type UserIndexUpdatedEventFilter = TypedEventFilter<UserIndexUpdatedEvent>;
export interface StakedAave extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StakedAaveInterface;
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
        COOLDOWN_SECONDS(overrides?: CallOverrides): Promise<[BigNumber]>;
        DISTRIBUTION_END(overrides?: CallOverrides): Promise<[BigNumber]>;
        EMISSION_MANAGER(overrides?: CallOverrides): Promise<[string]>;
        PRECISION(overrides?: CallOverrides): Promise<[number]>;
        REVISION(overrides?: CallOverrides): Promise<[BigNumber]>;
        REWARDS_VAULT(overrides?: CallOverrides): Promise<[string]>;
        REWARD_TOKEN(overrides?: CallOverrides): Promise<[string]>;
        STAKED_TOKEN(overrides?: CallOverrides): Promise<[string]>;
        UNSTAKE_WINDOW(overrides?: CallOverrides): Promise<[BigNumber]>;
        _aaveGovernance(overrides?: CallOverrides): Promise<[string]>;
        _countsSnapshots(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        _snapshots(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            blockNumber: BigNumber;
            value: BigNumber;
        }>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        assets(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            emissionPerSecond: BigNumber;
            lastUpdateTimestamp: BigNumber;
            index: BigNumber;
        }>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        claimRewards(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        configureAssets(assetsConfigInput: DistributionTypes.AssetConfigInputStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cooldown(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getNextCooldownTimestamp(fromCooldownTimestamp: PromiseOrValue<BigNumberish>, amountToReceive: PromiseOrValue<BigNumberish>, toAddress: PromiseOrValue<string>, toBalance: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getTotalRewardsBalance(staker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getUserAssetData(user: PromiseOrValue<string>, asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        initialize(aaveGovernance: PromiseOrValue<string>, name: PromiseOrValue<string>, symbol: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        redeem(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        stake(onBehalfOf: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        stakerRewardsToClaim(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        stakersCooldowns(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    COOLDOWN_SECONDS(overrides?: CallOverrides): Promise<BigNumber>;
    DISTRIBUTION_END(overrides?: CallOverrides): Promise<BigNumber>;
    EMISSION_MANAGER(overrides?: CallOverrides): Promise<string>;
    PRECISION(overrides?: CallOverrides): Promise<number>;
    REVISION(overrides?: CallOverrides): Promise<BigNumber>;
    REWARDS_VAULT(overrides?: CallOverrides): Promise<string>;
    REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;
    STAKED_TOKEN(overrides?: CallOverrides): Promise<string>;
    UNSTAKE_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
    _aaveGovernance(overrides?: CallOverrides): Promise<string>;
    _countsSnapshots(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    _snapshots(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        blockNumber: BigNumber;
        value: BigNumber;
    }>;
    allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    assets(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        emissionPerSecond: BigNumber;
        lastUpdateTimestamp: BigNumber;
        index: BigNumber;
    }>;
    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    claimRewards(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    configureAssets(assetsConfigInput: DistributionTypes.AssetConfigInputStruct[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cooldown(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getNextCooldownTimestamp(fromCooldownTimestamp: PromiseOrValue<BigNumberish>, amountToReceive: PromiseOrValue<BigNumberish>, toAddress: PromiseOrValue<string>, toBalance: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getTotalRewardsBalance(staker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getUserAssetData(user: PromiseOrValue<string>, asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    initialize(aaveGovernance: PromiseOrValue<string>, name: PromiseOrValue<string>, symbol: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    redeem(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    stake(onBehalfOf: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    stakerRewardsToClaim(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    stakersCooldowns(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        COOLDOWN_SECONDS(overrides?: CallOverrides): Promise<BigNumber>;
        DISTRIBUTION_END(overrides?: CallOverrides): Promise<BigNumber>;
        EMISSION_MANAGER(overrides?: CallOverrides): Promise<string>;
        PRECISION(overrides?: CallOverrides): Promise<number>;
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        REWARDS_VAULT(overrides?: CallOverrides): Promise<string>;
        REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;
        STAKED_TOKEN(overrides?: CallOverrides): Promise<string>;
        UNSTAKE_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        _aaveGovernance(overrides?: CallOverrides): Promise<string>;
        _countsSnapshots(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        _snapshots(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            blockNumber: BigNumber;
            value: BigNumber;
        }>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        assets(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            emissionPerSecond: BigNumber;
            lastUpdateTimestamp: BigNumber;
            index: BigNumber;
        }>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        claimRewards(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        configureAssets(assetsConfigInput: DistributionTypes.AssetConfigInputStruct[], overrides?: CallOverrides): Promise<void>;
        cooldown(overrides?: CallOverrides): Promise<void>;
        decimals(overrides?: CallOverrides): Promise<number>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        getNextCooldownTimestamp(fromCooldownTimestamp: PromiseOrValue<BigNumberish>, amountToReceive: PromiseOrValue<BigNumberish>, toAddress: PromiseOrValue<string>, toBalance: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getTotalRewardsBalance(staker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getUserAssetData(user: PromiseOrValue<string>, asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        initialize(aaveGovernance: PromiseOrValue<string>, name: PromiseOrValue<string>, symbol: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        redeem(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        stake(onBehalfOf: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        stakerRewardsToClaim(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        stakersCooldowns(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        "AssetConfigUpdated(address,uint256)"(asset?: PromiseOrValue<string> | null, emission?: null): AssetConfigUpdatedEventFilter;
        AssetConfigUpdated(asset?: PromiseOrValue<string> | null, emission?: null): AssetConfigUpdatedEventFilter;
        "AssetIndexUpdated(address,uint256)"(asset?: PromiseOrValue<string> | null, index?: null): AssetIndexUpdatedEventFilter;
        AssetIndexUpdated(asset?: PromiseOrValue<string> | null, index?: null): AssetIndexUpdatedEventFilter;
        "Cooldown(address)"(user?: PromiseOrValue<string> | null): CooldownEventFilter;
        Cooldown(user?: PromiseOrValue<string> | null): CooldownEventFilter;
        "Redeem(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): RedeemEventFilter;
        Redeem(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): RedeemEventFilter;
        "RewardsAccrued(address,uint256)"(user?: null, amount?: null): RewardsAccruedEventFilter;
        RewardsAccrued(user?: null, amount?: null): RewardsAccruedEventFilter;
        "RewardsClaimed(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): RewardsClaimedEventFilter;
        RewardsClaimed(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, amount?: null): RewardsClaimedEventFilter;
        "SnapshotDone(address,uint128,uint128)"(owner?: null, oldValue?: null, newValue?: null): SnapshotDoneEventFilter;
        SnapshotDone(owner?: null, oldValue?: null, newValue?: null): SnapshotDoneEventFilter;
        "Staked(address,address,uint256)"(from?: PromiseOrValue<string> | null, onBehalfOf?: PromiseOrValue<string> | null, amount?: null): StakedEventFilter;
        Staked(from?: PromiseOrValue<string> | null, onBehalfOf?: PromiseOrValue<string> | null, amount?: null): StakedEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter;
        "UserIndexUpdated(address,address,uint256)"(user?: PromiseOrValue<string> | null, asset?: PromiseOrValue<string> | null, index?: null): UserIndexUpdatedEventFilter;
        UserIndexUpdated(user?: PromiseOrValue<string> | null, asset?: PromiseOrValue<string> | null, index?: null): UserIndexUpdatedEventFilter;
    };
    estimateGas: {
        COOLDOWN_SECONDS(overrides?: CallOverrides): Promise<BigNumber>;
        DISTRIBUTION_END(overrides?: CallOverrides): Promise<BigNumber>;
        EMISSION_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;
        PRECISION(overrides?: CallOverrides): Promise<BigNumber>;
        REVISION(overrides?: CallOverrides): Promise<BigNumber>;
        REWARDS_VAULT(overrides?: CallOverrides): Promise<BigNumber>;
        REWARD_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
        STAKED_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
        UNSTAKE_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        _aaveGovernance(overrides?: CallOverrides): Promise<BigNumber>;
        _countsSnapshots(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        _snapshots(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        assets(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        claimRewards(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        configureAssets(assetsConfigInput: DistributionTypes.AssetConfigInputStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cooldown(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getNextCooldownTimestamp(fromCooldownTimestamp: PromiseOrValue<BigNumberish>, amountToReceive: PromiseOrValue<BigNumberish>, toAddress: PromiseOrValue<string>, toBalance: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getTotalRewardsBalance(staker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getUserAssetData(user: PromiseOrValue<string>, asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        initialize(aaveGovernance: PromiseOrValue<string>, name: PromiseOrValue<string>, symbol: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        redeem(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        stake(onBehalfOf: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        stakerRewardsToClaim(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        stakersCooldowns(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        COOLDOWN_SECONDS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DISTRIBUTION_END(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        EMISSION_MANAGER(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        REWARDS_VAULT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        REWARD_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        STAKED_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        UNSTAKE_WINDOW(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        _aaveGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        _countsSnapshots(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        _snapshots(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        allowance(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(spender: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        assets(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        claimRewards(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        configureAssets(assetsConfigInput: DistributionTypes.AssetConfigInputStruct[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cooldown(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decreaseAllowance(spender: PromiseOrValue<string>, subtractedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getNextCooldownTimestamp(fromCooldownTimestamp: PromiseOrValue<BigNumberish>, amountToReceive: PromiseOrValue<BigNumberish>, toAddress: PromiseOrValue<string>, toBalance: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTotalRewardsBalance(staker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserAssetData(user: PromiseOrValue<string>, asset: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        increaseAllowance(spender: PromiseOrValue<string>, addedValue: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        initialize(aaveGovernance: PromiseOrValue<string>, name: PromiseOrValue<string>, symbol: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeem(to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        stake(onBehalfOf: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        stakerRewardsToClaim(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stakersCooldowns(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFrom(sender: PromiseOrValue<string>, recipient: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}