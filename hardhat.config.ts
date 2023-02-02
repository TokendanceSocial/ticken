import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as env_config } from "dotenv";

env_config();
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
    goeril: {
      url: process.env.GOERIL_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
  },
};

export default config;
