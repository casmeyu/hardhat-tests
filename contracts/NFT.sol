// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 mintPrice = 20000000000000000; // price to mint in wei
    uint256 maxQuantity = 100;

    constructor() ERC721 ('HardhatNFT', 'HNFT') {}

    function mintNFT(address to)
        public /*payable*/returns (uint256) {
            require(_tokenIds.current() < maxQuantity, 'No more MINTs premited');
            // require(msg.value >= mintPrice, 'You have to pay to mint an NFT');
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _mint(to, newTokenId);

            return newTokenId;
        }
    
    function nada() public pure returns(string memory) {
        return ("nada que ver aqui...");
    }
}