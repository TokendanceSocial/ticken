import { ethers } from "hardhat";
import { Admin__factory } from "../typechain-types";

/*
⭐️⭐️Depoly success.
  Admin Address: 0x41528Ac1374698A78a89e7b2b548DcEd7184e142
  Event Address: 0x99af6A8F7dfEa81E57c9f47C526cdf77657B1649
  Test Event Proxy Address: 0xBA6Eac6744cD5f749061F03AECF06A67a06cbC09
*/
async function main() {
  const [owner] = await ethers.getSigners();
  const admin = await Admin__factory.connect(
    "0x41528Ac1374698A78a89e7b2b548DcEd7184e142",
    owner
  );
  console.log(await admin.eventsForOwner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
