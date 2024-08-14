import { deepEqual } from 'assert/strict'
import { Line } from '../../../src/exports.js'

export default function () {
  describe('one', function () {
    it('1: لا قيم معطاة', function () {
      // [0 -> 1]

      let l = Line.create.one({})
      deepEqual(l, {
        start: 0,
        dis: 1,
        count: 2,
        neg: false
      })
      deepEqual(l.spacing, 1)
      deepEqual(l.end, 1)
      deepEqual(l.points, [0, 1])
    })

    it('2: قيم صنع مستقيم موجب', function () {
      // [1 -> 3]

      const optionWays = [
        { start: 1, end: 3, count: 3 },
        { start: 1, dis: 2, count: 3, neg: false },
        { start: 1, spacing: 1, count: 3, neg: false },
        { start: 1, spacing: 1, dis: 2, neg: false },
        { points: [1, 2, 3] }
      ]
      let l

      for (let i = 0; i < optionWays.length; i++) {
        l = Line.create.one(optionWays[i])
        deepEqual(l, {
          start: 1,
          dis: 2,
          count: 3,
          neg: false
        })
        deepEqual(l.spacing, 1)
        deepEqual(l.end, 3)
        deepEqual(l.points, [1, 2, 3])
      }
    })

    it('3: قيم صنع مستقيم سالب', function () {
      // [-1 -> -3]

      const optionWays = [
        { start: -1, end: -3, count: 3 },
        { start: -1, dis: 2, count: 3, neg: true },
        { start: -1, spacing: 1, count: 3, neg: true },
        { start: -1, spacing: 1, dis: 2, neg: true },
        { points: [-1, -2, -3] }
      ]
      let l

      for (let i = 0; i < optionWays.length; i++) {
        l = Line.create.one(optionWays[i])
        deepEqual(l, {
          start: -1,
          dis: 2,
          count: 3,
          neg: true
        })
        deepEqual(l.spacing, 1)
        deepEqual(l.end, -3)
        deepEqual(l.points, [-1, -2, -3])
      }
    })
  })

  describe('points', function () {
    it('1: العدد فقط - فردي', function () {
      // -2, -1 | 0 | +1, +2

      // -2 * 1 = -2
      // -1 * 1 = -1
      //  0 * 1 =  0
      // +1 * 1 = +1
      // +2 * 1 = +2

      const pArr = Line.create.points({ count: 5 })
      deepEqual(pArr, [0, 1, -1, 2, -2])
    })

    it('2: العدد والتباعد - فردي', function () {
      // -4, -2 | 0 | +2, +4

      // -2 * 2 = -4
      // -1 * 2 = -2
      //  0 * 2 =  0
      // +1 * 2 = +2
      // +2 * 2 = +4

      const pArr = Line.create.points({ count: 5, spacing: 2 })
      deepEqual(pArr, [0, 2, -2, 4, -4])
    })

    it('3: العدد فقط - زوجي', function () {
      // -1.5, -0.5 | +0.5, +1.5

      // (-1 * 1) - (1 / 2) = -1 - 0.5 = -1.5
      // (-0 * 1) - (1 / 2) = -0 - 0.5 = -0.5
      // (+0 * 1) + (1 / 2) = +0 + 0.5 = +0.5
      // (+1 * 1) + (1 / 2) = +1 + 0.5 = +1.5

      const pArr = Line.create.points({ count: 4 })
      deepEqual(pArr, [0.5, -0.5, 1.5, -1.5])
    })

    it('4: العدد والتباعد - زوجي', function () {
      // -3, -1 | +1, +3

      // (-1 * 2) - (2 / 2) = -2 - 1 = -3
      // (-0 * 2) - (2 / 2) = -0 - 1 = -1
      // (+0 * 2) + (2 / 2) = -0 + 1 = +1
      // (+1 * 2) + (2 / 2) = -2 + 1 = +3

      const pArr = Line.create.points({ count: 4, spacing: 2 })
      deepEqual(pArr, [1, -1, 3, -3])
    })
  })
}
