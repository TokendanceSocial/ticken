import { ethers } from "hardhat";

async function deploy_transparent_proxy(adminAddress: string) {
  const admin = await ethers.getContractAt("Admin", adminAddress);
  const tx = await admin.deployProxy();
  const rc = await tx.wait();
  console.log(rc.events);
  const event = rc?.events?.find((e) => e.event === "proxy_deployed");
  console.log(event);
}

async function main() {
  // this address maybe
  await deploy_transparent_proxy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_transparent_proxy };
