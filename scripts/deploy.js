//imports
const { ethers, run, network } = require("hardhat")

// async Main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deloying Contract...")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deploying Contract to : ${simpleStorage.address}`)

    if(network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    //update the current value

    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value:  ${updatedValue}`)

}


async function verify(contractAddress, args){
    console.log("Deloying Contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if(e.message.toLowerCase().includes("Already verified")){
            console.log("Already Verified!")
        }else{
            console.log(e)
        }
    }
    
}


// main call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
