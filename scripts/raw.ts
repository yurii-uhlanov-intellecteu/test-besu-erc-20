import { ethers } from 'ethers';
import MyToken from "../artifacts/contracts/MyToken.sol/MyToken.json"

const chainId = 1337;
const provider = new ethers.JsonRpcProvider("http://localhost:8545", {chainId, name: "besu"});
const addressFrom = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
const privateKey = 'ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f';
const wallet = new ethers.Wallet(privateKey, provider);

const addressTo = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';

// token details
const tokenAddress = '0x446e083592D2dFa6661E20097F6898990C3CACE5';

/** Create token transfer value as (10 ** token_decimal) * user_supplied_value
 * @dev BigNumber instead of BN to handle decimal user_supplied_value
 */
const valueToTransfer = ethers.parseEther("1.0");
/* Create token transfer ABI encoded data
 * `transfer()` method signature at https://eips.ethereum.org/EIPS/eip-20
 * ABI encoding ruleset at https://solidity.readthedocs.io/en/develop/abi-spec.html
 */
var abi = MyToken.abi;
const abiInterface = new ethers.Interface(abi);
const rawData = abiInterface.encodeFunctionData("transfer", [addressTo, valueToTransfer.toString()]);

const main = async () => {
  let nonce = await provider.getTransactionCount(addressFrom);
  console.log("Nonce:", nonce);

  let feeData = await provider.getFeeData();
  console.log("Fee Data:", feeData);

  const txData = {
    chainId,
    nonce,
    gasLimit: feeData["maxPriorityFeePerGas"],
    gasPrice: feeData["maxFeePerGas"],
    to: tokenAddress, // token contract address
    value: "0x0", // no ether value
    data: rawData,
  }

  const signedTx = await wallet.signTransaction(txData);
  console.log("Signed Transaction:", signedTx);

  const txHash = ethers.keccak256(signedTx);
  console.log("Precomputed txHash:", txHash);
}

main().catch(console.log).then(() => process.exit(0));
