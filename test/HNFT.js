const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

describe("HNFT", () => {
    async function deployHNFTFixture () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const HNFT = await ethers.getContractFactory('HNFT');
        const HToken = await HNFT.deploy()
        await HToken.deployed()

        return { HToken, owner, addr1, addr2 }
    }
    describe("Deploy", async () => {
        it("Contract owner should be the same as deployer address", async () => {
            const { HToken, owner } = await loadFixture(deployHNFTFixture);
            expect(await HToken.owner()).to.equal(owner.address);
        })
    })
    describe("Mint", () => {
        it("HNFT should be minted to wallet address (owner and external)", async () => {
            const { HToken, owner, addr1, addr2 } = await loadFixture(deployHNFTFixture);
            
            let oldBalance = await HToken.balanceOf(owner.address)
            await HToken.mintNFT(owner.address)
            let newBalance = await HToken.balanceOf(owner.address)
            expect(newBalance).to.equal(oldBalance + 1)

            oldBalance = await HToken.balanceOf(addr2.address)
            await HToken.connect(addr1).mintNFT(addr2.address)
            newBalance = await HToken.balanceOf(addr2.address)
            expect(newBalance).to.equal(oldBalance + 1)
        })
    })
    describe("Transfer Token", async () => {
        it('Owner of NFT should be able to transfer it to another wallet', async () => {
            const { HToken, owner, addr1 } = await loadFixture(deployHNFTFixture);
            await HToken.mintNFT(owner.address)
            const oldBalance = await HToken.balanceOf(addr1.address)
            await HToken.transferFrom(owner.address, addr1.address, 1)
            const newBalance = await HToken.balanceOf(addr1.address)
            expect(newBalance).to.equal(oldBalance + 1)
        })
        it('Transfer should fail if not Owner of HNFT', async () => {
            const { HToken, owner, addr1, addr2 } = await loadFixture(deployHNFTFixture);
            await HToken.mintNFT(owner.address)
            const oldBalance = await HToken.balanceOf(addr2.address)
            
            HToken.transferFrom(addr1.address, addr2.address, 1)
                .then((res) => {
                    console.log('inside then')
                    console.log(res.message)
                })
                .catch((err) => {})

            const newBalance = await HToken.balanceOf(addr2.address)
            
            expect(newBalance).to.equal(oldBalance)
        })
        
    })

    describe("nada", async () => {
        it('it test the pure nothingness', async () => {
            const { HToken } = await loadFixture(deployHNFTFixture);
            const res = await HToken.nada()
            expect(res).to.equal('nada que ver aqui...')
        })
    })
})
/*
    describe("Deploy", async () => {
        const [owner] = await ethers.getSigners();
        console.log(`owner of the contract: ${owner.address}`)
        console.log(1)
        const HNFT = await ethers.getContractFactory('HNFT');
        console.log(2)
        //const hnft = await HNFT.deploy();
        console.log(3)
        console.log(`contract owner: ${hnft.owner}`)
        console.log('finishing')
    })

    async function mintHNFT() {
        const [owner, addr1, addr2] = ethers.getSigners();
        console.log(`owner of the contract: ${owner}\naddr1: ${addr1}\naddr2: ${addr2}`)
        const HNFT = await ethers.getContractFactory('HNFT');
        const hnft = await HNFT.deploy();
    }
*/