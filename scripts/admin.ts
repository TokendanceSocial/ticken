import { ethers } from "hardhat";
import { Admin__factory, Event__factory } from "../typechain-types";

/*
⭐️⭐️Depoly success.
  Admin Address: 0x105ACC974958B6bc6f7EfC1C30Aa503E280f074a
  Event Address: 0x4C9A33F44859DAc68d49d762Ed5A53B6E4307e65
  Test Event Proxy Address: 0xD9711A5C3C2C05604C483c9999E35709059237ab
*/
async function main() {
  const [owner] = await ethers.getSigners();

  console.log("address:", owner.address);
  const admin = Admin__factory.connect(
    "0x710e63793974bAd88375720aACfD0c57d18D4573",
    owner
  );
  console.log(await admin.eventsForOwner(owner.getAddress()));
  // const event = Event__factory.connect(
  //   "0x689c9590950E7E87bc7FF84e02bA3f613cD13732",
  //   owner
  // );
  // await event.ownerMint(owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
