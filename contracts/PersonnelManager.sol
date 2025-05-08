// contracts/PersonnelManager.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PersonnelManager {
    struct Personnel {
        string name;
        uint age;
        string position;
        bool exists;
    }

    mapping(uint => Personnel) private personnelRecords;

    // Her personele özel ID (arttırılır)
    uint public nextId = 1;

    // Yeni personel ekle
    function addPersonnel(string calldata name, uint age, string calldata position) external {
        personnelRecords[nextId] = Personnel(name, age, position, true);
        nextId++;
    }

    // ID ile personel bilgisi getir
    function getPersonnel(uint id) external view returns (string memory, uint, string memory) {
        require(personnelRecords[id].exists, "Personel bulunamadi.");
        Personnel storage p = personnelRecords[id];
        return (p.name, p.age, p.position);
    }
}
