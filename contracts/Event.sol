// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Event is ERC721URIStorage, Ownable, IERC721Enumerable {
    // Mapping owner address to token id
    mapping(address => uint256) private owner2tokenId;
    mapping(address => bool) private signer;
    mapping(uint256 => bool) private tokenSigned;
    uint256 private count;

    struct BasicInfo {
        string name;
        string symbol;
        uint256 holdTime;
        uint256 personLimit;
        uint256 price;
        string metaURL;
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

    BasicInfo private info;

    modifier onlySigner() {
        if (signer[msg.sender]) {
            _;
        }
    }

    modifier notSigned(uint256 tokenID) {
        if (!tokenSigned[tokenID]) {
            _;
        }
    }

    constructor(
        string memory name_,
        string memory symbol_,
        // Event Hold Time, use secord level timestamp.
        uint256 ht,
        // Event person limit, as for total supply for ERC721.
        uint256 pl,
        // Event buy price.
        uint256 pr,
        // MetaData URL
        string memory mu
    ) ERC721(name_, symbol_) {
        info.name = name();
        info.symbol = symbol();
        info.holdTime = ht;
        info.personLimit = pl;
        info.price = pr;
        info.metaURL = mu;
    }

    function allUserInfo(address user) public view returns (AllInfo memory) {
        UserInfo memory userInfo;
        userInfo.canInvite = true;
        userInfo.tokenId = this.tokenOfOwnerByIndex(user, 0);
        userInfo.isSigned = tokenSigned[userInfo.tokenId];
        userInfo.isSigner = signer[user];

        AllInfo memory allInfo;
        allInfo.basic = info;
        allInfo.user = userInfo;
        return allInfo;
    }

    // ==== mint function ===//

    function batchMint(address[] memory to) public onlyOwner {
        for (uint256 i = 0; i < to.length; ) {
            ownerMint(to[i]);
            unchecked {
                i += 1;
            }
        }
    }

    function ownerMint(address to) public onlyOwner {
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
            owner2tokenId[to] = firstTokenId;
        } else if (to == address(0)) {
            delete owner2tokenId[from];
        } else {
            owner2tokenId[to] = owner2tokenId[from];
            delete owner2tokenId[from];
        }
    }

    function counterAfterIncrease() internal returns (uint256) {
        count = count + 1;
        return count;
    }

    // === NFT info function ===//

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
        return owner2tokenId[owner];
    }

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function tokenByIndex(uint256 index) external view returns (uint256) {
        return index;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return info.metaURL;
    }

    // === sign function ===//

    function addSigner(address a) public onlyOwner {
        signer[a] = true;
    }

    function sign(uint256 tokenId) public onlySigner notSigned(tokenId) {
        _requireMinted(tokenId);
        tokenSigned[tokenId] = true;
    }
}
