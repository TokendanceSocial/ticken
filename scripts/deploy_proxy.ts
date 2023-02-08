import { ethers } from "hardhat";

async function deploy_transparent_proxy(
  adminAddress: string,
  name: string,
  symbol: string,
  holdTime: number,
  personLimit: number,
  price: number,
  rebates: number,
  metaURL: string,
  eventType: number
) {
  const [owner] = await ethers.getSigners();
  const admin = await ethers.getContractAt("Admin", adminAddress);
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
  let event = rc?.events?.find((e) => e.event === "proxy_deployed");
  const proxy_address = event?.args?.at(0);
  console.log("Proxy deployed", proxy_address);
  return proxy_address;
}

async function main() {
  // admin address
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = ethers.utils.parseEther("0.00001").toNumber();
  const rebates = 10;
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  const eventType = 1;
  await deploy_transparent_proxy(
    "0x4A325F249771b3eC0Af74de1C9a626b02EF0860A",
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    rebates,
    metaURL,
    eventType
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_transparent_proxy };
