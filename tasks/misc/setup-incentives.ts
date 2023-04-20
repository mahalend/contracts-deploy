import { task } from "hardhat/config";
import { getEmissionManager } from "../../helpers";
import { RewardsDataTypes } from "../../typechain/@aave/periphery-v3/contracts/rewards/RewardsController";

task(`setup-incentives`, `Setup the incentives`).setAction(async (_, hre) => {
  if (!hre.network.config.chainId) {
    throw new Error("INVALID_CHAIN_ID");
  }

  console.log(`\n- PullRewardsTransferStrategy deployment`);
  const { deployer } = await hre.getNamedAccounts();
  // const artifact = await hre.deployments.deploy("PullRewardsTransferStrategy", {
  //   args: [
  //     "0x6BD21E06274EBb92eEa5f9EB794914bAcfF0491F", // address incentivesController,
  //     "0x575e143702a015d09F298663405d1eD7fD20f0dD", // address rewardsAdmin,
  //     "0x575e143702a015d09F298663405d1eD7fD20f0dD", // address rewardsVault
  //   ],
  //   from: deployer,
  // });

  const emissionManager = (await getEmissionManager()).connect(
    await hre.ethers.getSigner(deployer)
  );

  const assets: RewardsDataTypes.RewardsConfigInputStruct[] = [
    {
      emissionPerSecond: "192900000000000", // emissionPerSecond: PromiseOrValue<BigNumberish>; 500 maha a month
      totalSupply: "0", // totalSupply: PromiseOrValue<BigNumberish>;
      distributionEnd: "1712490051", // distributionEnd: PromiseOrValue<BigNumberish>;
      asset: "0x67c38e607e75002cea9abec642b954f27204dda5", // asset: PromiseOrValue<string>;
      reward: "0xeb99748e91afca94a6289db3b02e7ef4a8f0a22d", // reward: PromiseOrValue<string>;
      transferStrategy: "0x944f371B1D9b01AC4aA959D76123957F0b5bFc4B", // transferStrategy: PromiseOrValue<string>;
      rewardOracle: "0xF6D51cf808A7A848ea825D41DD2651C4AF236fe1", // rewardOracle: PromiseOrValue<string>;
    },
  ];

  // const tx1 = await emissionManager.setEmissionAdmin(
  //   assets[0].reward,
  //   deployer
  // );
  // console.log("tx", tx1.hash);

  const tx2 = await emissionManager.configureAssets(assets);
  console.log("tx", tx2.hash);

  // console.log("PullRewardsTransferStrategy deployed at:", artifact.address);
  console.log(`\tFinished deployment`);
});
