/** @typedef {import('../options.js').Line} Line */
/** @typedef {import('../options.js').LineOptions} LineOptions */
/** @typedef {import("../imports.js").Point} Point */

/**
 * @param {LineOptions} options
 * @returns {Line}
 */
export function one({ dis, end, neg = false, count, spacing }) {
  // Validation
  if (dis !== undefined && dis < 0) throw new Error('dis must be positive')
  if (spacing !== undefined && spacing < 0)
    throw new Error('spacing must be positive')
  if (count !== undefined && count < 2)
    throw new Error('count must be equal or greater than 2')

  // Initialize line object
  const l = { neg }

  // Calculate properties based on provided options
  if (spacing && count && !dis) {
    l.dis = spacing * (count - 1)
    l.count = count
  } else if (dis && count && !spacing) {
    l.dis = dis
    l.count = count
  } else if (dis && spacing && !count) {
    l.dis = dis
    l.count = dis / spacing + 1
  } else if (end !== undefined) {
    l.dis = Math.abs(end)
    l.count = 2
    l.neg = end < 0
  } else if (dis) {
    l.dis = dis
    l.count = 2
  } else throw new Error('Case not implemented')

  // Define computed properties
  Object.defineProperties(l, {
    spacing: {
      get() {
        return this.dis / (this.count - 1)
      }
    },
    end: {
      get() {
        return this.dis * (this.neg ? -1 : 1)
      }
    },
    min: {
      get() {
        return this.neg ? -this.dis : 0
      }
    },
    max: {
      get() {
        return this.neg ? 0 : this.dis
      }
    },
    points: {
      get() {
        return Array.from(
          { length: this.count },
          (_, i) => this.spacing * i * (this.neg ? -1 : 1)
        )
      }
    }
  })

  // @ts-ignore
  return l
}

/**
 * Calculates the positions of all points on a line, optionally adjusting for an spacing.
 * @param {Point} count The count of points.
 * @param {Point} [spacing] The spacing to apply to each point's position. @defaultValue 1
 * @param {'zero' | 'negative' | 'positive'} [sort='zero'] The alignment of the points. @defaultValue 'zero'
 * @returns {Point[]} An array of positions for each point on the line.
 */
export function points(count, spacing = 1, sort = 'zero') {
  // Initialize an array to hold the calculated positions for each point.
  /** @type {Point[]} */
  const points = new Array(count)
  // Determine if the total number of points is even.
  const isEven = count % 2 === 0
  if (!isEven) points[0] = 0

  let j = isEven ? 0 : 1
  const halfSpacing = isEven ? spacing * 0.5 : 0
  // Iterate over each point to calculate its position.
  for (let i = j; i < count; i += 2) {
    // Calculate the position of the current point and assign it to the array.
    points[i] = spacing * j + halfSpacing
    points[i + 1] = spacing * -j - halfSpacing

    j++
  }

  // Return the array containing all calculated positions.
  if (sort === 'zero') return points
  if (sort === 'negative') return points.sort((a, b) => a - b)
  if (sort === 'positive') return points.sort((a, b) => b - a)
  throw new Error('Invalid alignment option')
}
