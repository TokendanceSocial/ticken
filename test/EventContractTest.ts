import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Event } from "../typechain-types";

const deployEvent = async () => {
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = 0;
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  const [owner] = await ethers.getSigners();
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy(
    name,
    symbol,
    holdTime,
    personLimit,
    price,
    metaURL
  );
  await event.deployed();
  return { event, owner, holdTime, price, personLimit, name, symbol, metaURL };
};

const mintToOwner = async (event: Event) => {
  const [owner] = await ethers.getSigners();
  const tx = await event.ownerMint(owner.address);
  await tx.wait();
};

describe("Event Contract", () => {
  let event: Event;
  let owner: SignerWithAddress;
  let basic: Event.BasicInfoStruct;
  beforeEach(async () => {
    let result = await loadFixture(deployEvent);
    event = result.event;
    owner = result.owner;
    basic = {
      holdTime: result.holdTime,
      price: result.price,
      personLimit: result.personLimit,
      name: result.name,
      symbol: result.symbol,
      metaURL: result.metaURL,
    };
  });
  describe("Contract Deployed", () => {
    it("have address", async () => {
      const ContractAddress = await event.address;
      expect(ContractAddress).to.not.empty;
    });
    it("basic info", async () => {
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.basic.name).to.equal(basic.name);
      expect(allInfo.basic.symbol).to.equal(basic.symbol);
      expect(allInfo.basic.holdTime).to.equal(basic.holdTime);
      expect(allInfo.basic.personLimit).to.equal(basic.personLimit);
      expect(allInfo.basic.price).to.equal(basic.price);
      expect(allInfo.basic.metaURL).to.not.empty;
    });
    it("user info", async () => {
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.tokenId).to.equal(0);
      expect(allInfo.user.canInvite).to.equal(true);
      expect(allInfo.user.isSignMan).to.equal(false);
      expect(allInfo.user.isSigned).to.equal(false);
    });
    it("get token url", async () => {
      await mintToOwner(event);
      const metaURL = await event.tokenURI(1);
      expect(metaURL).to.equal(basic.metaURL);
    });
  });
  describe("Owner Mint", () => {
    it("owner has right state", async () => {
      await mintToOwner(event);
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.tokenId).to.equal(1);
      expect(await event.balanceOf(owner.address)).to.equal(1);
    });
  });
});
