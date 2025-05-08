// interact.js
const Web3 = require("web3").default;
const { abi } = require("./build/PersonnelManager.json");

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache bağlantısı

// Deploy edilen kontratın adresi
const contractAddress = "0x795d412F65cb9B9be878e231f1fd1A686B9d0c22";

// Kontrat örneğini oluştur
const contract = new web3.eth.Contract(abi, contractAddress);

(async () => {
  const [sender] = await web3.eth.getAccounts();

  // Örnek personel bilgileri
  const name = "Ali Veli";
  const age = 30;
  const position = "Yazılım Mühendisi";

  // Personel ekleme işlemi
  const receipt = await contract.methods.addPersonnel(name, age, position).send({
    from: sender,
    gas: 200000
  });

  console.log("Personel eklendi. İşlem detayları:", receipt.transactionHash);
})();
