#!/bin/bash

# @dev
# This bash script setups the needed artifacts to use
# the @mahalend/deploy package as source of deployment
# scripts for testing or coverage purposes.
#
# A separate  artifacts directory was created
# due at running tests all external artifacts
# located at /artifacts are deleted,  causing
# the deploy library to not find the external
# artifacts.

echo "[BASH] Setting up enviroment"

# remove hardhat and artifacts cache
npm run clean
rm -rf src/helpers/contract-artifacts
rm -rf src/helpers/contract-types

# Import external @mahalend/periphery artifacts
mkdir -p src/helpers/contract-artifacts/periphery
mkdir -p src/helpers/contract-types/periphery
cp -r node_modules/@mahalend/periphery/artifacts/* src/helpers/contract-artifacts/periphery
cp -r node_modules/@mahalend/periphery/types src/helpers/contract-types/periphery

# Import external @mahalend/core artifacts
mkdir -p src/helpers/contract-artifacts/core
mkdir -p src/helpers/contract-types/core
cp -r node_modules/@mahalend/core/artifacts/* src/helpers/contract-artifacts/core
cp -r node_modules/@mahalend/core/types src/helpers/contract-types/core

# compile @mahalend/deploy contracts
npm run compile

# Export MARKET_NAME variable to use Aave market as deployment setup
echo "[BASH] enviroment ready"
