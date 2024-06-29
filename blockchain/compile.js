const solc = require("solc");
const fs = require("fs");
const path = require("path");

function findImports(id) {
  const owned = path.resolve(__dirname, "contracts", "Owned.sol");
  const ownedSource = fs.readFileSync(owned, "UTF-8");
  if (id === "Owned.sol") {
    return {
      contents: ownedSource,
    };
  }
  return { error: "File not found" };
}

// module.exports = () => {
function compile() {
  let contract = {};
  try {
    const fileData = fs.readFileSync("compiled.json");
    contract = JSON.parse(fileData.toString());
  } catch (err) {
    const hashStore = path.resolve(__dirname, "contracts", "IdentityStore.sol");
    const hashStoreSource = fs.readFileSync(hashStore, "UTF-8");

    const input = {
      language: "Solidity",
      sources: {
        "IdentityStore.sol": {
          content: hashStoreSource,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    const output = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
    );
    contract = output.contracts["IdentityStore.sol"].IdentityStore;
    fs.writeFileSync(
      "compiled.json",
      JSON.stringify({
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object,
      })
    );
  }
  return contract;
}

compile();
