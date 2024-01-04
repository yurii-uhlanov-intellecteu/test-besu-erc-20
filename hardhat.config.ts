import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: [
        {privateKey: "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", balance: "100000000000000000000"},
       {privateKey: "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3", balance: "100000000000000000000"},
       {privateKey: "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63", balance: "100000000000000000000"}
      ]
    },
    besu: {
      url: "http://127.0.0.1:8545",
      chainId: 2018,
      gasPrice: 1,
      minGasPrice: 1,
      initialBaseFeePerGas: 1,
      accounts: ["ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3", "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"]
    }
  },
  solidity: "0.8.20",
};

export default config;
