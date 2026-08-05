const { ethers } = require("ethers")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/UbtfldzyGgwYOSYeiw0y8YZF1V12brB3a"
    )

    const network = await provider.getNetwork()
    console.log("Connected to network:", network.name) // Should print "sepolia"
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
