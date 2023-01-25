import { ethers } from "hardhat";
import ProxyAdmin from "@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json";

async function deploy_proxy_admin(eventAddress: string) {
  const ProxyAdminContractFactory = await ethers.getContractFactory(
    ProxyAdmin.abi,
    ProxyAdmin.bytecode
  );
  const proxyAdmin = await ProxyAdminContractFactory.deploy();
  await proxyAdmin.deployed();
  console.log(`Deployed ProxyAdmin: ${proxyAdmin.address}`);
  const Admin = await ethers.getContractFactory("Admin");
  const admin = await Admin.deploy(
    // event contract
    eventAddress,
    proxyAdmin.address
  );

  await admin.deployed();

  console.log(`✨Admin Contract Deployed✨: ${admin.address}`);
  console.log(
    `# Admin Contract Implement: ${await admin.logic()} Admin: ${await admin.admin()} `
  );
  return admin.address;
}

async function main() {
  await deploy_proxy_admin("0x5FbDB2315678afecb367f032d93F642f64180aa3");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_proxy_admin };
