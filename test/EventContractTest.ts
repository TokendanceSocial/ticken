import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Event } from "../typechain-types";
import { EventInfo } from "../typechain-types/contracts/Event";

const deployEvent = async () => {
  const holdTime = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 * 7;
  const personLimit = 100;
  const price = ethers.utils.parseEther("0.1");
  const name = "TKD";
  const symbol = "Ticken";
  const metaURL =
    "ipfs://bafybeifpeyasqdvrqa5g3cpmttrp3jjnlckrdrwnx5g2deydxlfk27q6zq/metadata.json";
  const [owner] = await ethers.getSigners();
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy();
  await event.deployed();
  await (
    await event.initialize(
      name,
      symbol,
      holdTime,
      personLimit,
      price,
      metaURL,
      owner.address
    )
  ).wait();
  return { event, owner, holdTime, price, personLimit, name, symbol, metaURL };
};

const mintToOwner = async (event: Event) => {
  const [owner] = await ethers.getSigners();
  const tx = await event.ownerMint(owner.address);
  await tx.wait();
};

const getAddressList = async (num: number): Promise<string[]> => {
  const s = await ethers.getSigners();
  return s.slice(0, num).map((e) => e.address);
};

const batchMint = async (event: Event, addressList: string[]) => {
  const tx = await event.batchMint(addressList);
  await tx.wait();
};

const addSignerToOwner = async (event: Event) => {
  const [owner] = await ethers.getSigners();
  const tx = await event.addSigner(owner.address);
  await tx.wait();
};

const closeEvent = async (event: Event) => {
  const tx = await event.closeEvent();
  await tx.wait();
};

describe("Event Contract", () => {
  let event: Event;
  let owner: SignerWithAddress;
  let basic: EventInfo.BasicInfoStruct;
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
      state: 0,
      contractAddress: "",
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
      expect(allInfo.basic.state).to.equal(0);
    });
    it("user info", async () => {
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.tokenId).to.equal(0);
      expect(allInfo.user.canInvite).to.equal(true);
      expect(allInfo.user.isSigner).to.equal(false);
      expect(allInfo.user.isSigned).to.equal(false);
    });
  });
  describe("Owner Mint", () => {
    beforeEach(async () => {
      await mintToOwner(event);
    });
    it("get token url", async () => {
      const metaURL = await event.tokenURI(1);
      expect(metaURL).to.equal(basic.metaURL);
    });
    it("owner has right state", async () => {
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.tokenId).to.equal(1);
      expect(await event.balanceOf(owner.address)).to.equal(1);
    });
  });
  describe("Owner Sign", () => {
    beforeEach(async () => {
      mintToOwner(event);
      addSignerToOwner(event);
    });
    it("owner to be signer", async () => {
      const allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.isSigner).to.equal(true);
    });
    it("sign owner ticket", async () => {
      let allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.isSigned).to.equal(false);
      const tx = await event.sign(allInfo.user.tokenId);
      await tx.wait();
      allInfo = await event.allUserInfo(owner.address);
      expect(allInfo.user.isSigned).to.equal(true);
    });
  });
  describe("Event close", () => {
    beforeEach(async () => {
      await closeEvent(event);
    });
    it("event has closed", async () => {
      expect(await event.isClosed()).to.true;
    });
    it("cannot mint", async () => {
      let haveE = false;
      try {
        const tx = await event.ownerMint(owner.address);
        await tx.wait();
      } catch (e: any) {
        // console.log(Object.keys(e));
        console.log(
          e.stackTrace[e.stackTrace.length - 1].message.value.toString()
        );
        haveE = true;
      }
      expect(haveE).to.true;
    });
  });
  describe("Event state", () => {
    it("Live", async () => {
      expect(await event.state()).to.equal(0);
    });
    it("Close", async () => {
      await closeEvent(event);
      expect(await event.state()).to.equal(1);
    });
  });
  describe("Batch Mint", () => {
    beforeEach(async () => {
      const addrList = await getAddressList(5);
      await batchMint(event, addrList);
    });
    it("any address has ticket", async () => {
      const addrList = await getAddressList(5);
      addrList.forEach(async (v) => {
        expect(await event.balanceOf(v)).to.be.equal(1);
      });
    });
    it("can dedup", async () => {
      await batchMint(event, [owner.address]);
      expect(await event.balanceOf(owner.address)).to.be.equal(1);
    });
  });
  describe("IsGoing", () => {
    it("going true", async () => {
      expect(await event.isGoing()).to.be.true;
    });
    it("false after closed", async () => {
      await closeEvent(event);
      expect(await event.isGoing()).to.be.false;
    });
  });
  describe("Sale Mint", () => {
    const saleMint = async (s: SignerWithAddress, ether: string = "0.1") => {
      const tx = await event
        .connect(s)
        .saleMint(s.address, { value: ethers.utils.parseEther(ether) });
      await tx.wait();
    };
    it("sold", async () => {
      const [owner, holder] = await ethers.getSigners();
      const originBalance = await owner.getBalance();

      await saleMint(holder);
      expect(await event.balanceOf(holder.address)).to.be.equal(1);
      expect(await owner.getBalance()).to.be.equal(
        originBalance.add(ethers.utils.parseEther("0.1"))
      );
    });
    it("cannot sale twice", async () => {
      const [owner, holder] = await ethers.getSigners();
      await saleMint(holder);
      let haveE = false;
      try {
        await saleMint(holder);
      } catch {
        haveE = true;
      }

      expect(haveE).to.be.true;
    });
    it("cannot sale not enough money", async () => {
      let haveE = false;
      try {
        const [owner, holder] = await ethers.getSigners();
        await saleMint(holder, "0.01");
      } catch {
        haveE = true;
      }

      expect(haveE).to.be.true;
    });
  });
});
