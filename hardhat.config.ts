import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as env_config } from "dotenv";

env_config();
const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
