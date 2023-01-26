// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library EventInfo {
    enum EventState {
        Live,
        Close
    }

    struct BasicInfo {
        string name;
        string symbol;
        uint256 holdTime;
        uint256 personLimit;
        uint256 price;
        string metaURL;
        EventState state;
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
