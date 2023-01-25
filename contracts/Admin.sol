// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "./IEventInitial.sol";

contract Admin {
    event proxy_deployed(address);
    address public admin;
    address public logic;

    constructor(address _logic, address _admin) {
        logic = _logic;
        admin = _admin;
    }

    function deployProxy() public payable {
        TransparentUpgradeableProxy p = new TransparentUpgradeableProxy(
            logic,
            admin,
            ""
        );
        IEventInitail(address(p)).initialize(block.timestamp);
        emit proxy_deployed(address(p));
    }
}
