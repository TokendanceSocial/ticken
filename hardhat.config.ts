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
        "0x1da04e88eda63b68164e0134e2bfe4e22a4a9b6d037693135c0710a85c1d764c",
      ],
    },
  },
};

export default config;
