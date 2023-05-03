const {ethers} = require('hardhat');
const {expect, assert} = require('chai');

describe("SimpleStorage", ()=>{
  let simpleStorage, simpleStorageFactory;
  beforeEach(async ()=>{
    simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    )
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number 0", async function (){
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should Update when we call Store function", async function(){
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue)
  })
})