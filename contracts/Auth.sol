// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

contract Auth {
    mapping(address => bool) public users;

    event Registered(address indexed user);
    event Unregistered(address indexed user);

    function register() external {
        require(!users[msg.sender], "User already registered");
        users[msg.sender] = true;
        emit Registered(msg.sender);
    }

    function unregister() external {
        require(users[msg.sender], "User not registered");
        users[msg.sender] = false;
        emit Unregistered(msg.sender);
    }

    function isAuthenticated(address user) external view returns (bool) {
        return users[user];
    }
}