#!/bin/bash

# @dev
# This bash script setups the needed artifacts to use
# the @aave/deploy-v3 package as source of deployment
# scripts for testing or coverage purposes.
#
# A separate  artifacts directory was created
# due at running tests all external artifacts
# located at /artifacts are deleted,  causing
# the deploy library to not find the external
# artifacts.

echo "[BASH] Setting up testnet enviroment"

if [ ! "$COVERAGE" = true ]; then
    # remove hardhat and artifacts cache
    npm run clean

    # compile @aave/deploy-v3 contracts
    npm run compile
else
    echo "[BASH] Skipping compilation to keep coverage artifacts"
fi

# Import external @aave/periphery artifacts
mkdir -p temp-artifacts/periphery
cp -r node_modules/@mahalend/periphery-v3/artifacts/contracts/* temp-artifacts/periphery-artifacts

# Import external @aave/core artifacts
mkdir -p temp-artifacts/deploy
cp -r node_modules/@mahalend/core-v3/artifacts/contracts/* temp-artifacts/core-artifacts

# Export MARKET_NAME variable to use Aave market as testnet deployment setup
export MARKET_NAME="Test"
export ENABLE_REWARDS="false"
echo "[BASH] Testnet enviroment ready"
