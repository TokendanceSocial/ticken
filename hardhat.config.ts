import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as env_config } from "dotenv";

env_config();
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
      ],
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
    polygon: {
      url: process.env.POLYGON_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
    goeril: {
      url: process.env.GOERIL_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
  },
  etherscan: { apiKey: process.env.ETHERSCAN_KEY },
};

export default config;
