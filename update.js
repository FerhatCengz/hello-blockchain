// update.js
const Web3 = require("web3").default;
const { abi } = require("./build/HelloWorldSimple.json");

const RPC_URL          = "http://127.0.0.1:8545";
const CONTRACT_ADDRESS = "0xBEA82933f028f7cfFa6478A27E2627cE0D1cf9f0";

const web3     = new Web3(RPC_URL);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

(async () => {
  const [user] = await web3.eth.getAccounts();
  const newMsg = process.argv[2];
  if (!newMsg) {
    console.error("❗ Kullanım: node update.js \"<güncel mesaj>\"");
    process.exit(1);
  }

  await contract.methods
    .setMessage(newMsg)
    .send({ from: user, gas: 3000000, gasPrice: await web3.eth.getGasPrice() });

  console.log("🔄 Güncellendi:", newMsg);
})();
