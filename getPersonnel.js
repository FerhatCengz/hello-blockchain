// getPersonnel.js
const Web3 = require("web3").default;
const { abi } = require("./build/PersonnelManager.json");

// Web3 bağlantısı (Ganache yerel ağına)
const web3 = new Web3("http://127.0.0.1:8545");

// Kontrat adresi (daha önce deploy edilen kontrat)
const contractAddress = "0x1183d3289C4BdfeF647A6e9DC998b878B572040a";

// Kontrat nesnesi oluştur
const contract = new web3.eth.Contract(abi, contractAddress);

(async () => {
    const id = 1; // Okumak istediğin personelin ID'si

    try {
        // getPersonnel fonksiyonu ile bilgiyi çağır
        const result = await contract.methods.getPersonnel(id).call();


        console.log("Personel Bilgileri:", result);

    } catch (error) {
        console.error("❌ Personel bulunamadı ya da okuma hatası:", error.message);
    }
})();
