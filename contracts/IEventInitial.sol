// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEventInitail {
    function initialize(
        string memory _name,
        string memory _symbol,
        // Event Hold Time, use secord level timestamp.
        uint256 _holdTime,
        // Event person limit, as for total supply for ERC721.
        uint256 _personLimit,
        // Event buy price.
        uint256 _price,
        // MetaData URL
        string memory _meta,
        address payable owner
    ) external;
}
