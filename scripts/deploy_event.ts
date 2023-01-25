import { ethers } from "hardhat";

async function deploy_normal_event() {
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = 0;
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy(
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    metaURL
  );
  const [owner] = await ethers.getSigners();
  const e = ethers.utils.formatEther(await owner.getBalance());
  console.log(`Using address:${owner.address} with balance: ${e} ETH`);
  await event.deployed();

  console.log(`Event Contract Deployed: ${event.address}`);
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
