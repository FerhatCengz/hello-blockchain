// Web3 kütüphanesini içe aktar (default ile, bazı kurulumlarda .default gerekebilir)
const Web3 = require("web3").default;

// Derlenmiş akıllı kontratın ABI (arayüz tanımı) ve bytecode'unu build klasöründen al
const { abi, bytecode } = require("./build/PersonnelManager.json");

// Web3 nesnesini, yerel blockchain node'una (örneğin Ganache) bağla
const web3 = new Web3("http://127.0.0.1:8545");

(async () => {
  // Kullanılabilir hesapları al ve ilk hesabı deployer olarak kullan
  const hesaplar = await web3.eth.getAccounts();
  console.log("Mevcut hesaplar:", hesaplar);
  
  const [deployer] = await web3.eth.getAccounts();

  // Bytecode "0x" ile başlamıyorsa, başına "0x" ekle (Ethereum bytecode'u 0x ile başlar)
  const code = bytecode.startsWith("0x") ? bytecode : "0x" + bytecode;

  // Ağdan geçerli gas fiyatını al (legacy tip işlemler için kullanılır)
  const gasPrice = await web3.eth.getGasPrice();
  console.log("Using gasPrice:", gasPrice);

  // Yeni bir kontrat nesnesi oluştur, deploy edilmek üzere hazırlanmış data ile
  // Kontratı deploy et ve belirtilen hesap ile gönder (gas limiti ve gas fiyatı belirlenmiş)
  const deployed = await new web3.eth.Contract(abi)
    .deploy({ data: code }) // Deploy edilecek bytecode verisi
    .send({
      from: deployer,       // İşlemi gönderen hesap
      gas: 3_000_000,       // Maksimum harcanabilecek gas miktarı
      gasPrice              // Kullanılacak gas fiyatı (legacy tx, EIP-1559 değil)
    });

  // Kontrat başarıyla deploy edildiyse, adresini yazdır
  console.log("Simple kontrat deploy edildi:", deployed.options.address);
})();
