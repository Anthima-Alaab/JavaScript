import { equal } from 'assert/strict'
import { Line } from '../../../src/exports.js'

let line

export default function () {
  describe('1: الحصول على وقت النقطة على مستقيم موجب', function () {
    before(function () {
      line = Line.create.one({ dis: 4 })
    })

    it('1.1: قيمة المنتصف', function () {
      // 2 / 4 = 0.5

      const t = Line.time.to(line, 2)
      equal(t, 0.5)
    })

    it('1.2: القيمة الأدنى', function () {
      // 0 / 4 = 0

      const t = Line.time.to(line, 0)
      equal(t, 0)
    })

    it('1.3: القيمة القصوى', function () {
      // 4 / 4 = 1

      const t = Line.time.to(line, 4)
      equal(t, 1)
    })
  })

  describe('2: الحصول على وقت النقطة على مستقيم سالب', function () {
    before(function () {
      line = Line.create.one({ dis: 4, neg: true })
    })

    it('2.1: قيمة المنتصف', function () {
      // 1 - (-2 / -4) = 1 - 0.5 = 0.5

      const t = Line.time.to(line, -2)
      equal(t, 0.5)
    })

    it('2.2: القيمة الأدنى', function () {
      // 1 - (-4 / -4) = 1 - 1 = 0

      const t = Line.time.to(line, -4)
      equal(t, 0)
    })

    it('2.3: القيمة القصوى', function () {
      // 1 - (0 / -4) = 1 - 0 = 1

      const t = Line.time.to(line, 0)
      equal(t, 1)
    })
  })

  describe('3: الحصول على نقطة الوقت على مستقيم موجب', function () {
    before(function () {
      line = Line.create.one({ dis: 6 })
    })

    it('3.1: قيمة المنتصف', function () {
      // 6 * 0.5 = 3

      let p = Line.time.from(line, 0.5)
      equal(p, 3)

      p = Line.time.from.center(line)
      equal(p, 3)
    })

    it('3.2: القيمة الأدنى', function () {
      // 6 * 0 = 0

      const p = Line.time.from(line, 0)
      equal(p, 0)
    })

    it('3.3: القيمة القصوى', function () {
      // 6 * 1 = 6

      const p = Line.time.from(line, 1)
      equal(p, 6)
    })

    it('3.4: أصغر من القيمة الأدنى', function () {
      // 6 * -1 = -6

      const p = Line.time.from(line, -1)
      equal(p, -6)
    })

    it('3.5: أكبر من القيمة القصوى', function () {
      // 6 * 2 = 12

      const p = Line.time.from(line, 2)
      equal(p, 12)
    })

    it('3.6: التثبيت عند الحد الأدنى', function () {
      // 6 * min(-1) = 6 * 0 = -0

      let p = Line.time.from.clamp.min(line, -1)
      equal(p, 0)

      p = Line.time.from.clamp(line, -1)
      equal(p, 0)
    })

    it('3.7: التثبيت عند الحد الأقصى', function () {
      // 6 * max(2) = 6 * 1 = 6

      let p = Line.time.from.clamp.max(line, 2)
      equal(p, 6)

      p = Line.time.from.clamp(line, 2)
      equal(p, 6)
    })
  })

  describe('4: الحصول على نقطة الوقت على مستقيم سالب', function () {
    before(function () {
      line = Line.create.one({ dis: 7, neg: true })
    })

    it('4.1: قيمة المنتصف', function () {
      // -(7 - (7 * 0.5)) = -(7 - 3.5) = -3.5

      let p = Line.time.from(line, 0.5)
      equal(p, -3.5)

      p = Line.time.from.center(line)
      equal(p, -3.5)
    })

    it('4.2: القيمة الأدنى', function () {
      // -(7 - (7 * 0)) = -(7 - 0) = -7

      const p = Line.time.from(line, 0)
      equal(p, -7)
    })

    it('4.3: القيمة القصوى', function () {
      // -(7 - (7 * 1)) = -(7 - 7) = -0

      const p = Line.time.from(line, 1)
      equal(p, 0)
    })

    it('4.4: أصغر من القيمة الأدنى', function () {
      // -(7 - (7 * -1)) = -(7 + 7) = -14

      const p = Line.time.from(line, -1)
      equal(p, -14)
    })

    it('4.5: أكبر من القيمة القصوى', function () {
      // -(7 - (7 * 2)) = -(7 - 14) = 7

      const p = Line.time.from(line, 2)
      equal(p, 7)
    })

    it('4.6: التثبيت عند الحد الأدنى', function () {
      // -(7 - (7 * min(-1))) = -(7 - (7 * 0)) = -(7 - 0) = -7

      let p = Line.time.from.clamp.min(line, -1)
      equal(p, -7)

      p = Line.time.from.clamp(line, -1)
      equal(p, -7)
    })

    it('4.7: التثبيت عند الحد الأقصى', function () {
      // -(7 - (7 * max(2))) = -(7 - (7 * 1)) = -(7 - 7) = -0

      let p = Line.time.from.clamp.max(line, 2)
      equal(p, 0)

      p = Line.time.from.clamp(line, 2)
      equal(p, 0)
    })
  })
}
