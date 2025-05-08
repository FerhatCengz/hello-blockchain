// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    mapping(uint256 => string) public messages;

    function setMessage(uint256 id, string calldata text) external {
        messages[id] = text;
    }

    function getMessage(uint256 id) external view returns (string memory) {
        return messages[id];
    }

    function deleteMessage(uint256 id) external {
        delete messages[id];
    }
}
