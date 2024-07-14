/** @typedef {import('../options.js').Line} Line */
/** @typedef {import("../imports.js").Point} Point */

/**
 * Checks if a given point is inside the range defined by a Line object.
 * @param {Line} line - The Line object defining the range.
 * @param {Point} point - The point to check.
 * @returns {boolean} - Returns true if the point is inside the range, false otherwise.
 */
export function inside({ min, max }, point) {
  // Check if the point is greater than or equal to min and less than or equal to max, then return true; otherwise, return false.
  return point >= min && point <= max
}

/**
 * Moves the current position by a specified step within the range defined by a Line object.
 * @param {Line} line - The Line object defining the range.
 * @param {Point} current - The current position.
 * @param {Point} step - The step to move by.
 * @param {boolean} [inverse=false] - Optional parameter to indicate if the movement should be in the opposite direction. @defaultValue false
 * @returns {Point} - Returns the new position after moving.
 */
export function move({ min, max, neg }, current, step, inverse = false) {
  // If the step is zero, return the current position without changing it.
  if (step === 0) return current

  // Check if the inverse flag matches the neg property of the line. If they match, increase the current position by the step but do not exceed max.
  // If they do not match, decrease the current position by the step but do not go below min.
  // This effectively moves the position within the range, optionally in the inverse direction depending on the flags.
  return inverse === neg
    ? Math.min(current + step, max) // If moving forward or both inverse and neg are true, add step to current but limit to max.
    : Math.max(current - step, min) // If moving backward or both inverse and neg are false, subtract step from current but limit to min.
}
