// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./EventInfo.sol";
import "./IEventInitial.sol";

contract Event is
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    IERC721EnumerableUpgradeable,
    IEventInitail
{
    event airdrop(address, uint256);
    // Mapping owner address to token id
    mapping(address => uint256) private minter2tokenId;
    mapping(uint256 => bool) private tokenSigned;
    address payable private receiver;
    uint256 private count;
    bool private isCancel;
    address[] private airdrops;

    mapping(address => bool) private signer;
    address[] private signer_list;

    EventInfo.BasicInfo private info;

    modifier beEventType(EventInfo.EventType t) {
        require(info.eventType == t, "Event:event type not allow");
        _;
    }

    modifier haveNoTicket(address to) {
        require(balanceOf(to) == 0, "Event:user have ticket");
        _;
    }

    modifier enoughPrice() {
        require(msg.value >= info.price, "Event: Not enough price");
        _;
    }

    modifier lessThanLimit() {
        if (info.personLimit == 0) {
            _;
        }
        require(count < info.personLimit, "Event:over invite person limit");
        _;
    }

    modifier eventActive() {
        require(!isCancel, "Event:event has been calceled");
        _;
    }

    modifier onlySigner() {
        require(signer[msg.sender], "Event:only signer can sign ticket");
        _;
    }

    modifier notSigned(uint256 tokenID) {
        require(!tokenSigned[tokenID], "Event:token has been signed");
        _;
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        // Event Hold Time, use secord level timestamp.
        uint256 _holdTime,
        // Event person limit, as for total supply for ERC721.
        uint256 _personLimit,
        // Event buy price.
        uint256 _price,
        // Event rebates
        uint256 _rebates,
        // MetaData URL
        string memory _meta,
        // collection address for public sale
        address payable _receiver,
        EventInfo.EventType _eventType
    ) external initializer {
        info.name = _name;
        info.symbol = _symbol;
        info.holdTime = _holdTime;
        info.personLimit = _personLimit;
        info.price = _price;
        if (_eventType == EventInfo.EventType.InviteOnly) {
            info.rebates = (_price / 1000) * _rebates;
        }
        info.metaURL = _meta;
        info.eventType = _eventType;
        info.creator = tx.origin;
        receiver = _receiver;
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        transferOwnership(info.creator);
        addSigner(info.creator);
    }

    /// @dev determine if a event is ongoing now.
    /// @dev you can call it in Admin directly by code `staticcall(hex"0c362f72")`
    function isGoing() public view returns (bool) {
        return !isClosed() && (block.timestamp < eventEndTime());
    }

    /// @dev get end time of a event. use 24 hours for default event end duration.
    function eventEndTime() public view returns (uint256) {
        return info.holdTime + 26 * 60 * 60;
    }

    /// @dev ??????????????????
    function airdropUsers() public view returns (address[] memory) {
        return airdrops;
    }

    /// @dev ??????????????????
    function signerUsers() public view returns (address[] memory) {
        return signer_list;
    }

    /// @dev ????????????????????????????????????????????????
    /// @return ?????????{EventInfo.AllInfo}
    function allUserInfo(
        address user
    ) public view returns (EventInfo.AllInfo memory) {
        EventInfo.UserInfo memory userInfo;
        userInfo.canInvite = info.eventType == EventInfo.EventType.InviteOnly;
        userInfo.tokenId = this.tokenOfOwnerByIndex(user, 0);
        userInfo.isSigned = tokenSigned[userInfo.tokenId];
        userInfo.isSigner = signer[user];

        EventInfo.AllInfo memory allInfo;
        allInfo.basic = info;
        allInfo.basic.state = state();
        allInfo.user = userInfo;
        return allInfo;
    }

    // === state function === //
    function state() internal view returns (EventInfo.EventState) {
        if (isCancel) {
            return EventInfo.EventState.Close;
        }
        return EventInfo.EventState.Live;
    }

    // === mint function === //
    /// @dev ????????????????????????????????????????????????
    function batchMint(address[] memory to) public onlyOwner {
        for (uint256 i = 0; i < to.length; ) {
            address mintAddr = to[i];
            unchecked {
                i += 1;
            }
            if (balanceOf(mintAddr) > 0) {
                continue;
            }
            ownerMint(mintAddr);
        }
    }

    function ownerMint(address to) public onlyOwner eventActive {
        uint256 id = counterAfterIncrease();
        _safeMint(to, id);
        airdrops.push(to);
        emit airdrop(to, id);
    }

    /// @dev ??????????????????????????????????????????
    function saleMint(
        address to
    )
        public
        payable
        eventActive
        enoughPrice
        haveNoTicket(to)
        beEventType(EventInfo.EventType.PublicSale)
    {
        mint(to);
    }

    /// @dev ????????????????????????????????????????????????????????????
    function inviteMint(
        address to,
        address payable inviter
    )
        public
        payable
        eventActive
        enoughPrice
        haveNoTicket(to)
        beEventType(EventInfo.EventType.InviteOnly)
    {
        mint(to);
        if (info.rebates != 0) {
            inviter.call{value: info.rebates}("");
        }
    }

    function mint(address to) internal {
        if (msg.value - info.rebates != 0) {
            receiver.call{value: msg.value - info.rebates}("");
        }
        uint256 id = counterAfterIncrease();
        _safeMint(to, id);
    }

    // === state transfer function === //

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override {
        require(balanceOf(to) == 0, "should not have more than one ticket");
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 /*batchSize*/
    ) internal virtual override {
        if (from == address(0)) {
            minter2tokenId[to] = firstTokenId;
        } else if (to == address(0)) {
            delete minter2tokenId[from];
        } else {
            minter2tokenId[to] = minter2tokenId[from];
            delete minter2tokenId[from];
        }
    }

    function counterAfterIncrease() internal returns (uint256) {
        count = count + 1;
        return count;
    }

    // === NFT info function === //

    /**
     * @dev Returns the total amount of tokens stored by the contract.
     */
    function totalSupply() external view returns (uint256) {
        return info.personLimit;
    }

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     */
    function tokenOfOwnerByIndex(
        address owner,
        uint256 /*index*/
    ) external view returns (uint256) {
        // ??????????????????????????????????????????0??????????????????
        // require(balanceOf(owner) > 0, "have no ticket");
        return minter2tokenId[owner];
    }

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function tokenByIndex(uint256 index) external pure returns (uint256) {
        return index;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return info.metaURL;
    }

    // === sign function === //

    /// @dev ?????????????????????
    function batchAddSigner(
        address[] calldata alist
    ) public onlyOwner eventActive {
        for (uint256 i = 0; i < alist.length; i++) {
            addSigner(alist[i]);
        }
    }

    function addSigner(address a) internal {
        if (signer[a]) {
            return;
        }
        signer[a] = true;
        signer_list.push(a);
    }

    /// @dev ??????
    /// @param tokenId ?????????????????????ID
    function sign(
        uint256 tokenId
    ) public onlySigner notSigned(tokenId) eventActive {
        _requireMinted(tokenId);
        tokenSigned[tokenId] = true;
    }

    function isSign(uint256 tokenId) public view returns (bool) {
        _requireMinted(tokenId);
        return tokenSigned[tokenId];
    }

    // === close event === //

    /// @dev ????????????
    function closeEvent() public onlyOwner {
        isCancel = true;
    }

    /// @dev ????????????????????????
    function isClosed() public view returns (bool) {
        return isCancel;
    }
}
