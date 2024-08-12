/** @typedef {import('../options.js').Line} Line */
/** @typedef {import("../imports.js").Point.Point} Point */

/**
 * تحويل قيمة نقطة إلى نسبة أحادية على مستقيم
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.to(line, 5)
 * // t = 0.5
 * @example
 * const line = Line.create.one({ end: -10 })
 * const t = Line.time.to(line, -5)
 * // t = 0.5
 */
export function to({ dis, neg, end }, point) {
  // إذا كانت النقطة عند البداية، إرجاع 0 إذا لم يكن سالباً، وإرجاع 1 إذا كان سالباً
  if (point === 0) return neg ? 1 : 0
  // إذا كانت النقطة عند النهاية، إرجاع 1 إذا لم يكن سالباً، وإرجاع 0 إذا كان سالباً
  if (point === end) return neg ? 0 : 1
  // حساب النسبة الأحادية للنقطة على المستقيم
  return neg ? -(point / dis) : point / dis
}

/**
 * تقييد قيمة النقطة بين 0 و 1
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.to(line, 15)
 * // t = 1
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.to.clamp(line, -5)
 * // t = 0
 */
to.clamp = function (line, point) {
  // إذا كانت النقطة أكبر من الحد الأقصى، إرجاع 1
  if (point >= from.max(line)) return 1
  // إذا كانت النقطة أقل من الحد الأدنى، إرجاع 0
  if (point <= from.min(line)) return 0
  // حساب النسبة الأحادية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تقييد قيمة النقطة لتكون أكبر من الحد الأدنى
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.to.clamp.min(line, -5)
 * // t = 0
 */
to.clamp.min = function (line, point) {
  // إذا كانت النقطة أقل من الحد الأدنى، إرجاع 0
  if (point <= from.min(line)) return 0
  // حساب النسبة الأحادية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تقييد قيمة النقطة لتكون أقل من الحد الأقصى
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.to.clamp.max(line, 15)
 * // t = 1
 */
to.clamp.max = function (line, point) {
  // إذا كانت النقطة أكبر من الحد الأقصى، إرجاع 1
  if (point >= from.max(line)) return 1
  // حساب النسبة الأحادية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تحويل نسبة أحادية إلى نقطة على المستقيم
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from(line, 0.5)
 * // t = 5
 * @example
 * const line = Line.create.one({ end: -10 })
 * const t = Line.time.from(line, 0.5)
 * // t = -5
 */
export function from(line, t) {
  // إذا كانت النسبة 1، إرجاع الحد الأقصى
  if (t === 1) return from.max(line)
  // إذا كانت النسبة 0، إرجاع الحد الأدنى
  if (t === 0) return from.min(line)

  const { start, dis, neg } = line

  // حساب النقطة بناءً على النسبة المئوية
  if (neg) return start - (dis - dis * t)
  else return start + dis * t
}

/**
 * تقييد النسبة الأحادية بين 0 و 1
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.clamp(line, 1.5)
 * // t = 10
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.clamp(line, -0.5)
 * // t = 0
 */
from.clamp = function (line, t) {
  // إذا كانت النسبة أكبر من أو تساوي 1، إرجاع الحد الأقصى
  if (t >= 1) return from.max(line)
  // إذا كانت النسبة أقل من أو تساوي 0، إرجاع الحد الأدنى
  if (t <= 0) return from.min(line)
  // حساب النقطة بناءً على النسبة الأحادية المقيدة
  return from(line, t)
}

/**
 * تقييد النسبة الأحادية لتكون أقل من أو تساوي 1
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.clamp.max(line, 1.5)
 * // t = 10
 */
from.clamp.max = function (line, t) {
  // إذا كانت النسبة أكبر من أو تساوي 1، إرجاع الحد الأقصى
  if (t >= 1) return from.max(line)
  // حساب النقطة بناءً على النسبة الأحادية
  return from(line, t)
}

/**
 * تقييد النسبة الأحادية لتكون أكبر من أو تساوي 0
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.clamp.min(line, -0.5)
 * // t = 0
 */
from.clamp.min = function (line, t) {
  // إذا كانت النسبة أقل من أو تساوي 0، إرجاع الحد الأدنى
  if (t <= 0) return from.min(line)
  // حساب النقطة بناءً على النسبة الأحادية
  return from(line, t)
}

/**
 * إرجاع النقطة عند منتصف المستقيم
 * @param {Line} line
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.center(line)
 * // t = 5
 */
from.center = function (line) {
  return from(line, 0.5)
}

/**
 * إرجاع الحد الأدنى للنقطة على المستقيم
 * @param {Line} line
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.min(line)
 * // t = 0
 */
from.min = function ({ start, dis, neg }) {
  // note: أسرع من استدعاء `from(line, 0)`
  return neg ? start - dis : start
}

/**
 * إرجاع الحد الأقصى للنقطة على المستقيم
 * @param {Line} line
 * @returns {Point}
 * @example
 * const line = Line.create.one({ end: 10 })
 * const t = Line.time.from.max(line)
 * // t = 10
 */
from.max = function ({ start, dis, neg }) {
  // note: أسرع من استدعاء `from(line, 1)`
  return neg ? start : start + dis
}
