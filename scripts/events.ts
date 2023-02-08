import { ethers } from "hardhat";
import { Admin__factory, Event__factory } from "../typechain-types";

async function main() {
  const [owner, user] = await ethers.getSigners();

  const event = Event__factory.connect(
    "0x12520133F54E4202a078239A2cD972030Be6E21D",
    owner
  );
  console.log(
    await event.allUserInfo("0xe1a6ee35f3aE64673fa20E3d9f7E44e4D379756e")
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
