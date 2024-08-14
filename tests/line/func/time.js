import { equal } from 'assert/strict'
import { Line } from '../../../src/exports.js'

const posLine = Line.create.one({ start: 1, dis: 2 })
const negLine = Line.create.one({ start: -1, dis: 2, neg: true })

export default function () {
  describe('to', function () {
    it('1: التثبيت عند الحد الأدنى', function () {
      // [1 -> 0(1) -> 3]
      // (1 - 1) / 2 = 0

      let t = Line.time.to.clamp(posLine, 0)
      equal(t, 0)

      t = Line.time.to.clamp.min(posLine, 0)
      equal(t, 0)

      // [-1 -> 0(-1) -> -3]
      // -1 - -1 = -1 + 1 = 0
      // -(0 / 2) = -(-0) = 0

      t = Line.time.to.clamp(negLine, 0)
      equal(t, 0)

      t = Line.time.to.clamp.min(negLine, 0)
      equal(t, 0)
    })

    it('2: أصغر من الحد الأدنى', function () {
      // 0 -> [1 -> 3]
      // (0 - 1) / 2 = -0.5

      let t = Line.time.to(posLine, 0)
      equal(t, -0.5)

      // 0 -> [-1 -> -3]
      // 0 - -1 = 0 + 1 = 1
      // -(1 / 2) = -0.5

      t = Line.time.to(negLine, 0)
      equal(t, -0.5)
    })

    it('3: القيمة الدنيا', function () {
      // [1 -> 1 -> 3]
      // (1 - 1) / 2 = 0

      let t = Line.time.to(posLine, 1)
      equal(t, 0)

      // [-1 -> -1 -> -3]
      // -1 - -1 = -1 + 1 = 0
      // -(0 / 2) = -0 = 0

      t = Line.time.to(negLine, -1)
      equal(t, 0)
    })

    it('4: قيمة المنتصف', function () {
      // [1 -> 2 -> 3]
      // (2 - 1) / 2 = 0.5

      let t = Line.time.to(posLine, 2)
      equal(t, 0.5)

      // [-1 -> -2 -> -3]
      // -2 - -1 = -2 + 1 = -1
      // -(-1 / 2) = -(-0.5) = 0.5

      t = Line.time.to(negLine, -2)
      equal(t, 0.5)
    })

    it('5: القيمة القصوى', function () {
      // [1 -> 3 -> 3]
      // (3 - 1) / 2 = 1

      let t = Line.time.to(posLine, 3)
      equal(t, 1)

      // [-1 -> -3 -> -3]
      // -3 - -1 = -3 + 1 = -2
      // -(-2 / 2) = -(-1) = 1

      t = Line.time.to(negLine, -3)
      equal(t, 1)
    })

    it('6: أكبر من الحد الأقصى', function () {
      // [1 -> 3] -> 4
      // (4 - 1) / 2 = 1.5

      let t = Line.time.to(posLine, 4)
      equal(t, 1.5)

      // [-1 -> -3] -> -4
      // -4 - -1 = -4 + 1 = -3
      // -(-3 / 2) = -(-1.5) = 1.5

      t = Line.time.to(negLine, -4)
      equal(t, 1.5)
    })

    it('7: التثبيت عند الحد الأقصى', function () {
      // [1 -> 4(3) -> 3]
      // (3 - 1) / 2 = 1

      let t = Line.time.to.clamp(posLine, 4)
      equal(t, 1)

      t = Line.time.to.clamp.max(posLine, 4)
      equal(t, 1)

      // [-1 -> -4(-3) -> -3]
      // -3 - -1 = -3 + 1 = -2
      // -(-2 / 2) = -(-1) = 1

      t = Line.time.to.clamp(negLine, -4)
      equal(t, 1)

      t = Line.time.to.clamp.max(negLine, -4)
      equal(t, 1)
    })
  })

  describe('from', function () {
    it('1: التثبيت عند الحد الأدنى', function () {
      // [1 -> 3]
      // 1 + (min(-1) * 2) = 1 + (0 * 2) = 1 + 0 = 0

      let p = Line.time.from.clamp(posLine, -1)
      equal(p, 1)

      p = Line.time.from.clamp.min(posLine, -1)
      equal(p, 1)

      // [-1 -> -3]
      // -1 - (min(-1) * 2) = -1 - (0 * 2) = -1 - 0 = -1

      p = Line.time.from.clamp(negLine, -1)
      equal(p, -1)

      p = Line.time.from.clamp.min(negLine, -1)
      equal(p, -1)
    })

    it('2: أصغر من الحد الأدنى', function () {
      // [1 -> 3]
      // 1 + (-1 * 2) = 1 + -2 = -1

      let p = Line.time.from(posLine, -1)
      equal(p, -1)

      // [-1 -> -3]
      // -1 - (-1 * 2) = -1 - -2 = 1

      p = Line.time.from(negLine, -1)
      equal(p, 1)
    })

    it('3: القيمة الدنيا', function () {
      // [1 -> 3]
      // 1 + (0 * 2) = 1 + 0 = 1

      let p = Line.time.from(posLine, 0)
      equal(p, 1)

      // [-1 -> -3]
      // -1 - (0 * 2) = -1 - 0 = -1

      p = Line.time.from(negLine, 0)
      equal(p, -1)
    })

    it('4: قيمة المنتصف', function () {
      // [1 -> 3]
      // 1 + (0.5 * 2) = 1 + 1 = 2

      let p = Line.time.from(posLine, 0.5)
      equal(p, 2)

      p = Line.time.from.center(posLine)
      equal(p, 2)

      // [-1 -> -3]
      // -1 - (0.5 * 2) = -1 - 1 = -2

      p = Line.time.from(negLine, 0.5)
      equal(p, -2)

      p = Line.time.from.center(negLine)
      equal(p, -2)
    })

    it('5: القيمة القصوى', function () {
      // [1 -> 3]
      // 1 + (1 * 2) = 1 + 2 = 3

      let p = Line.time.from(posLine, 1)
      equal(p, 3)

      // [-1 -> -3]
      // -1 - (1 * 2) = -1 - 2 = -3

      p = Line.time.from(negLine, 1)
      equal(p, -3)
    })

    it('6: أكبر من الحد الأقصى', function () {
      // [1 -> 3]
      // 1 + (2 * 2) = 1 + 4 = 5

      let p = Line.time.from(posLine, 2)
      equal(p, 5)

      // [-1 -> -3]
      // -1 - (2 * 2) = -1 - 4 = -5

      p = Line.time.from(negLine, 2)
      equal(p, -5)
    })

    it('7: التثبيت عند الحد الأقصى', function () {
      // [1 -> 3]
      // 1 + (max(2) * 2) = 1 + (1 * 2) = 1 + 2 = 3

      let p = Line.time.from.clamp(posLine, 2)
      equal(p, 3)

      p = Line.time.from.clamp.max(posLine, 2)
      equal(p, 3)

      // [-1 -> -3]
      // -1 - (max(2) * 2) = -1 - (1 * 2) = -1 - 2 = -3

      p = Line.time.from.clamp(negLine, 2)
      equal(p, -3)

      p = Line.time.from.clamp.max(negLine, 2)
      equal(p, -3)
    })
  })
}
