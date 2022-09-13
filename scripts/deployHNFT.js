const { ethers } = require("hardhat");

/*
const { ethers } = require("ethers");
console.log('ethers is ')
console.log(ethers)
*/
async function main() {
    const signer = (await ethers.getSigners())[0]
    const HNFT = await ethers.getContractFactory('HNFT');

    const myHNFT = await HNFT.deploy()
    await myHNFT.deployed()
    console.log(`HNFT was deployed succesfully at: ${myHNFT.address} by: ${signer.address}`)
    await myHNFT.nada()
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
    })