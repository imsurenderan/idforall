const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const compiledContract = require("../compiled.json");
const { abi, evm } = compiledContract;

describe("IdentityStore Contract", () => {
  let accounts;
  let identityStore;

  before(async () => {
    accounts = await web3.eth.getAccounts();
    identityStore = new web3.eth.Contract(abi);
    identityStore = await identityStore
      .deploy({ data: evm.bytecode.object })
      .send({ from: accounts[0], gas: 1500000 });
  });

  it("should add an identity to the blockchain", async () => {
    const UID = web3.utils.asciiToHex("123456789");
    const fullName = web3.utils.asciiToHex("John Doe");
    const dateOfBirth = web3.utils.asciiToHex("01/01/2000");
    const nationalID = web3.utils.asciiToHex("AB123456");
    const additionalInfo = web3.utils.asciiToHex("None");
    const timestamp = Math.floor(Date.now() / 1000);

    await identityStore.methods
      .addIdentityToChain(UID, fullName, dateOfBirth, nationalID, additionalInfo, timestamp)
      .send({ from: accounts[0] });

    const identity = await identityStore.methods.getIdentity(UID).call();
    expect(web3.utils.hexToUtf8(identity[0])).to.equal("123456789");
    expect(web3.utils.hexToUtf8(identity[1])).to.equal("John Doe");
    expect(web3.utils.hexToUtf8(identity[2])).to.equal("01/01/2000");
    expect(web3.utils.hexToUtf8(identity[3])).to.equal("AB123456");
    expect(web3.utils.hexToUtf8(identity[4])).to.equal("None");
    expect(new BN(identity[5])).to.be.bignumber.equal(new BN(timestamp));
  });

  it("should not allow non-owners to add an identity", async () => {
    const UID = web3.utils.asciiToHex("987654321");
    const fullName = web3.utils.asciiToHex("Jane Doe");
    const dateOfBirth = web3.utils.asciiToHex("02/02/2000");
    const nationalID = web3.utils.asciiToHex("CD654321");
    const additionalInfo = web3.utils.asciiToHex("None");
    const timestamp = Math.floor(Date.now() / 1000);

    await expectRevert(
      identityStore.methods
        .addIdentityToChain(UID, fullName, dateOfBirth, nationalID, additionalInfo, timestamp)
        .send({ from: accounts[1] }),
      "Caller is not owner"
    );
  });
});
