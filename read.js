// read.js
const Web3 = require("web3").default;
const { abi } = require("./build/HelloWorldSimple.json");

const RPC_URL          = "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = "0xe72D74187D4B157E09F2f168D03430D48d91aFE3";

const web3     = new Web3(RPC_URL);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

(async () => {
  try {
    const current = await contract.methods.message().call();
    console.log("📖 Okunan mesaj:", current || "<boş>");
  } catch (err) {
    console.error("❌ Okuma hatası:", err.message || err);
  }
})();
