// read.js

const Web3 = require("web3").default;
const { abi } = require("./build/HelloWorldSimple.json");

// Baştaki boşluğu kaldırdık:
const CONTRACT_ADDRESS = "0x0C80E22E665bAB8B5Cbc7a9aC41Ad81fc4B90578";

const web3 = new Web3("http://127.0.0.1:7545");
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

(async () => {
  try {
    const currentMessage = await contract.methods.message().call();
    console.log("📖 Okunan mesaj:", currentMessage || "<boş>");
  } catch (err) {
    console.error("❌ Okuma sırasında hata:", err);
  }
})();
