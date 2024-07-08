import { deepStrictEqual } from 'assert'
import { Line } from '../../src/exports.js'

describe('1: اصنع مستقيماً بالمسافة فقط', function () {
  it('1.1: موجب', function () {
    // 0 -2-> 2

    const l = Line.create.one({ dis: 2 })
    deepStrictEqual(l, {
      dis: 2,
      count: 2,
      neg: false
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 2])
  })

  it('1.2: سلبي', function () {
    // -2 <-2- 0

    const l = Line.create.one({ dis: 2, neg: true })
    deepStrictEqual(l, {
      dis: 2,
      count: 2,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-0, -2])
  })

  it('1.3: نهاية إيجابية', function () {
    // 0 -2-> 2

    const l = Line.create.one({ end: 2 })
    deepStrictEqual(l, {
      dis: 2,
      count: 2,
      neg: false
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 2])
  })

  it('1.4: نهاية سلبية', function () {
    // -2 <-2- 0

    const l = Line.create.one({ end: -2 })
    deepStrictEqual(l, {
      dis: 2,
      count: 2,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-0, -2])
  })
})

describe('2: اصنع مستقيماً بالمسافة والتباعد', function () {
  it('2.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ dis: 2, spacing: 1 })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 1, 2])
  })

  it('2.2: سلبي', function () {
    // -2 <-1- -1 <-1- 0

    const l = Line.create.one({ dis: 2, spacing: 1, neg: true })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-0, -1, -2])
  })
})

describe('3: اصنع مستقيماً بالمسافة والعدد', function () {
  it('3.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ dis: 2, count: 3 })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 1, 2])
  })

  it('3.2: سلبي', function () {
    // -2 <-1- -1 <-1- 0

    const l = Line.create.one({ dis: 2, count: 3, neg: true })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-0, -1, -2])
  })
})

describe('4: اصنع مستقيماً بالتباعد والعدد', function () {
  it('4.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ spacing: 1, count: 3 })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 1, 2])
  })

  it('4.2: سلبي', function () {
    // -2 <-1- -1 <-1- 0

    const l = Line.create.one({ spacing: 1, count: 3, neg: true })
    deepStrictEqual(l, {
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-0, -1, -2])
  })
})

describe('5: اصنع نقاطاً على مستقيم', function () {
  it('5.1: العدد فقط - فردي', function () {
    // -3, -2, -1 | 0 | 1, 2, 3

    // -3 * 1 = -3
    // -2 * 1 = -2
    // -1 * 1 = -1
    //  0 * 1 =  0
    // +1 * 1 = +1
    // +2 * 1 = +2
    // +3 * 1 = +3

    const pArr = Line.create.points(7)
    deepStrictEqual(pArr, [0, 1, -1, 2, -2, 3, -3])
  })

  it('5.2: العدد فقط - زوجي', function () {
    // -2.5, -1.5, -0.5 | | 0.5, 1.5, 2.5

    // half_spacing = 1 * 0.5 = 0.5
    // (-2 * 1) + -half_spacing = -2 + -0.5 = -2.5
    // (-1 * 1) + -half_spacing = -1 + -0.5 = -1.5
    // (-0 * 1) + -half_spacing = -0 + -0.5 = -0.5
    //
    // (+0 * 1) + +half_spacing = +0 + +0.5 = +0.5
    // (+1 * 1) + +half_spacing = +1 + +0.5 = +1.5
    // (+2 * 1) + +half_spacing = +2 + +0.5 = +2.5

    const pArr = Line.create.points(6)
    deepStrictEqual(pArr, [0.5, -0.5, 1.5, -1.5, 2.5, -2.5])
  })

  it('5.3: العدد والتباعد - فردي', function () {
    // -6, -4, -2 | 0 | 2, 4, 6

    // -3 * 2 = -6
    // -2 * 2 = -4
    // -1 * 2 = -2
    //  0 * 2 =  0
    // +1 * 2 = +2
    // +2 * 2 = +4
    // +3 * 2 = +6

    const pArr = Line.create.points(7, 2)
    deepStrictEqual(pArr, [0, 2, -2, 4, -4, 6, -6])
  })

  it('5.4: العدد والتباعد - زوجي', function () {
    // -5, -3, -1 | | 1, 3, 5

    // half_spacing = 2 * 0.5 = 1
    // (-2 * 2) + -half_spacing = -4 + -1 = -5
    // (-1 * 2) + -half_spacing = -2 + -1 = -3
    // (-0 * 2) + -half_spacing = -0 + -1 = -1
    //
    // (+0 * 2) + +half_spacing = -0 + +1 = +1
    // (+1 * 2) + +half_spacing = -2 + +1 = +3
    // (+2 * 2) + +half_spacing = -4 + +1 = +5

    const pArr = Line.create.points(6, 2)
    deepStrictEqual(pArr, [1, -1, 3, -3, 5, -5])
  })
})
