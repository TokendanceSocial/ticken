import { ethers } from "hardhat";
import ProxyAdmin from "@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json";
import { solidityKeccak256 } from "ethers/lib/utils";

// This function can used for test or first deploy.
// It will deploy Admin, ProxyAdmin, Event and a proxy for test.

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("address:", owner.address);
  // test params
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = 0;
  const rebates = 0;
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  const eventType = 1;

  // deploy event
  console.log("Normal Event Start Deploy");
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy();
  await event.deployed();
  const event_implement_address = event.address;

  // deploy admin
  console.log("Proxy Admin Start Deploy");
  const ProxyAdminContractFactory = await ethers.getContractFactory(
    ProxyAdmin.abi,
    ProxyAdmin.bytecode
  );
  const proxyAdmin = await ProxyAdminContractFactory.deploy();
  await proxyAdmin.deployed();
  const Admin = await ethers.getContractFactory("Admin");
  console.log(
    `start deploying admin(${event_implement_address},${proxyAdmin.address})`
  );
  const admin = await Admin.deploy(
    // event contract
    event_implement_address,
    proxyAdmin.address
  );
  await admin.deployed();
  const admin_address = admin.address;

  // deploy proxy
  console.log("Proxy Start Deploy");
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
  const test_proxy_address = deployEvent?.args?.at(0);

  console.log(
    `🤵Deployer:${owner.address}(${ethers.utils.formatEther(
      await owner.getBalance()
    )} ETH)`
  );
  // print result
  console.log(`⭐️⭐️Depoly success.
  Admin Address: ${admin_address}
  Event Address: ${event_implement_address}
  Test Event Proxy Address: ${test_proxy_address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
