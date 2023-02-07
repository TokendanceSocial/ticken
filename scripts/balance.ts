import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `${owner.address}: ${ethers.utils.formatEther(
      await owner.getBalance()
    )} Matic`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
