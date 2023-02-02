import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import {
  acquireEventParam,
  deployEvent,
  mintToOwner,
} from "./EventContractTest";
import ProxyAdmin from "@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json";
import { Admin } from "../typechain-types";
import { Event } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const deployAdmin = async () => {
  const { event } = await deployEvent();
  const ProxyAdminContractFactory = await ethers.getContractFactory(
    ProxyAdmin.abi,
    ProxyAdmin.bytecode
  );
  const proxyAdmin = await ProxyAdminContractFactory.deploy();
  await proxyAdmin.deployed();
  const Admin = await ethers.getContractFactory("Admin");
  const admin = await Admin.deploy(
    // event contract
    event.address,
    proxyAdmin.address
  );
  await admin.deployed();
  return { admin };
};

const deployProxyEvent = async (admin: Admin): Promise<Event> => {
  const { name, symbol, holdTime, personLimit, price, metaURL } =
    acquireEventParam();
  const [o] = await ethers.getSigners();
  const tx = await admin.createEvent(
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    metaURL,
    o.address
  );
  const rc = await tx.wait();
  let event = rc?.events?.find((e) => e.event === "proxy_deployed");
  let eventProxyAddress = event?.args?.at(0);
  return ethers.getContractAt("Event", eventProxyAddress);
};

describe("Admin Test", () => {
  let admin: Admin;
  let owner: SignerWithAddress;
  beforeEach(async () => {
    const result = await deployAdmin();
    admin = result.admin;
    const [o] = await ethers.getSigners();
    owner = o;
  });
  it("deploy success", async () => {
    expect(admin.address).to.be.not.empty;
  });
  describe("Event", () => {
    let event: Event;
    beforeEach(async () => {
      event = await deployProxyEvent(admin);
    });
    it("event deployed", async () => {
      expect(event.address).to.be.not.empty;
    });
    it("event have right info", async () => {
      const { name, symbol } = acquireEventParam();
      const info = await event.allUserInfo(owner.address);
      expect(info.basic.name).to.be.equal(name);
      expect(info.basic.symbol).to.be.equal(symbol);
    });
    it("mint to owner", async () => {
      const { metaURL } = acquireEventParam();
      await mintToOwner(event);
      const result = await event.tokenURI(1);
      expect(metaURL).to.equal(result);
    });
  });
  describe("Events for Owner", () => {
    let event: Event;
    beforeEach(async () => {
      event = await deployProxyEvent(admin);
    });
    it("has events", async () => {
      let events = await admin.eventsForOwner(owner.address);
      expect(events.length).to.equal(1);
      expect(events[0].basic.name).to.equal(await event.name());
    });
    it("has no attender", async () => {
      const [owner, user] = await ethers.getSigners();
      let events = await admin.connect(user).eventsForUser(user.address);
      expect(events.length).to.equal(0);
    });
  });
  describe("Events for User", () => {
    let event: Event;
    let user: SignerWithAddress;
    beforeEach(async () => {
      event = await deployProxyEvent(admin);
      const [owner, holder] = await ethers.getSigners();
      user = holder;
      await (
        await event.ownerMint(holder.address)
      ).wait;
    });
    it("owner is not attender", async () => {
      let events = await admin.eventsForUser(owner.address);
      expect(events.length).to.equal(0);
    });
    it("user can be attender", async () => {
      let events = await admin.connect(user).eventsForUser(user.address);
      expect(events.length).to.equal(1);
    });
  });
});
