/* lastest polygon contract:
⭐️⭐️Depoly success.
  Admin Address: 0xA877a8aff7C93396B0C4De63e08Fe8cebAc1Da7c
  Proxy Admin Address: 0x8B46e3E41A2DcDEbC8A64ebaB48Bf41DfDe46846
  Event Address: 0x38844C8e1b4B3D1510cf65A1653AD268EE7a71dd
  Test Event Proxy Address: 0x7F1Fc23515b86A6d1243683CA7b83d11076b1532
*/

/* lastest mumbai contract:
🤵Deployer:0xd5c8A05d1CdA1caA4956D4AAaE94C6632FC19fc0(1.352006576315304753 ETH)
⭐️⭐️Depoly success.
  Admin Address: 0xBeCBf72d04E2Dd27049Cd1D2e07dC02641bB59EB
  Proxy Admin Address: 0xaF9A723A33fe6bCA96d25770599d779ee2756F3E
  Event Address: 0xc8916152956c66BCDc18a430C33013A1205EcF93
  Test Event Proxy Address: 0x7d11DD5B5D2b5364a72a2e537B8c4E3CCD4D693a
*/

/* lastest local contract:
⭐️⭐️Depoly success.
  Admin Address: 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c
  Proxy Admin: 0x68B1D87F95878fE05B998F19b66F4baba5De1aed
  Event Address: 0x4A679253410272dd5232B3Ff7cF5dbB88f295319
  Test Event Proxy Address: 0xeC4cFde48EAdca2bC63E94BB437BbeAcE1371bF3
  Block Number:17
*/
import { ethers } from "hardhat";
import { Admin, ProxyAdmin } from "../typechain-types";

async function main() {
  const Event = await ethers.getContractFactory("Event");
  const newEvent = await Event.deploy();
  console.log("New Event Address:", newEvent.address);
  const admin = await ethers.getContractAt(
    "Admin",
    "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"
  );
  const proxyAdmin = await ethers.getContractAt(
    "ProxyAdmin",
    "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"
  );
  const proxys = await getAllEventProxy(admin, 17);
  console.log("Upgrade Proxy List:", proxys);
  await upgradeNewImplement(proxyAdmin, newEvent.address, proxys);
}
async function upgradeNewImplement(
  proxyAdmin: ProxyAdmin,
  new_implment: string,
  proxys: string[]
) {
  proxys.forEach(async (v) => {
    let originImplement = await proxyAdmin.getProxyImplementation(v);
    await (
      await proxyAdmin.upgrade(v, new_implment)
    ).wait;
    console.log(
      `Update proxy (${v}) implement from ${originImplement} to ${new_implment}`
    );
  });
}

async function getAllEventProxy(
  admin: Admin,
  blockNumber: number
): Promise<string[]> {
  const deploy_events = await admin.queryFilter(
    admin.filters.proxy_deployed(),
    17
  );
  return deploy_events.map((v) => v.args.event_proxy_address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
