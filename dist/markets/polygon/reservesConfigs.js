"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyWBTC = exports.strategyAAVE = exports.strategyUSDC = exports.strategyAGEUR = exports.strategyJEUR = exports.strategyEURS = exports.strategyLINK = exports.strategySUSHI = exports.strategyBAL = exports.strategyDPI = exports.strategyCRV = exports.strategyGHST = exports.strategyWMATIC = void 0;
const rateStrategies_1 = require("./../aave/rateStrategies");
const types_1 = require("../../helpers/types");
exports.strategyWMATIC = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "6500",
    liquidationThreshold: "7000",
    liquidationBonus: "11000",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyGHST = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "2500",
    liquidationThreshold: "4500",
    liquidationBonus: "11500",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyCRV = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "7500",
    liquidationThreshold: "8000",
    liquidationBonus: "10500",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "1000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyDPI = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "2000",
    liquidationThreshold: "4500",
    liquidationBonus: "11000",
    borrowingEnabled: true,
    liquidationProtocolFee: "1000",
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyBAL = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "2000",
    liquidationThreshold: "4500",
    liquidationBonus: "11000",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategySUSHI = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "2000",
    liquidationThreshold: "4500",
    liquidationBonus: "11000",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyLINK = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "5000",
    liquidationThreshold: "6500",
    liquidationBonus: "10750",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyEURS = {
    strategy: rateStrategies_1.rateStrategyStableOne,
    baseLTVAsCollateral: "6500",
    liquidationThreshold: "7000",
    liquidationBonus: "10750",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    flashLoanEnabled: true,
    reserveDecimals: "2",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "1000",
    supplyCap: "2000000000",
    borrowCap: "0",
    debtCeiling: "500000000",
    borrowableIsolation: false,
};
exports.strategyJEUR = {
    strategy: rateStrategies_1.rateStrategyStableOne,
    baseLTVAsCollateral: "0",
    liquidationThreshold: "0",
    liquidationBonus: "0",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyAGEUR = {
    strategy: rateStrategies_1.rateStrategyStableOne,
    baseLTVAsCollateral: "0",
    liquidationThreshold: "0",
    liquidationBonus: "0",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyUSDC = {
    strategy: rateStrategies_1.rateStrategyStableOne,
    baseLTVAsCollateral: "8250",
    liquidationThreshold: "8500",
    liquidationBonus: "10400",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: true,
    flashLoanEnabled: true,
    reserveDecimals: "6",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "1000",
    supplyCap: "2000000000",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: true,
};
exports.strategyAAVE = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "6000",
    liquidationThreshold: "7000",
    liquidationBonus: "10750",
    liquidationProtocolFee: "1000",
    borrowingEnabled: false,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "18",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "0",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};
exports.strategyWBTC = {
    strategy: rateStrategies_1.rateStrategyVolatileOne,
    baseLTVAsCollateral: "7000",
    liquidationThreshold: "7500",
    liquidationBonus: "10650",
    liquidationProtocolFee: "1000",
    borrowingEnabled: true,
    stableBorrowRateEnabled: false,
    flashLoanEnabled: true,
    reserveDecimals: "8",
    aTokenImpl: types_1.eContractid.AToken,
    reserveFactor: "2000",
    supplyCap: "0",
    borrowCap: "0",
    debtCeiling: "0",
    borrowableIsolation: false,
};