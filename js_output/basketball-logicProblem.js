/**
 * Category: MATH_AND_LOGIC
 * Tags: math
 *
 * This is not an actual algorithm. Instead, this is a simulation of a math/logic problem:
 * You have a basketball hoop and someone says that you can play one of two games.
 * Game 1: You get one shot to make the hoop.
 * Game 2: You get three shots and you have to make at least two of the three shots.
 * If p is the probability of making a particular shot, for which values of p should
 * you pick one game or the other?
 *
 * This simulation tests the p value for chances starting at 5% in increments of 5.
 * The results show that the answer to this puzzle is that for values of p > 50%,
 * the player should pick Game 2.
 */
const NUM_TRIALS = 10000;
let chance = 0.05;
function shootHoops() {
    let num = 0;
    for (let i = 0; i < NUM_TRIALS; i++) {
        const first = choose();
        const second = choose();
        const third = choose();
        if ([first, second, third].filter((val) => val).length >= 2) {
            num += 1;
        }
    }
    return num / NUM_TRIALS;
}
function choose() {
    return Math.random() < chance;
}
function roundTwoPlaces(hi) {
    return Math.round(hi * 100) / 100;
}
for (let i = 0; i < 19; i++) {
    const result = shootHoops();
    console.log("For chance", roundTwoPlaces(chance), "got", roundTwoPlaces(result), "so chance is", result > chance ? "greater!" : "lower..");
    chance += 0.05;
}
