/** @typedef {import('../options.js').Line} Line */
/** @typedef {import('../options.js').LineOptions} LineOptions */
/** @typedef {import("../imports.js").Point} Point */

/**
 * إنشاء كائن مستقيم بناءً على الخيارات المقدمة
 * @param {LineOptions} options
 * @returns {Line}
 */
export function one({ dis, end, neg = false, count, spacing }) {
  // التحقق من القيم المقدمة
  if (dis !== undefined && dis < 0)
    throw new Error('يجب أن تكون المسافة موجباً')
  if (spacing !== undefined && spacing < 0)
    throw new Error('يجب أن يكون التباعد موجباً')
  if (count !== undefined && count < 2)
    throw new Error('يجب أن يكون عدد النقاط أكبر من أو يساوي 2')

  // تهيئة كائن المستقيم
  const l = { neg }

  // حساب الخصائص بناءً على الخيارات المقدمة
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
  } else throw new Error('الحالة غير مغطاة')

  // تعريف الخصائص المحسوبة
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
 * حساب مواضع جميع النقاط على الخط، مع ضبط اختياري للفواصل
 * @param {Point} count عدد النقاط
 * @param {Point} [spacing=1] الفاصل المطبق على موضع كل نقطة. @default 1
 * @param {'zero' | 'negative' | 'positive'} [sort='zero'] ترتيب النقاط. @default 'zero'
 * @returns {Point[]} مصفوفة من المواضع لكل نقطة على المستقيم
 */
export function points(count, spacing = 1, sort = 'zero') {
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
  if (sort === 'negative') return points.sort((a, b) => a - b)
  if (sort === 'positive') return points.sort((a, b) => b - a)
  throw new Error('خيار ترتيب غير صالح')
}
