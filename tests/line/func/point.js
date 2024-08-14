import { equal } from 'assert/strict'
import { Line } from '../../../src/exports.js'
import { ok } from 'assert'

const posLine = Line.create.one({ end: +10 })
const negLine = Line.create.one({ end: -10 })
const posCurrent = +5
const negCurrent = -5

export default function () {
  describe('inside', function () {
    it('1: داخل المستقيم', function () {
      // [0 -> 0 -> 10]
      ok(Line.point.inside(posLine, 0))

      // [0 -> 5 -> 10]
      ok(Line.point.inside(posLine, 5))

      // [0 -> 10 -> 10]
      ok(Line.point.inside(posLine, 10))

      // [0 -> 0 -> -10]
      ok(Line.point.inside(negLine, 0))

      // [0 -> -5 -> -10]
      ok(Line.point.inside(negLine, -5))

      // [0 -> -10 -> -10]
      ok(Line.point.inside(negLine, -10))
    })

    it('1: خارج المستقيم', function () {
      // -1 -> [0 -> 10]
      ok(!Line.point.inside(posLine, -1))

      // [0 -> 10] -> 11
      ok(!Line.point.inside(posLine, 11))

      // 1 -> [0 -> -10]
      ok(!Line.point.inside(negLine, 1))

      // [0 -> -10] -> -11
      ok(!Line.point.inside(negLine, -11))
    })
  })

  describe('move', function () {
    afterEach(function () {
      posLine.start = 0
      posLine.end = 10
      negLine.start = 0
      negLine.end = -10
    })

    it('1: عكس المستقيم', function () {
      // [0 -> 10] => [10 -> 0]

      let l = Line.point.move.flip(posLine)
      equal(l.start, 10)
      equal(l.end, 0)

      // [0 -> -10] => [-10 -> 0]

      l = Line.point.move.flip(negLine)
      equal(l.start, -10)
      equal(l.end, 0)
    })

    it('2: تحديث موضع البداية فقط', function () {
      // [0 -> 10] => [-5 -> 10]

      let l = Line.point.move(posLine, -5, { type: 'by', target: 'start' })

      equal(l.start, -5)
      equal(l.end, 10)

      // [-5 -> 10] => [20 -> 10]

      l = Line.point.move(l, 20, { type: 'to', target: 'start' })
      equal(l.start, 20)
      equal(l.end, 10)

      // [0 -> -10] => [5 -> -10]

      l = Line.point.move(negLine, 5, { type: 'by', target: 'start' })

      equal(l.start, 5)
      equal(l.end, -10)

      // [5 -> -10] => [-20 -> -10]

      l = Line.point.move(l, -20, { type: 'to', target: 'start' })
      equal(l.start, -20)
      equal(l.end, -10)
    })

    it('3: تحديث موضع النهاية فقط', function () {
      // [0 -> 10] => [0 -> 5]

      let l = Line.point.move(posLine, -5, { type: 'by', target: 'end' })
      equal(l.start, 0)
      equal(l.end, 5)

      // [0 -> 5] => [0 -> 20]

      l = Line.point.move(l, 20, { type: 'to', target: 'end' })
      equal(l.start, 0)
      equal(l.end, 20)

      // [0 -> -10] => [0 -> -5]

      l = Line.point.move(negLine, 5, { type: 'by', target: 'end' })
      equal(l.start, 0)
      equal(l.end, -5)

      // [0 -> -5] => [0 -> -20]

      l = Line.point.move(l, -20, { type: 'to', target: 'end' })
      equal(l.start, 0)
      equal(l.end, -20)
    })

    it('4: تحديث موضع البداية والنهاية معاً', function () {
      // [0 -> 10] => [-5 -> 5]

      let l = Line.point.move(posLine, -5, { type: 'by', target: 'both' })
      equal(l.start, -5)
      equal(l.end, 5)

      // [-5 -> 5] => [20 -> 20]

      l = Line.point.move(l, 20, { type: 'to', target: 'both' })
      equal(l.start, 20)
      equal(l.end, 20)

      // [0 -> -10] => [5 -> -5]

      l = Line.point.move(negLine, 5, { type: 'by', target: 'both' })
      equal(l.start, 5)
      equal(l.end, -5)

      // [5 -> -5] => [-20 -> -20]

      l = Line.point.move(l, -20, { type: 'to', target: 'both' })
      equal(l.start, -20)
      equal(l.end, -20)
    })
  })

  describe('ride', function () {
    describe('3: حرّك القيمة على المستقيم الموجب', function () {
      it('1: خطوة صفر', function () {
        // [0 -> +5 -> +10] 0>> = [0 -> +5 -> +10]

        let p = Line.point.ride(posLine, posCurrent, 0)
        equal(p, +5)

        // [0 -> -5 -> -10] 0>> = [0 -> -5 -> -10]

        p = Line.point.ride(negLine, negCurrent, 0)
        equal(p, -5)
      })

      it('2: الحركة للأمام داخل النطاق', function () {
        // [0 -> +5 -> +10] 3>> = [0 -> +8 -> +10]

        let p = Line.point.ride(posLine, posCurrent, 3)
        equal(p, +8)

        // [0 -> -5 -> -10] 3>> = [0 -> -8 -> -10]

        p = Line.point.ride(negLine, negCurrent, 3)
        equal(p, -8)
      })

      it('3: عدم تجاوز الحد الأقصى', function () {
        // [0 -> +5 -> +10] 10>> = [0 -> +10 -> +10]

        let p = Line.point.ride(posLine, posCurrent, 10)
        equal(p, +10)

        // [0 -> -5 -> -10] 10>> = [0 -> -10 -> -10]

        p = Line.point.ride(negLine, negCurrent, 10)
        equal(p, -10)
      })

      it('4: الحركة للخلف داخل النطاق', function () {
        // [0 -> +5 -> +10] <<3 = [0 -> +2 -> +10]

        let p = Line.point.ride(posLine, posCurrent, 3, true)
        equal(p, +2)

        // [0 -> -5 -> -10] <<3 = [0 -> -2 -> -10]

        p = Line.point.ride(negLine, negCurrent, 3, true)
        equal(p, -2)
      })

      it('5: عدم تجاوز الحد الأدنى', function () {
        // [0 -> +5 -> +10] <<10 = [0 -> +0 -> +10]

        let p = Line.point.ride(posLine, posCurrent, 10, true)
        equal(p, 0)

        // [0 -> -5 -> -10] <<10 = [0 -> 0 -> -10]

        p = Line.point.ride(negLine, negCurrent, 10, true)
        equal(p, 0)
      })
    })
  })
}
