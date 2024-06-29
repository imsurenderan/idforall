const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const compiledContract = require("../compiled.json");
const { abi, evm } = compiledContract;

describe("Owned Contract", () => {
  let accounts;
  let owned;

  before(async () => {
    accounts = await web3.eth.getAccounts();
    owned = new web3.eth.Contract(abi);
    owned = await owned
      .deploy({ data: evm.bytecode.object })
      .send({ from: accounts[0], gas: 1500000 });
  });

  it("should set the deployer as the owner", async () => {
    const owner = await owned.methods.getOwner().call();
    expect(owner).to.equal(accounts[0]);
  });

  it("should allow the owner to change ownership", async () => {
    await owned.methods.changeOwner(accounts[1]).send({ from: accounts[0] });
    const owner = await owned.methods.getOwner().call();
    expect(owner).to.equal(accounts[1]);
  });

  it("should not allow non-owners to change ownership", async () => {
    await expectRevert(
      owned.methods.changeOwner(accounts[2]).send({ from: accounts[0] }),
      "Caller is not owner"
    );
  });
});
