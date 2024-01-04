import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("MyToken contract", function () {
  // global vars
  let Token;
  let myToken: MyToken;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;
  let tokenCap = 100000000;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    myToken = await Token.deploy(tokenCap);
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });
    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await myToken.cap();
      expect(Number(ethers.formatEther(cap))).to.equal(tokenCap);
    });
  });
  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await myToken.transfer(addr1.address, 50);
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await myToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await myToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        myToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(myToken, "ERC20InsufficientBalance");
      // Owner balance shouldn't have changed.
      expect(await myToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      // Transfer 100 tokens from owner to addr1.
      await myToken.transfer(addr1.address, 100);
      // Transfer another 50 tokens from owner to addr2.
      await myToken.transfer(addr2.address, 50);
      // Check balances.
      const finalOwnerBalance = await myToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance-ethers.parseUnits("150", 0) );
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);
      const addr2Balance = await myToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
