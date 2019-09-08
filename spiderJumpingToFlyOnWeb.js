/*
A spider web is defined by

"rings" numbered out from the centre as 0, 1, 2, 3, 4
"radials" labelled clock-wise from the top as A, B, C, D, E, F, G, H

For example the spider is at H3 and the fly is at E2.

Your task is to calculate and return the distance the spider must jump to get to the fly.
*/

const RADIAL_MAPPER = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 };
const TOTAL_RADIALS = Object.keys(RADIAL_MAPPER).length;

class JumpDistanceCalculator {
  constructor(spiderCoord, flyCoord) {
    this.spiderCoord = spiderCoord;
    this.flyCoord = flyCoord;
  }

  calculate() {
    const radialDifference = this.computeRadialDifference();

    const distance = this.computeDistance(radialDifference);

    return distance;
  }

  computeRadialDifference() {
    let numRadialsBetween = Math.abs(
      this.spiderCoord.radial - this.flyCoord.radial
    );
    numRadialsBetween = Math.min(
      numRadialsBetween,
      TOTAL_RADIALS - numRadialsBetween
    );
    const radialDifference = this.convertNumRadialsToRadians(numRadialsBetween);

    return radialDifference;
  }

  convertNumRadialsToRadians(numRadials) {
    return (numRadials / TOTAL_RADIALS) * 2 * Math.PI;
  }

  computeDistance(radialDifference) {
    const spiderRing = this.spiderCoord.ring;
    const flyRing = this.flyCoord.ring;

    return Math.sqrt(
      spiderRing * spiderRing +
        flyRing * flyRing -
        2 * spiderRing * flyRing * Math.cos(radialDifference)
    );
  }
}

class Coordinate {
  constructor(coordStr) {
    if (coordStr.length !== 2) {
      throw new Error("coordinate must be length 2.");
    }

    this.radial = RADIAL_MAPPER[coordStr[0]];
    this.ring = parseInt(coordStr[1]);
  }
}

const spider = new Coordinate("H2");
const fly = new Coordinate("H2");
const calculator = new JumpDistanceCalculator(spider, fly);
console.log(calculator.calculate());
