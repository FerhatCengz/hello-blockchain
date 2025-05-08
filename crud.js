// 1) Gerekli modülleri alıyoruz
const Web3 = require("web3").default;
const { abi } = require("./build/HelloWorldSimple.json");

// 2) Deploy ettiğimiz kontratın adresi  
const CONTRACT_ADDRESS = "0xEe47AeEb78e106235E333a5cA8B4733482B502d5";

// 3) Web3 örneğini Ganache’ın RPC URL’siyle başlatıyoruz  
const web3 = new Web3("http://127.0.0.1:7545");

// 4) ABI + adres bilgisiyle kontrat nesnesini oluşturuyoruz  
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

(async () => {
  // 5) Hesap listesini alıyoruz (Ganache’da önceden oluşturulan test hesapları)
  const [user] = await web3.eth.getAccounts();
  
  // --- CREATE / UPDATE ---
  console.log("→ Mesajı yazıyoruz…");
  // 6) setMessage fonksiyonunu çağırarak blok zincirine "Merhaba Blockchain!" yolluyoruz
  //    Bu bir transaction olduğu için .send() ile işleniyor ve yeni bir blokta saklanıyor.
  await contract.methods
    .setMessage("Merhaba Blockchain!")
    .send({ from: user });
  console.log("Mesaj ayarlandı.");

  // --- READ ---
  // 7) message() otomatik getter’ıyla zincirden okumayı yapıyoruz
  //    Bu bir *call*, yani yalnızca okuma işlemi; ücret (gas) harcanmıyor.
  const read1 = await contract.methods.message().call();
  console.log("Okunan mesaj:", read1);

  // --- DELETE ---
  console.log("→ Mesajı siliyoruz…");
  // 8) deleteMessage fonksiyonu ile blok zincirindeki kaydı siliyoruz
  await contract.methods.deleteMessage().send({ from: user });
  console.log("Mesaj silindi.");

  // --- READ AGAIN ---
  // 9) Yine call ile okuma: silinince "" (boş string) dönüyor
  const read2 = await contract.methods.message().call();
  console.log("Silindikten sonra mesaj:", read2 || "<boş>");
})();
