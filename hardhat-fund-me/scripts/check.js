const { ethers } = require("ethers")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/fIAZ3IuembzfHFgwusWs4-3w1J59xKqI"
    )

    const network = await provider.getNetwork()
    console.log("Connected to network:", network.name) // Should print "sepolia"
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
