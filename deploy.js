// deploy.js
const Web3 = require("web3").default;
const { abi, bytecode } = require("./build/HelloWorldSimple.json");

const web3 = new Web3("http://127.0.0.1:7545");

(async () => {
  const [deployer] = await web3.eth.getAccounts();
  const code = bytecode.startsWith("0x") ? bytecode : "0x" + bytecode;

  // Zincirden güncel legacy gasPrice alın
  const gasPrice = await web3.eth.getGasPrice();
  console.log("Using gasPrice:", gasPrice);

  // Yeterli gas ile legacy tx gönder
  const deployed = await new web3.eth.Contract(abi)
    .deploy({ data: code })
    .send({
      from: deployer,
      gas: 3_000_000,
      gasPrice       // <-- burada maxFee/maxPriority yok
    });

  console.log("Simple kontrat deploy edildi:", deployed.options.address);
})();
