// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract Admin is ProxyAdmin {
    event proxy_deployed(address);
    address public admin;
    address public logic;

    constructor(address _logic) {
        logic = _logic;
        admin = address(this);
    }

    function deployProxy() public onlyOwner {
        TransparentUpgradeableProxy p = new TransparentUpgradeableProxy(
            logic,
            admin,
            ""
        );
        emit proxy_deployed(address(p));
    }
}
