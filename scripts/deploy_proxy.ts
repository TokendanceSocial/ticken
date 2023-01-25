import { ethers } from "hardhat";

async function deploy_transparent_proxy(
  adminAddress: string,
  name: string,
  symbol: string,
  holdTime: number,
  personLimit: number,
  price: number,
  metaURL: string
) {
  const admin = await ethers.getContractAt("Admin", adminAddress);
  const tx = await admin.deployProxy(
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    metaURL
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
  const price = 0;
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  await deploy_transparent_proxy(
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    name,
    symbol,
    holdTime,
    personLimit,
    personLimit,
    metaURL
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_transparent_proxy };
