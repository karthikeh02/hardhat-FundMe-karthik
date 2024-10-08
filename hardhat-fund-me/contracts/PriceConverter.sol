// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConvertor {
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        //ABI -
        // Address - 0x694AA1769357215DE4FAC081bf1f309aDC325306
        (, int256 answer,,,) = priceFeed.latestRoundData();
        return uint256(answer * 1e10);

        // there is a technically other ways to implement this
    }

    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}
