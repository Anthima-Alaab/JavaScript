import { equal } from 'assert/strict'
import { Line } from '../../../src/exports.js'

let line
let current

export default function () {
  describe('1: تحقق مما إذا كانت القيمة داخل المستقيم الموجب', function () {
    before(function () {
      line = Line.create.one({ dis: 10 })
    })

    it('1.1: خارج المستقيم - قبل', function () {
      // -1 <-> [0 <-> 10]

      const a = Line.point.inside(line, -1)
      equal(a, false)
    })

    it('1.2: خارج المستقيم - بعد', function () {
      // [0 <-> 10] <-> 11

      const a = Line.point.inside(line, 11)
      equal(a, false)
    })

    it('1.3: داخل المستقيم', function () {
      // [0 <-> 5 <-> 10]

      const a = Line.point.inside(line, 5)
      equal(a, true)
    })

    it('1.4: على بداية المستقيم', function () {
      // [0' <-> 10]

      const a = Line.point.inside(line, 0)
      equal(a, true)
    })

    it('1.5: على نهاية المستقيم', function () {
      // [0 <-> '10]

      const a = Line.point.inside(line, 10)
      equal(a, true)
    })
  })

  describe('2: تحقق مما إذا كانت القيمة داخل المستقيم السالب', function () {
    before(function () {
      line = Line.create.one({ dis: 10, neg: true })
    })

    it('2.1: خارج المستقيم - قبل', function () {
      // -11 <-> [-10 <-> 0]

      const a = Line.point.inside(line, -11)
      equal(a, false)
    })

    it('2.2: خارج المستقيم - بعد', function () {
      // [-10 <-> 0] <-> 1

      const a = Line.point.inside(line, 1)
      equal(a, false)
    })

    it('2.3: داخل المستقيم', function () {
      // [-10 <-> -5 <-> 0]

      const a = Line.point.inside(line, -5)
      equal(a, true)
    })

    it('2.4: على بداية المستقيم', function () {
      // [-10 <-> '0]

      const a = Line.point.inside(line, 0)
      equal(a, true)
    })

    it('2.5: على نهاية المستقيم', function () {
      // [-10' <-> 0]

      const a = Line.point.inside(line, -10)
      equal(a, true)
    })
  })

  describe('3: حرّك القيمة على المستقيم الموجب', function () {
    before(function () {
      line = Line.create.one({ dis: 10 })
      current = 5
    })

    it('3.1: خطوة صفر', function () {
      // [0 <- 5 -> 10] 0>> = [0 <- 5 -> 10]

      const a = Line.point.ride(line, current, 0)
      equal(a, 5)
    })

    it('3.2: الحركة للأمام داخل النطاق', function () {
      // [0 <- 5 -> 10] 3>> = [0 <- 8 -> 10]

      const a = Line.point.ride(line, current, 3)
      equal(a, 8)
    })

    it('3.3: عدم تجاوز الحد الأقصى', function () {
      // [0 <- 5 -> 10] 10>> = [0 <-> '10]

      const a = Line.point.ride(line, current, 10)
      equal(a, 10)
    })

    it('3.4: الحركة للخلف داخل النطاق', function () {
      // [0 <- 5 -> 10] <<3 = [0 <- 2 -> 10]

      const a = Line.point.ride(line, current, 3, true)
      equal(a, 2)
    })

    it('3.5: عدم تجاوز الحد الأدنى', function () {
      // [0 <- 5 -> 10] <<10 = [0' <-> 10]

      const a = Line.point.ride(line, current, 10, true)
      equal(a, 0)
    })
  })

  describe('4: حرّك القيمة على المستقيم السالب', function () {
    before(function () {
      line = Line.create.one({ dis: 10, neg: true })
      current = -5
    })

    it('4.1: خطوة صفر', function () {
      // [-10 <- -5 -> 0] <<0 = [-10 <- -5 -> 0]

      const a = Line.point.ride(line, current, 0)
      equal(a, -5)
    })

    it('4.2: الحركة للأمام داخل النطاق', function () {
      // [-10 <- -5 -> 0] <<3 = [-10 <- -8 -> 0]

      const a = Line.point.ride(line, current, 3)
      equal(a, -8)
    })

    it('4.3: عدم تجاوز الحد الأقصى', function () {
      // [-10 <- -5 -> 0] <<10 = [-10' <-> 0]

      const a = Line.point.ride(line, current, 10)
      equal(a, -10)
    })

    it('4.4: الحركة للخلف داخل النطاق', function () {
      // [-10 <- -5 -> 0] 3>> = [-10 <- -2 -> 0]

      const a = Line.point.ride(line, current, 3, true)
      equal(a, -2)
    })

    it('4.5: عدم تجاوز الحد الأدنى', function () {
      // [-10 <- -5 -> 0] 10>> = [-10 <-> '0]

      const a = Line.point.ride(line, current, 10, true)
      equal(a, 0)
    })
  })

  describe('5: تحديث مواضع المستقيم', function () {
    beforeEach(function () {
      line = Line.create.one({ start: 0, end: 10 })
    })

    it('5.1: عكس مستقيم', function () {
      // [0 -> 10] => [10 <- 0]

      const a = Line.point.move.flip(line)
      equal(a.start, 10)
      equal(a.end, 0)
    })

    it('5.2: تحديث موضع البداية فقط', function () {
      // [0 -> 10] => [5 -> 10]

      let a = Line.point.move(line, 5, { type: 'by', target: 'start' })

      equal(a.start, 5)
      equal(a.end, 10)

      // [5 -> 10] => [10 <- 20]

      a = Line.point.move(a, 20, { type: 'to', target: 'start' })
      equal(a.start, 20)
      equal(a.end, 10)
    })

    it('5.3: تحديث موضع النهاية فقط', function () {
      // [0 -> 10] => [0 -> 15]

      let a = Line.point.move(line, 5, { type: 'by', target: 'end' })
      equal(a.start, 0)
      equal(a.end, 15)

      // [0 -> 15] => [0 -> 20]

      a = Line.point.move(a, 20, { type: 'to', target: 'end' })
      equal(a.start, 0)
      equal(a.end, 20)
    })

    it('5.4: تحديث موضع البداية والنهاية معاً', function () {
      // [0 -> 10] => [5 -> 15]

      let a = Line.point.move(line, 5, { type: 'by', target: 'both' })
      equal(a.start, 5)
      equal(a.end, 15)

      // [5 -> 15] => [20 -> 20]

      a = Line.point.move(a, 20, { type: 'to', target: 'both' })
      equal(a.start, 20)
      equal(a.end, 20)
    })
  })
}
