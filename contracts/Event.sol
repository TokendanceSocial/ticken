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
        info.rebates = _rebates;
        info.metaURL = _meta;
        info.eventType = _eventType;
        receiver = _receiver;
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        transferOwnership(tx.origin);
        addSigner(tx.origin);
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

    /// @dev 获取空投用户
    function airdropUsers() public view returns (address[] memory) {
        return airdrops;
    }

    /// @dev 获取核销用户
    function signerUsers() public view returns (address[] memory) {
        return signer_list;
    }

    /// @dev 通过用户地址，返回合约的全部信息
    /// @return 可以看{EventInfo.AllInfo}
    function allUserInfo(
        address user
    ) public view returns (EventInfo.AllInfo memory) {
        EventInfo.UserInfo memory userInfo;
        userInfo.canInvite = true;
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
    /// @dev 空投方法，批量输入需要空投的地址
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

    /// @dev 公售的方法，输入购买票的地址
    function saleMint(
        address to
    ) public payable eventActive enoughPrice haveNoTicket(to) {
        receiver.transfer(msg.value);
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
        // 在这里不检查有无票，如果返回0则表明没有票
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

    /// @dev 批量增加核销人
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

    /// @dev 签到
    /// @param tokenId 需要签到的票的ID
    function sign(
        uint256 tokenId
    ) public onlySigner notSigned(tokenId) eventActive {
        _requireMinted(tokenId);
        tokenSigned[tokenId] = true;
    }

    // === close event === //

    /// @dev 关闭活动
    function closeEvent() public onlyOwner {
        isCancel = true;
    }

    /// @dev 活动是否已经关闭
    function isClosed() public view returns (bool) {
        return isCancel;
    }
}
