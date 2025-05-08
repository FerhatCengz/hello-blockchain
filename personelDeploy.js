// deploy.js
const Web3 = require("web3").default;
const { abi, bytecode } = require("./build/PersonnelManager.json");

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache bağlantısı

(async () => {
  const [deployer] = await web3.eth.getAccounts();
  const code = bytecode.startsWith("0x") ? bytecode : "0x" + bytecode;

  const gasPrice = await web3.eth.getGasPrice();
  console.log("Using gasPrice:", gasPrice);

  const deployed = await new web3.eth.Contract(abi)
    .deploy({ data: code })
    .send({
      from: deployer,
      gas: 3_000_000,
      gasPrice
    });

  console.log("Personnel kontrat adresi:", deployed.options.address);
})();
