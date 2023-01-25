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

    function deployProxy(
        string memory _name,
        string memory _symbol,
        // Event Hold Time, use secord level timestamp.
        uint256 _holdTime,
        // Event person limit, as for total supply for ERC721.
        uint256 _personLimit,
        // Event buy price.
        uint256 _price,
        // MetaData URL
        string memory _meta
    ) public payable {
        TransparentUpgradeableProxy p = new TransparentUpgradeableProxy(
            logic,
            admin,
            ""
        );
        IEventInitail(address(p)).initialize(
            _name,
            _symbol,
            _holdTime,
            _personLimit,
            _price,
            _meta
        );
        emit proxy_deployed(address(p));
    }
}
