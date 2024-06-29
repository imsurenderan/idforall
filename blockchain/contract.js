require("dotenv").config();
const { Web3 } = require("web3");
const contractData = require("./compiled.json");

let lastGasPrice = 0;

// let web3 = new Web3("http://localhost:8545");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const Hashstore = new web3.eth.Contract(contractData.abi);

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

const ownerAddress = signer.address;

async function getCurrentGasPrice() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    console.info(gasPrice);
    // const finalGasPrice = Number(gasPrice) * 1.1; // Adding 10% extra
    console.info(
      "Network Gas Price:",
      gasPrice,
      "wei ---- Boosted Gas Price:",
      // finalGasPrice,
      gasPrice,
      "wei"
    );
    // const result = finalGasPrice.toFixed(0);
    const result = gasPrice;
    // store the last gas price to use in case of error
    if (result) lastGasPrice = result;
    return lastGasPrice;
  } catch (error) {
    console.error("Error getting gas price:", error.message);

    return lastGasPrice;
  }
}

// Initializing contract
async function initContract() {
  const gasPrice = await getCurrentGasPrice();
  // if contract address is there, no need to deploy another contract
  // Address to should be maintained as an env variable and should
  // be distributed to all workers to avoid creating multiple contracts
  if (
    process.env.CONTRACT_ADDRESS !== null &&
    process.env.CONTRACT_ADDRESS !== undefined &&
    process.env.CONTRACT_ADDRESS !== ""
  ) {
    Hashstore.options.address = process.env.CONTRACT_ADDRESS;
  } else {
    const gasValue = await Hashstore.deploy({
      data: contractData.bytecode,
    }).estimateGas({ from: ownerAddress });
    const gas = gasValue; // Adding 10% extra for any unexpected things

    // const gas = gasValue * 1.1; // Adding 10% extra for any unexpected things

    const newContractInstance = await Hashstore.deploy({
      data: contractData.bytecode,
    }).send({
      from: ownerAddress,
      // gas: gas.toFixed(0),
      gas: gas,
      gasPrice,
    });
    Hashstore.options.address = newContractInstance.options.address;
    console.info(
      "Deployed Contract Address:",
      newContractInstance.options.address
    );
    console.warn(
      "Store this address in env variable as CONTRACT_ADDRESS to avoid deploying more contracts in the future"
    );
  }
}

// Call this to post hash
// next line ignore
// eslint-disable-next-line no-async-promise-executor
async function postHash(
  UID,
  fullName,
  dateOfBirth,
  nationalID,
  additionalInfo,
  timestamp
) {
  const gasPrice = await getCurrentGasPrice();
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let gas = 97015;
    try {
      const gasValue = await Hashstore.methods
        .addIdentityToChain(
          UID,
          fullName,
          dateOfBirth,
          nationalID,
          additionalInfo,
          timestamp
        )
        .estimateGas({ from: ownerAddress });
      // gasValue = Number(gas)
      // gas = Number(gasValue) * 1.1; // Adding 10% extra for any unexpected things
      gas = Number(gasValue); // Adding 10% extra for any unexpected things
    } catch (err) {
      console.error(err);
    }

    Hashstore.methods
      .addIdentityToChain(
        UID,
        fullName,
        dateOfBirth,
        nationalID,
        additionalInfo,
        timestamp
      )
      .send({
        from: ownerAddress,
        gas: gas.toFixed(0),
        gasPrice: gasPrice?.toString(),
      })
      .on("transactionHash", (hash) => {
        console.info("Initial Hash", hash);
      })
      // eslint-disable-next-line no-unused-vars
      .on("confirmation", (confirmationNumber, receipt) => {})
      .on("receipt", (receipt) => {
        // receipt example
        resolve(receipt);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

const getIdentity = async (UID) => {
  try {
    if (!Hashstore.options.address) {
      throw new Error("Contract address not specified");
    }

    const identity = await Hashstore.methods.getIdentity(UID).call({
      from: ownerAddress,
    });
    return {
      UID: identity[0],
      fullName: web3.utils.hexToUtf8(identity[1]),
      dateOfBirth: web3.utils.hexToUtf8(identity[2]),
      nationalID: web3.utils.hexToUtf8(identity[3]),
      additionalInfo: web3.utils.hexToUtf8(identity[4]),
      timestamp: identity[5],
    };
  } catch (error) {
    console.error("Error fetching identity:", error);
  }
};

module.exports = {
  initContract,
  postHash,
  getIdentity,
};
