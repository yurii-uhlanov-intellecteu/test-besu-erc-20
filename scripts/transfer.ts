import { ethers } from "hardhat";

const recipientAddress = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"

async function main(recipientAddress: string) {
    const cap = 5000000000;
    const myTokenInstance = await ethers.deployContract("MyToken", [cap]);

  const [owner] = await ethers.getSigners();
  const tokensNumber = 14;
  console.log(
    `MyToken with ${ethers.formatEther(
    cap
    )} cap deployed to ${myTokenInstance.target}`
  );
  console.log(`The cap is: ${await myTokenInstance.cap()}`);
  console.log(`Owner's balance before the transfer of ${tokensNumber} tokens: ${await myTokenInstance.balanceOf(owner)}`);
  await myTokenInstance.transfer(recipientAddress, tokensNumber);
  console.log(`Owner's balance after the transfer: ${await myTokenInstance.balanceOf(owner.address)}`);
  console.log(`Recipient's balance after the transfer: ${await myTokenInstance.balanceOf(recipientAddress)}`);
}

main(recipientAddress).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
