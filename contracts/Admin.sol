// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IEventInitial.sol";
import "./EventInfo.sol";

contract Admin is Ownable {
    event proxy_deployed(address event_proxy_address, address owner_address);
    mapping(address => address[]) private userCreatedEvent;
    address[] private events;
    address private admin;
    address private logic;

    constructor(address _logic, address _admin) {
        logic = _logic;
        admin = _admin;
    }

    function eventsForUser(
        address user
    ) public view returns (EventInfo.AllInfo[] memory) {
        uint256 count = 0;
        for (uint i = 0; i < events.length; i++) {
            if (balanceOfBytes(events[i], user) > 0) {
                count++;
            }
        }

        EventInfo.AllInfo[] memory result = new EventInfo.AllInfo[](count);
        uint256 ptr = 0;
        for (uint i = 0; i < events.length; i++) {
            if (balanceOfBytes(events[i], user) > 0) {
                EventInfo.AllInfo memory info = allUserInfoBytes(
                    events[i],
                    user
                );
                info.basic.contractAddress = events[i];
                result[ptr] = info;
                ptr++;
            }
        }
        return result;
    }

    function eventsForOwner(
        address owner
    ) public view returns (EventInfo.AllInfo[] memory) {
        address[] memory ps = userCreatedEvent[owner];
        uint256 count = 0;
        for (uint i = 0; i < ps.length; i++) {
            if (isGoingBytes(ps[i])) {
                count++;
            }
        }

        EventInfo.AllInfo[] memory result = new EventInfo.AllInfo[](count);
        uint256 ptr = 0;
        for (uint i = 0; i < ps.length; i++) {
            if (isGoingBytes(ps[i])) {
                EventInfo.AllInfo memory info = allUserInfoBytes(ps[i], owner);
                info.basic.contractAddress = ps[i];
                result[ptr] = info;
                ptr++;
            }
        }
        return result;
    }

    function balanceOfBytes(
        address eventAddress,
        address user
    ) internal view returns (uint256) {
        bytes memory cd = abi.encodeWithSignature("balanceOf(address)", user);
        (bool success, bytes memory returndata) = address(eventAddress)
            .staticcall(cd);
        require(success);
        return abi.decode(returndata, (uint256));
    }

    function allUserInfoBytes(
        address eventAddress,
        address user
    ) internal view returns (EventInfo.AllInfo memory) {
        bytes memory cd = abi.encodeWithSignature("allUserInfo(address)", user);
        (bool success, bytes memory returndata) = address(eventAddress)
            .staticcall(cd);
        require(success);
        return abi.decode(returndata, (EventInfo.AllInfo));
    }

    function isGoingBytes(address p) internal view returns (bool) {
        (bool success, bytes memory returndata) = address(p).staticcall(
            hex"0c362f72"
        );
        require(success);
        return abi.decode(returndata, (bool));
    }

    function createEvent(
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
        address payable _receiver
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
            _meta,
            _receiver
        );
        userCreatedEvent[msg.sender].push(address(p));
        events.push(address(p));
        emit proxy_deployed(address(p), msg.sender);
    }
}
