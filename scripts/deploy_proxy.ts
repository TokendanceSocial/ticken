import { ethers } from "hardhat";

async function deploy_transparent_proxy(adminAddress: string) {
  const admin = await ethers.getContractAt("Admin", adminAddress);
  const tx = await admin.deployProxy();
  const rc = await tx.wait();
  let event = rc?.events?.find((e) => e.event === "proxy_deployed");
  console.log("Proxy deployed", event?.args);
}

async function main() {
  // admin address
  //   await deploy_transparent_proxy("0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6");
  const event = await ethers.getContractAt(
    "Event",
    "0x94099942864EA81cCF197E9D71ac53310b1468D8"
  );
  console.log(await event.timestamp());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_transparent_proxy };
