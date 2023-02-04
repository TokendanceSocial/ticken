import { ethers } from "hardhat";
import { Admin__factory, Event__factory } from "../typechain-types";

async function main() {
  const [owner] = await ethers.getSigners();

  const event = Event__factory.connect(
    "0xf5EF42c44710397D47A7E0413D4BfEf95C598d3d",
    owner
  );
  event.on(event.filters.airdrop(), (log) => {
    console.log(log);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
