//import
//main function
//calling of main function

const { network, deployments } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

//but hardhat deploy is a littlwe bitd different

// function deployFunc() {
//     console.log("hi")
// }

// module.exports.default = deployFunc

//namba ena panna porom na we should async function create panna porom
// indha parameter kulla hre - hardhat runtime environment

// module.exports = async (hre) =>  {
//     const {getNamedAccounts,deployments } = hre
//     //similiar idhu than
//     //hre.getNamedAccounts
//     //hre.deployments
// }

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // when going for localhost or hardhat network we want to use a mock
    // if chainid is x use address Y
    //if chainid is z use address A
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(fundMe.address, args)
    }
    log("-----------------")
}
module.exports.tags = ["all", "fundme"]
