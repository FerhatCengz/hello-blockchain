// compile.js
const path = require("path");
const fs   = require("fs-extra");
const solc = require("solc");

const source = fs.readFileSync(
  path.resolve("contracts", "PersonnelManager.sol"),
  "utf8"
);

const input = {
  language: "Solidity",
  sources: { "PersonnelManager.sol": { content: source } },
  settings: {
    evmVersion: "london",                  // ← burası eklendi
    outputSelection: {
      "*": { "*": ["abi", "evm.bytecode"] }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const info   = output.contracts["PersonnelManager.sol"].PersonnelManager;

fs.outputJSONSync("build/PersonnelManager.json", {
  abi:      info.abi,
  bytecode: info.evm.bytecode.object
});

console.log("Compile tamamlandı: build/PersonnelManager.json");
