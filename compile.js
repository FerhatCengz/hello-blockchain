// compile.js
const path = require("path");
const fs   = require("fs-extra");
const solc = require("solc");

const source = fs.readFileSync(
  path.resolve("contracts", "HelloWorldSimple.sol"),
  "utf8"
);

const input = {
  language: "Solidity",
  sources: { "HelloWorldSimple.sol": { content: source } },
  settings: {
    evmVersion: "london",                  // ← burası eklendi
    outputSelection: {
      "*": { "*": ["abi", "evm.bytecode"] }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const info   = output.contracts["HelloWorldSimple.sol"].HelloWorldSimple;

fs.outputJSONSync("build/HelloWorldSimple.json", {
  abi:      info.abi,
  bytecode: info.evm.bytecode.object
});

console.log("Compile tamamlandı: build/HelloWorldSimple.json");
