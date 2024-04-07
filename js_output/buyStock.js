import { assert } from "console";
function maxProfit(prices) {
    let bestPrice = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] - prices[i] > bestPrice) {
                bestPrice = prices[j] - prices[i];
            }
        }
    }
    return bestPrice;
}
function maxProfitBest(prices) {
    let min = prices[0];
    let bestPrice = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > min) {
            if (prices[i] - min > bestPrice) {
                bestPrice = prices[i] - min;
            }
        }
        if (prices[i] < min) {
            min = prices[i];
        }
    }
    return bestPrice;
}
assert(maxProfit([7, 1, 5, 3, 6, 4]) === 5);
assert(maxProfitBest([7, 1, 5, 3, 6, 4]) === 5);
assert(maxProfit([7, 4, 18, 3, 6, 4]) === 14);
assert(maxProfitBest([7, 4, 18, 3, 6, 4]) === 14);
assert(maxProfit([7, 4, 10, 3, 8, 11, 9]) === 8);
assert(maxProfitBest([7, 4, 10, 3, 8, 11, 9]) === 8);
assert(maxProfit([7, 4, 5, 8, 3, 4, 6, 2, 1, 3]) === 4);
assert(maxProfitBest([7, 4, 5, 8, 3, 4, 6, 2, 1, 3]) === 4);
console.log("All assertions passed");
