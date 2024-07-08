/** @typedef {import('../options.js').Line} Line */

/**
 * min is 0, max is 1, center is 0.5
 * @param {Line} line
 * @param {number} point between start and end inclusive
 * @returns {number}
 */
export function to({ dis, neg, end }, point) {
  if (point === 0) return neg ? 1 : 0
  if (point === end) return neg ? 0 : 1
  return (point / dis) * (neg ? -1 : 1)
}

/**
 * @param {Line} line
 * @param {number} point between start and end inclusive
 * @returns {number}
 */
to.clamp = function (line, point) {
  if (point >= line.max) return 1
  if (point <= line.min) return 0
  return to(line, point)
}

/**
 * @param {Line} line
 * @param {number} point between start and end inclusive
 * @returns {number}
 */
to.clamp.min = function (line, point) {
  if (point <= line.min) return 0
  return to(line, point)
}

/**
 * @param {Line} line
 * @param {number} point between start and end inclusive
 * @returns {number}
 */
to.clamp.max = function (line, point) {
  if (point >= line.max) return 1
  return to(line, point)
}

/**
 * min is 0, max is 1, center is 0.5
 * @param {Line} line
 * @param {number} t between 0 and 1 inclusive
 * @returns {number}
 */
export function from(line, t) {
  if (t === 1) return from.max(line)
  if (t === 0) return from.min(line)

  const { dis, neg } = line
  if (neg) return -(dis - dis * t)
  else return dis * t
}

/**
 * @param {Line} line
 * @param {number} t between 0 and 1 inclusive
 * @returns {number}
 */
from.clamp = function (line, t) {
  if (t >= 1) return from.max(line)
  if (t <= 0) return from.min(line)
  return from(line, t)
}

/**
 * @param {Line} line
 * @param {number} t between 0 and 1 inclusive
 * @returns {number}
 */
from.clamp.max = function (line, t) {
  if (t >= 1) return from.max(line)
  return from(line, t)
}

/**
 * @param {Line} line
 * @param {number} t between 0 and 1 inclusive
 * @returns {number}
 */
from.clamp.min = function (line, t) {
  if (t <= 0) return from.min(line)
  return from(line, t)
}

/**
 * @param {Line} line
 * @returns {number}
 */
from.center = function (line) {
  return from(line, 0.5)
}

/**
 * @param {Line} line
 * @returns {number}
 */
from.min = function ({ dis, neg }) {
  // NOTE: faster than calling `from(line, 0)`
  return neg ? -dis : 0
}

/**
 * @param {Line} line
 * @returns {number}
 */
from.max = function ({ dis, neg }) {
  // NOTE: faster than calling `from(line, 1)`
  return neg ? 0 : dis
}
