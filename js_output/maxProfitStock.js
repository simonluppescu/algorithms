/**
 * Category: ARRAYS
 * Tags: math arrays
 *
 * You are given an integer array prices where prices[i]
 * is the price of a given stock on the ith day. On each
 * day, you may decide to buy and/or sell the stock.
 * You can only hold at most one share of the stock at any time.
 * However, you can buy it then immediately sell it on the same
 * day. Find and return the maximum profit you can achieve.
 *
 * Example: [7, 1, 5, 3, 6, 4]
 * Max profit is 7 because 5 - 1 is 4 + 6 - 3 is 3 so 4 + 3 is 7.
 */
import { assert } from "console";
function maxProfit(prices) {
    if (prices.length <= 1)
        return 0;
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}
assert(maxProfit([7, 1, 5, 3, 6, 4]) === 7);
assert(maxProfit([1, 2, 3, 4, 5]) === 4);
assert(maxProfit([7, 6, 5, 4, 3]) === 0);
console.log("All assertions passed");
