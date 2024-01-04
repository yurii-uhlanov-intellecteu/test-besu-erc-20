# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Running the test
1. Install the dependencies

```
npm ci
```

2. Run hardhat tests

```
npx hardhat test
```

3. Deploy the ERC-20 token contract

```
npx hardhat run scripts/deploy.ts --network besu
```
prints: 

```
MyToken with 0.000000005 ETH deployed to 0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc
```
Keep the printed address for the future

4. Verify the balance of the token sender 0xf17f52151EbEF6C7334FAD080c5704D77216b732

```
curl -X POST -H "Content-type: application/json" --data '{"jsonrpc":"2.0","id":0,"method":"eth_call","params":[{"from":null,"to":"0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc","data":"0x70a08231000000000000000000000000f17f52151EbEF6C7334FAD080c5704D77216b732"}, "latest"]}' http://127.0.0.1:8545
```
prints: 

```
{"jsonrpc":"2.0","id":0,"result":"0x000000000000000000000000000000000000000000295be96e64066972000000"}
```

5. Verify the balance of the token recipient 0x627306090abaB3A6e1400e9345bC60c78a8BEf57

```
curl -X POST -H "Content-type: application/json" --data '{"jsonrpc":"2.0","id":0,"method":"eth_call","params":[{"from":null,"to":"0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc","data":"0x70a08231000000000000000000000000627306090abaB3A6e1400e9345bC60c78a8BEf57"}, "latest"]}' http://127.0.0.1:8545
```
prints: 

```
{"jsonrpc":"2.0","id":0,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

6. Update raw.ts script with the deployed contract address printed above

```
vi scripts/raw.ts
```

7. Run raw.ts

```
npx ts-node scripts/raw.ts
```
prints: 
 
```
Nonce: 1
Fee Data: FeeData {
  gasPrice: 1000n,
  maxFeePerGas: 1000000014n,
  maxPriorityFeePerGas: 1000000000n
}
Signed Transaction: 0x01f8ae82053901843b9aca0e843b9aca0094b9a219631aed55ebc3d998f17c3840b7ec39c0cc80b844a9059cbb000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef570000000000000000000000000000000000000000000000000de0b6b3a7640000c001a0bde9eb2460ca8b131656c4720a35695d9ca38187237b2bbd3ff5bce380cd392aa05bbb501eb0b2b06a566e47bdbf38625ee9ce4b13668a819d07906aa2f43a95aa
Precomputed txHash: 0xb45b72a6273fcd66b1f114770d22fea96bc5a27fcc042cff5d0948b8796f6e95
```

8. Copy the signed transaction as the first parameter in the following JSON RPC request params array and run it:

```
curl -X POST -H "Content-type: application/json" --data '{"jsonrpc":"2.0","id":1,"method":"eth_sendRawTransaction","params":["0x01f8ae82053901843b9aca0e843b9aca0094b9a219631aed55ebc3d998f17c3840b7ec39c0cc80b844a9059cbb000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef570000000000000000000000000000000000000000000000000de0b6b3a7640000c001a0bde9eb2460ca8b131656c4720a35695d9ca38187237b2bbd3ff5bce380cd392aa05bbb501eb0b2b06a566e47bdbf38625ee9ce4b13668a819d07906aa2f43a95aa"]}' http://127.0.0.1:8545
```
prints: 

```
{"jsonrpc":"2.0","id":1,"result":"0xb45b72a6273fcd66b1f114770d22fea96bc5a27fcc042cff5d0948b8796f6e95"}
```

9. Recheck the balances

prints: 

```
{"jsonrpc":"2.0","id":0,"result":"0x000000000000000000000000000000000000000000295be960834fb5ca9c0000"}
```

and

```
{"jsonrpc":"2.0","id":0,"result":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"}
```

respectively, with the second balance equal to 1e18, the exact amount that was transferred by the sender.

