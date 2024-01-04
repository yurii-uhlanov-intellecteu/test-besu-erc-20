import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);

  const cap = 5000000000;

  const myToken = await ethers.deployContract("MyToken", [cap]);

  await myToken.waitForDeployment();

  console.log(
    `MyToken with ${ethers.formatEther(
      cap
    )} cap deployed to ${myToken.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
