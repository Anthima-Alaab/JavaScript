// /** @typedef {import("./imports").Point} Point */
/** @typedef {number} Point */

export {}

/**
 * @typedef {object} LineOptions
 * @property {Point} [dis]
 * @property {Point} [end]
 * @property {Point} [spacing]
 * @property {Point[]} [points]
 * @property {number} [count]
 * @property {boolean} [neg]
 */

/**
 * @typedef {object} Line
 * @property {Point} dis
 * @property {Point} spacing
 * @property {number} count
 * @property {boolean} neg
 * @property {Readonly<Point>} end
 * @property {Readonly<Point>} min
 * @property {Readonly<Point>} max
 * @property {Readonly<Point[]>} points
 */
