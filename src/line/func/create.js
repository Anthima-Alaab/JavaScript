/** @typedef {import('../options.js').Line} Line */
/** @typedef {import('../options.js').LineOptions} LineOptions */
/** @typedef {import('../options.js').PointsOptions} PointsOptions */
/** @typedef {import("../imports.js").Point.Point} Point */

/**
 * إنشاء كائن مستقيم بناءً على الخيارات المقدمة
 * @param {LineOptions} options @defaultValue { dis: 1, count: 2, neg: false }
 * @returns {Line}
 * @throws إذا كانت الخيارات غير صالحة
 * @example
 * const line = Line.create.one({})
 * // line = { neg: false, start: 0, dis: 1, spacing: 1, count: 2, end: 1, min: 0, max: 1, points: [0, 1] }
 * @example
 * const line = Line.create.one({ points: [0, -5, -10] })
 * // line = { neg: true, start: 0, dis: 10, spacing: 5, count: 3, end: -10, min: -10, max: 0, points: [0, -5, -10] }
 * @example
 * const line = Line.create.one({ start: 0, end: -10, count: 3 })
 * // line = { neg: true, start: 0, dis: 10, spacing: 5, count: 3, end: -10, min: -10, max: 0, points: [0, -5, -10] }
 * @example
 * const line = Line.create.one({ start: 0, dis: 10, count: 3, neg: true })
 * // line = { neg: true, start: 0, dis: 10, spacing: 5, count: 3, end: -10, min: -10, max: 0, points: [0, -5, -10] }
 * @example
 * const line = Line.create.one({ start: 0, spacing: 5, count: 3, neg: true })
 * // line = { neg: true, start: 0, dis: 10, spacing: 5, count: 3, end: -10, min: -10, max: 0, points: [0, -5, -10] }
 * @example
 * const line = Line.create.one({ start: 0, spacing: 5, dis: 10, neg: true })
 * // line = { neg: true, start: 0, dis: 10, spacing: 5, count: 3, end: -10, min: -10, max: 0, points: [0, -5, -10] }
 */
export function one({ points, end, dis, spacing, start = 0, count = 2, neg = false }) {
  // التحقق من القيم المقدمة
  if (dis < 0) throw new Error('يجب أن تكون المسافة موجباً')
  if (spacing < 0) throw new Error('يجب أن يكون التباعد موجباً')
  if (count < 2) throw new Error('يجب أن يكون عدد النقاط أكبر من أو يساوي 2')

  // تهيئة كائن المستقيم
  /** @type {Line} */
  const l = {}

  if (points !== undefined) {
    const end = points[points.length - 1]

    l.start = points[0]
    l.count = points.length
    l.neg = end < l.start
    l.dis = l.neg ? l.start - end : end - l.start
  } else {
    l.start = start
    l.neg = end !== undefined ? end < l.start : neg
    l.count = spacing !== undefined && dis !== undefined ? dis / spacing + 1 : count
    l.dis =
      end !== undefined
        ? // ? Math.abs(l.start - end)
          l.neg
          ? l.start - end
          : end - l.start
        : spacing !== undefined
        ? spacing * (l.count - 1)
        : dis !== undefined
        ? dis
        : 1
  }

  // تعريف الخصائص المحسوبة
  Object.defineProperties(l, {
    spacing: {
      get() {
        return this.dis / (this.count - 1)
      },
      set(value) {
        this.dis = value * (this.count - 1)
        this.count = this.dis / value + 1
      }
    },
    end: {
      get() {
        return this.neg ? this.start - this.dis : this.start + this.dis
      },
      set(value) {
        this.neg = value < this.start
        // this.dis = Math.abs(this.start - value)
        this.dis = this.neg ? this.start - value : value - this.start
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
        return Array.from({ length: this.count }, (_, i) => this.start + this.spacing * i * (this.neg ? -1 : 1))
      }
    }
  })

  // @ts-ignore
  return l
}

/**
 * حساب مواضع جميع النقاط على الخط، مع ضبط اختياري للفواصل
 * @param {PointsOptions} options عدد النقاط @defaultValue { spacing: 1, count: 2, sort: zero }
 * @returns {Point[]} مصفوفة من المواضع لكل نقطة على المستقيم
 * @throws إذا كان الخيار المقدم للترتيب غير صالح
 * @example
 * const points = Line.create.points({ count: 5, spacing: 2, sort: 'zero'})
 * // points = [0, 2, -2, 4, -4] ('zero' sort)
 * // points = [-4, -2, 0, 2, 4] ('neg' sort)
 * // points = [4, 2, 0, -2, -4] ('pos' sort)
 */
export function points({ count = 2, spacing = 1, sort = 'zero' }) {
  // تهيئة مصفوفة لتخزين المواضع المحسوبة لكل نقطة
  /** @type {Point[]} */
  const points = new Array(count)
  // تحديد ما إذا كان العدد الكلي للنقاط زوجياً
  const isEven = count % 2 === 0
  if (!isEven) points[0] = 0

  let j = isEven ? 0 : 1
  const halfSpacing = isEven ? spacing * 0.5 : 0
  // التكرار على كل نقطة لحساب موضعها
  for (let i = j; i < count; i += 2) {
    // حساب موضع النقطة الحالية وتعيينها في المصفوفة
    points[i] = spacing * j + halfSpacing
    points[i + 1] = spacing * -j - halfSpacing

    j++
  }

  // إرجاع المصفوفة التي تحتوي على جميع المواضع المحسوبة
  if (sort === 'zero') return points
  if (sort === 'neg') return points.sort((a, b) => a - b)
  if (sort === 'pos') return points.sort((a, b) => b - a)
  throw new Error('خيار ترتيب غير صالح')
}
