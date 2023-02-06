import { ethers } from "hardhat";
import { Admin__factory, Event__factory } from "../typechain-types";

/*
⭐️⭐️Depoly success.
  Admin Address: 0x105ACC974958B6bc6f7EfC1C30Aa503E280f074a
  Event Address: 0x4C9A33F44859DAc68d49d762Ed5A53B6E4307e65
  Test Event Proxy Address: 0xD9711A5C3C2C05604C483c9999E35709059237ab
*/
const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
const personLimit = 100;
const price = 0;
const rebates = 0;
const name = "TKD";
const symbol = "Ticken";
const metaURL =
  "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
const eventType = 0;

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("address:", owner.address);
  const admin = Admin__factory.connect(
    "0x10d94279c7a0f68b0e8bbf3c3c524d6d623c81c3",
    owner
  );
  const tx = await admin.createEvent(
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    rebates,
    metaURL,
    owner.address,
    eventType
  );
  const rc = await tx.wait();
  let deployEvent = rc?.events?.find((e) => e.event === "proxy_deployed");
  console.log(`Event Deployed Address:${deployEvent?.args?.at(0)}`);
  const events = await admin.eventsForOwner(owner.getAddress());
  console.log(
    `Event Contract Address:${events[events.length - 1].basic.contractAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
