import { ethers } from "hardhat";
async function deploy_proxy_admin() {
  const Admin = await ethers.getContractFactory("Admin");
  const admin = await Admin.deploy(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  await admin.deployed();

  console.log(`Admin Contract Deployed: ${admin.address}`);
  console.log(
    `Admin Contract Implement: ${await admin.logic()} Admin: ${await admin.admin()}`
  );
}

async function main() {
  await deploy_proxy_admin();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deploy_proxy_admin };
