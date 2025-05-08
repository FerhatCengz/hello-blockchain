// interact.js
const Web3 = require("web3").default;
const { abi } = require("./build/PersonnelManager.json");

const web3 = new Web3("http://127.0.0.1:8545"); // Ganache bağlantısı

// Deploy edilen kontratın adresi
const contractAddress = "0x1183d3289C4BdfeF647A6e9DC998b878B572040a";

// Kontrat örneğini oluştur
const contract = new web3.eth.Contract(abi, contractAddress);

(async () => {
  const [sender] = await web3.eth.getAccounts();

  // Örnek personel bilgileri
  const name = "Ferhat cengiz";
  const age = 24;
  const position = "Software Developer";

  // Personel ekleme işlemi
  const receipt = await contract.methods.addPersonnel(name, age, position).send({
    from: sender,
    gas: 200000
  });

  console.log("Personel eklendi. İşlem detayları:", receipt.transactionHash);
})();
