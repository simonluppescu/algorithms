"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
A spider web is defined by

"rings" numbered out from the centre as 0, 1, 2, 3, 4
"radials" labelled clock-wise from the top as A, B, C, D, E, F, G, H

For example the spider is at H3 and the fly is at E2.

Your task is to calculate and return the distance the spider must jump to get to the fly.
*/
var assert = require("assert");
var JumpDistanceCalculator = /** @class */ (function () {
    function JumpDistanceCalculator(spiderCoord, flyCoord) {
        this.spiderCoord = spiderCoord;
        this.flyCoord = flyCoord;
    }
    JumpDistanceCalculator.prototype.calculate = function () {
        var radialDifference = this.computeRadialDifference();
        var distance = this.computeDistance(radialDifference);
        return distance;
    };
    JumpDistanceCalculator.prototype.computeRadialDifference = function () {
        var numRadialsBetween = Math.abs(this.spiderCoord.radial - this.flyCoord.radial);
        numRadialsBetween = Math.min(numRadialsBetween, JumpDistanceCalculator.TOTAL_RADIALS - numRadialsBetween);
        var radialDifference = this.convertNumRadialsToRadians(numRadialsBetween);
        return radialDifference;
    };
    JumpDistanceCalculator.prototype.convertNumRadialsToRadians = function (numRadials) {
        return (numRadials / JumpDistanceCalculator.TOTAL_RADIALS) * 2 * Math.PI;
    };
    JumpDistanceCalculator.prototype.computeDistance = function (radialDifference) {
        var spiderRing = this.spiderCoord.ring;
        var flyRing = this.flyCoord.ring;
        return Math.sqrt(spiderRing * spiderRing + flyRing * flyRing - 2 * spiderRing * flyRing * Math.cos(radialDifference));
    };
    JumpDistanceCalculator.RADIAL_MAPPER = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
    JumpDistanceCalculator.TOTAL_RADIALS = Object.keys(JumpDistanceCalculator.RADIAL_MAPPER).length;
    return JumpDistanceCalculator;
}());
var Coordinate = /** @class */ (function () {
    function Coordinate(coordStr) {
        if (coordStr.length !== 2) {
            throw new Error("coordinate must be length 2.");
        }
        this.radial = JumpDistanceCalculator.RADIAL_MAPPER[coordStr[0]];
        this.ring = parseInt(coordStr[1]);
    }
    return Coordinate;
}());
var calculator = new JumpDistanceCalculator(new Coordinate("H2"), new Coordinate("H4"));
assert(calculator.calculate() === 2);
calculator.spiderCoord = new Coordinate("H2");
calculator.flyCoord = new Coordinate("A2");
assert(calculator.calculate() === 1.530733729460359);
calculator.spiderCoord = new Coordinate("A3");
calculator.flyCoord = new Coordinate("E2");
assert(calculator.calculate() === 5);
calculator.spiderCoord = new Coordinate("A1");
calculator.flyCoord = new Coordinate("A1");
assert(calculator.calculate() === 0);
console.log("All assertions passed.");
