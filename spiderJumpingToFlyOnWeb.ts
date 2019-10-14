/*
A spider web is defined by

"rings" numbered out from the centre as 0, 1, 2, 3, 4
"radials" labelled clock-wise from the top as A, B, C, D, E, F, G, H

For example the spider is at H3 and the fly is at E2.

Your task is to calculate and return the distance the spider must jump to get to the fly.
*/
import * as assert from "assert";

class JumpDistanceCalculator {
  public static RADIAL_MAPPER = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
  public static TOTAL_RADIALS = Object.keys(JumpDistanceCalculator.RADIAL_MAPPER).length;

  spiderCoord: Coordinate;
  flyCoord: Coordinate;

  constructor(spiderCoord: Coordinate, flyCoord: Coordinate) {
    this.spiderCoord = spiderCoord;
    this.flyCoord = flyCoord;
  }

  calculate(): number {
    const radialDifference = this.computeRadialDifference();

    const distance = this.computeDistance(radialDifference);

    return distance;
  }

  computeRadialDifference(): number {
    let numRadialsBetween = Math.abs(this.spiderCoord.radial - this.flyCoord.radial);
    numRadialsBetween = Math.min(numRadialsBetween, JumpDistanceCalculator.TOTAL_RADIALS - numRadialsBetween);
    const radialDifference = this.convertNumRadialsToRadians(numRadialsBetween);

    return radialDifference;
  }

  convertNumRadialsToRadians(numRadials): number {
    return (numRadials / JumpDistanceCalculator.TOTAL_RADIALS) * 2 * Math.PI;
  }

  computeDistance(radialDifference): number {
    const spiderRing = this.spiderCoord.ring;
    const flyRing = this.flyCoord.ring;

    return Math.sqrt(
      spiderRing * spiderRing + flyRing * flyRing - 2 * spiderRing * flyRing * Math.cos(radialDifference)
    );
  }
}

class Coordinate {
  radial: number;
  ring: number;

  constructor(coordStr: string) {
    if (coordStr.length !== 2) {
      throw new Error("coordinate must be length 2.");
    }

    this.radial = JumpDistanceCalculator.RADIAL_MAPPER[coordStr[0]];
    this.ring = parseInt(coordStr[1]);
  }
}

const calculator = new JumpDistanceCalculator(new Coordinate("H2"), new Coordinate("H4"));
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
