// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library EventInfo {
    enum EventState {
        Live,
        Close
    }

    enum EventType {
        PublicSale,
        InviteOnly
    }

    struct BasicInfo {
        string name;
        string symbol;
        uint256 holdTime;
        uint256 personLimit;
        uint256 price;
        uint256 rebates;
        string metaURL;
        EventState state;
        EventType eventType;
        address contractAddress;
    }

    struct UserInfo {
        uint256 tokenId;
        bool canInvite;
        bool isSigned;
        bool isSigner;
    }

    struct AllInfo {
        BasicInfo basic;
        UserInfo user;
    }
}
