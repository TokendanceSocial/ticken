import { ethers } from "hardhat";

async function main() {
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = 0;
  const name = "TKD";
  const symbol = "Ticken";
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy(name, symbol, holdTime, personLimit, price);
  const [owner] = await ethers.getSigners();
  const e = ethers.utils.formatEther(await owner.getBalance());
  console.log(`Using address:${owner.address} with balance: ${e} ETH`);
  await event.deployed();

  console.log(`Event Contract Deployed:${event.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
