import { deepStrictEqual } from 'assert'
import { Line } from '../../src/exports.js'

describe('1: اصنع مستقيماً بلا أي قيم', function () {
  it('1.1: ', function () {
    // 0 -1-> 1

    let l = Line.create.one({})
    deepStrictEqual(l, {
      start: 0,
      dis: 1,
      count: 2,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 1)
    deepStrictEqual(l.points, [0, 1])
  })
})

describe('2: اصنع مستقيماً بالمسافة فقط', function () {
  it('2.1: موجب', function () {
    // 0 -2-> 2

    let l = Line.create.one({ dis: 2 })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 2,
      neg: false
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [0, 2])

    // 1 -2-> 3

    l.start = 1
    deepStrictEqual(l, {
      start: 1,
      dis: 2,
      count: 2,
      neg: false
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, 3)
    deepStrictEqual(l.points, [1, 3])
  })

  it('2.2: سلبي', function () {
    // -2 <-2- 0

    let l = Line.create.one({ dis: 2, neg: true })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 2,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [0, -2])

    // -1 <-2- 1

    l.start = 1
    deepStrictEqual(l, {
      start: 1,
      dis: 2,
      count: 2,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -1)
    deepStrictEqual(l.points, [1, -1])
  })

  it('2.3: نهاية إيجابية', function () {
    // 0 -2-> 2

    const l = Line.create.one({ start: 0, end: 2 })
    deepStrictEqual(l, {
      start: 0,
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

  it('2.4: نهاية سلبية', function () {
    // -2 <-2- 0

    const l = Line.create.one({ start: 0, end: -2 })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 2,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [0, -2])
  })
})

describe('3: اصنع مستقيماً بالمسافة والتباعد', function () {
  it('3.1: موجب', function () {
    // 1 -1-> 2 -1-> 3

    const l = Line.create.one({ start: 1, dis: 2, spacing: 1 })
    deepStrictEqual(l, {
      start: 1,
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 3)
    deepStrictEqual(l.min, 0)
    deepStrictEqual(l.max, 2)
    deepStrictEqual(l.points, [1, 2, 3])
  })

  it('3.2: سلبي', function () {
    // -3 <-1- -2 <-1- -1

    const l = Line.create.one({ start: -1, dis: 2, spacing: 1, neg: true })
    deepStrictEqual(l, {
      start: -1,
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -3)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [-1, -2, -3])
  })
})

describe('4: اصنع مستقيماً بالمسافة والعدد', function () {
  it('4.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ dis: 2, count: 3 })
    deepStrictEqual(l, {
      start: 0,
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

    const l = Line.create.one({ dis: 2, count: 3, neg: true })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [0, -1, -2])
  })
})

describe('5: اصنع مستقيماً بالتباعد والعدد', function () {
  it('5.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ spacing: 1, count: 3 })
    deepStrictEqual(l, {
      start: 0,
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

  it('5.2: سلبي', function () {
    // -2 <-1- -1 <-1- 0

    const l = Line.create.one({ spacing: 1, count: 3, neg: true })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -2)
    deepStrictEqual(l.min, -2)
    deepStrictEqual(l.max, 0)
    deepStrictEqual(l.points, [0, -1, -2])
  })
})

describe('6: اصنع مستقيماً بنقاط جاهزة', function () {
  it('6.1: موجب', function () {
    // 0 -1-> 1 -1-> 2

    const l = Line.create.one({ points: [0, 1, 2] })
    deepStrictEqual(l, {
      start: 0,
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 2)
    deepStrictEqual(l.points, [0, 1, 2])
  })

  it('6.2: سلبي', function () {
    // -4 <-2- -2 <-2- 0

    const l = Line.create.one({ points: [0, -2, -4] })
    deepStrictEqual(l, {
      start: 0,
      dis: 4,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 2)
    deepStrictEqual(l.end, -4)
    deepStrictEqual(l.points, [0, -2, -4])
  })

  it('6.3: دالة صنع النقاط - موجب', function () {
    // -1 | 0 | +1

    const pArr = Line.create.points({ count: 3, sort: 'neg' })
    deepStrictEqual(pArr, [-1, 0, 1])

    // -1 -1-> 0 -1-> 1

    const l = Line.create.one({ points: pArr })
    deepStrictEqual(l, {
      start: -1,
      dis: 2,
      count: 3,
      neg: false
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, 1)
    deepStrictEqual(l.points, [-1, 0, 1])
  })

  it('6.4: دالة صنع النقاط - سالب', function () {
    // +1 | 0 | -1

    const pArr = Line.create.points({ count: 3, sort: 'pos' })
    deepStrictEqual(pArr, [1, 0, -1])

    // -1 <-1- 0 <-1- 1

    const l = Line.create.one({ points: pArr })
    deepStrictEqual(l, {
      start: 1,
      dis: 2,
      count: 3,
      neg: true
    })
    deepStrictEqual(l.spacing, 1)
    deepStrictEqual(l.end, -1)
    deepStrictEqual(l.points, [1, 0, -1])
  })
})

describe('7: اصنع نقاطاً على مستقيم', function () {
  it('7.1: العدد فقط - فردي', function () {
    // -3, -2, -1 | 0 | +1, +2, +3

    // -3 * 1 = -3
    // -2 * 1 = -2
    // -1 * 1 = -1
    //  0 * 1 =  0
    // +1 * 1 = +1
    // +2 * 1 = +2
    // +3 * 1 = +3

    const pArr = Line.create.points({ count: 7 })
    deepStrictEqual(pArr, [0, 1, -1, 2, -2, 3, -3])
  })

  it('7.2: العدد فقط - زوجي', function () {
    // -2.5, -1.5, -0.5 | | +0.5, +1.5, +2.5

    // half_spacing = 1 * 0.5 = 0.5
    // (-2 * 1) + -half_spacing = -2 + -0.5 = -2.5
    // (-1 * 1) + -half_spacing = -1 + -0.5 = -1.5
    // (-0 * 1) + -half_spacing = -0 + -0.5 = -0.5
    //
    // (+0 * 1) + +half_spacing = +0 + +0.5 = +0.5
    // (+1 * 1) + +half_spacing = +1 + +0.5 = +1.5
    // (+2 * 1) + +half_spacing = +2 + +0.5 = +2.5

    const pArr = Line.create.points({ count: 6 })
    deepStrictEqual(pArr, [0.5, -0.5, 1.5, -1.5, 2.5, -2.5])
  })

  it('7.3: العدد والتباعد - فردي', function () {
    // -6, -4, -2 | 0 | +2, +4, +6

    // -3 * 2 = -6
    // -2 * 2 = -4
    // -1 * 2 = -2
    //  0 * 2 =  0
    // +1 * 2 = +2
    // +2 * 2 = +4
    // +3 * 2 = +6

    const pArr = Line.create.points({ count: 7, spacing: 2 })
    deepStrictEqual(pArr, [0, 2, -2, 4, -4, 6, -6])
  })

  it('7.4: العدد والتباعد - زوجي', function () {
    // -5, -3, -1 | | +1, +3, +5

    // half_spacing = 2 * 0.5 = 1
    // (-2 * 2) + -half_spacing = -4 + -1 = -5
    // (-1 * 2) + -half_spacing = -2 + -1 = -3
    // (-0 * 2) + -half_spacing = -0 + -1 = -1
    //
    // (+0 * 2) + +half_spacing = -0 + +1 = +1
    // (+1 * 2) + +half_spacing = -2 + +1 = +3
    // (+2 * 2) + +half_spacing = -4 + +1 = +5

    const pArr = Line.create.points({ count: 6, spacing: 2 })
    deepStrictEqual(pArr, [1, -1, 3, -3, 5, -5])
  })
})
