import { ethers } from "hardhat";

async function deploy_normal_event() {
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy();
  await event.deployed();

  console.log(`Event Contract Deployed: ${event.address}`);
  return event.address;
}

async function main() {
  await deploy_normal_event();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_normal_event };
