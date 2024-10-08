const { run } = require("hardhat")

const contractAddress = "0xF043E2eF7568f62D4e010C3765fB8f24A4CC046d"

const verify = async (contractAddress, args) => {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowercase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}
module.exports = { verify }
