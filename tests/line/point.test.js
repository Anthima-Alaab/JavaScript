import { strictEqual } from 'assert'
import { Line } from '../../src/exports.js'

let line
let current

describe('1: تحقق مما إذا كانت القيمة داخل المستقيم الموجب', function () {
  before(function () {
    line = Line.create.one({ dis: 10 })
  })

  it('1.1: خارج المستقيم - قبل', function () {
    // -1 <-> [0 <-> 10]

    const a = Line.point.inside(line, -1)
    strictEqual(a, false)
  })

  it('1.2: خارج المستقيم - بعد', function () {
    // [0 <-> 10] <-> 11

    const a = Line.point.inside(line, 11)
    strictEqual(a, false)
  })

  it('1.3: داخل المستقيم', function () {
    // [0 <-> 5 <-> 10]

    const a = Line.point.inside(line, 5)
    strictEqual(a, true)
  })

  it('1.4: على بداية المستقيم', function () {
    // [0' <-> 10]

    const a = Line.point.inside(line, 0)
    strictEqual(a, true)
  })

  it('1.5: على نهاية المستقيم', function () {
    // [0 <-> '10]

    const a = Line.point.inside(line, 10)
    strictEqual(a, true)
  })
})

describe('2: تحقق مما إذا كانت القيمة داخل المستقيم السالب', function () {
  before(function () {
    line = Line.create.one({ dis: 10, neg: true })
  })

  it('2.1: خارج المستقيم - قبل', function () {
    // -11 <-> [-10 <-> 0]

    const a = Line.point.inside(line, -11)
    strictEqual(a, false)
  })

  it('2.2: خارج المستقيم - بعد', function () {
    // [-10 <-> 0] <-> 1

    const a = Line.point.inside(line, 1)
    strictEqual(a, false)
  })

  it('2.3: داخل المستقيم', function () {
    // [-10 <-> -5 <-> 0]

    const a = Line.point.inside(line, -5)
    strictEqual(a, true)
  })

  it('2.4: على بداية المستقيم', function () {
    // [-10 <-> '0]

    const a = Line.point.inside(line, 0)
    strictEqual(a, true)
  })

  it('2.5: على نهاية المستقيم', function () {
    // [-10' <-> 0]

    const a = Line.point.inside(line, -10)
    strictEqual(a, true)
  })
})

describe('3: حرّك القيمة على المستقيم الموجب', function () {
  before(function () {
    line = Line.create.one({ dis: 10 })
    current = 5
  })

  it('3.1: خطوة صفر', function () {
    // [0 <- 5 -> 10] 0>> = [0 <- 5 -> 10]

    const a = Line.point.move(line, current, 0)
    strictEqual(a, 5)
  })

  it('3.2: الحركة للأمام داخل النطاق', function () {
    // [0 <- 5 -> 10] 3>> = [0 <- 8 -> 10]

    const a = Line.point.move(line, current, 3)
    strictEqual(a, 8)
  })

  it('3.3: عدم تجاوز الحد الأقصى', function () {
    // [0 <- 5 -> 10] 10>> = [0 <-> '10]

    const a = Line.point.move(line, current, 10)
    strictEqual(a, 10)
  })

  it('3.4: الحركة للخلف داخل النطاق', function () {
    // [0 <- 5 -> 10] <<3 = [0 <- 2 -> 10]

    const a = Line.point.move(line, current, 3, true)
    strictEqual(a, 2)
  })

  it('3.5: عدم تجاوز الحد الأدنى', function () {
    // [0 <- 5 -> 10] <<10 = [0' <-> 10]

    const a = Line.point.move(line, current, 10, true)
    strictEqual(a, 0)
  })
})

describe('4: حرّك القيمة على المستقيم السالب', function () {
  before(function () {
    line = Line.create.one({ dis: 10, neg: true })
    current = -5
  })

  it('4.1: خطوة صفر', function () {
    // [-10 <- -5 -> 0] <<0 = [-10 <- -5 -> 0]

    const a = Line.point.move(line, current, 0)
    strictEqual(a, -5)
  })

  it('4.2: الحركة للأمام داخل النطاق', function () {
    // [-10 <- -5 -> 0] <<3 = [-10 <- -8 -> 0]

    const a = Line.point.move(line, current, 3)
    strictEqual(a, -8)
  })

  it('4.3: عدم تجاوز الحد الأقصى', function () {
    // [-10 <- -5 -> 0] <<10 = [-10' <-> 0]

    const a = Line.point.move(line, current, 10)
    strictEqual(a, -10)
  })

  it('4.4: الحركة للخلف داخل النطاق', function () {
    // [-10 <- -5 -> 0] 3>> = [-10 <- -2 -> 0]

    const a = Line.point.move(line, current, 3, true)
    strictEqual(a, -2)
  })

  it('4.5: عدم تجاوز الحد الأدنى', function () {
    // [-10 <- -5 -> 0] 10>> = [-10 <-> '0]

    const a = Line.point.move(line, current, 10, true)
    strictEqual(a, 0)
  })
})
