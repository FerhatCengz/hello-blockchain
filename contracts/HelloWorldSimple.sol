// contracts/HelloWorldSimple.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorldSimple {
    string public message;

    function setMessage(string calldata text) external {
        message = text;
    }

    function deleteMessage() external {
        delete message;
    }
}
