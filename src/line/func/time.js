/** @typedef {import('../options.js').Line} Line */
/** @typedef {import("../imports.js").Point} Point */

/**
 * تحويل قيمة نقطة إلى نسبة مئوية على مستقيم
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
export function to({ dis, neg, end }, point) {
  // إذا كانت النقطة عند البداية، إرجاع 0 إذا لم يكن سالباً، وإرجاع 1 إذا كان سالباً
  if (point === 0) return neg ? 1 : 0
  // إذا كانت النقطة عند النهاية، إرجاع 1 إذا لم يكن سالباً، وإرجاع 0 إذا كان سالباً
  if (point === end) return neg ? 0 : 1
  // حساب النسبة المئوية للنقطة على المستقيم
  return (point / dis) * (neg ? -1 : 1)
}

/**
 * تقييد قيمة النقطة بين 0 و 1
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
to.clamp = function (line, point) {
  // إذا كانت النقطة أكبر من الحد الأقصى، إرجاع 1
  if (point >= line.max) return 1
  // إذا كانت النقطة أقل من الحد الأدنى، إرجاع 0
  if (point <= line.min) return 0
  // حساب النسبة المئوية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تقييد قيمة النقطة لتكون أكبر من الحد الأدنى
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
to.clamp.min = function (line, point) {
  // إذا كانت النقطة أقل من الحد الأدنى، إرجاع 0
  if (point <= line.min) return 0
  // حساب النسبة المئوية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تقييد قيمة النقطة لتكون أقل من الحد الأقصى
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
to.clamp.max = function (line, point) {
  // إذا كانت النقطة أكبر من الحد الأقصى، إرجاع 1
  if (point >= line.max) return 1
  // حساب النسبة المئوية المقيدة للنقطة على المستقيم
  return to(line, point)
}

/**
 * تحويل نسبة مئوية إلى نقطة على المستقيم
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 */
export function from(line, t) {
  // إذا كانت النسبة 1، إرجاع الحد الأقصى
  if (t === 1) return from.max(line)
  // إذا كانت النسبة 0، إرجاع الحد الأدنى
  if (t === 0) return from.min(line)

  const { dis, neg } = line
  // حساب النقطة بناءً على النسبة المئوية
  if (neg) return -(dis - dis * t)
  else return dis * t
}

/**
 * تقييد النسبة المئوية بين 0 و 1
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 */
from.clamp = function (line, t) {
  // إذا كانت النسبة أكبر من أو تساوي 1، إرجاع الحد الأقصى
  if (t >= 1) return from.max(line)
  // إذا كانت النسبة أقل من أو تساوي 0، إرجاع الحد الأدنى
  if (t <= 0) return from.min(line)
  // حساب النقطة بناءً على النسبة المئوية المقيدة
  return from(line, t)
}

/**
 * تقييد النسبة المئوية لتكون أقل من أو تساوي 1
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 */
from.clamp.max = function (line, t) {
  // إذا كانت النسبة أكبر من أو تساوي 1، إرجاع الحد الأقصى
  if (t >= 1) return from.max(line)
  // حساب النقطة بناءً على النسبة المئوية
  return from(line, t)
}

/**
 * تقييد النسبة المئوية لتكون أكبر من أو تساوي 0
 * @param {Line} line
 * @param {Point} t بين 0 و 1، شامل ال1
 * @returns {Point}
 */
from.clamp.min = function (line, t) {
  // إذا كانت النسبة أقل من أو تساوي 0، إرجاع الحد الأدنى
  if (t <= 0) return from.min(line)
  // حساب النقطة بناءً على النسبة المئوية
  return from(line, t)
}

/**
 * إرجاع النقطة عند منتصف المستقيم
 * @param {Line} line
 * @returns {Point}
 */
from.center = function (line) {
  return from(line, 0.5)
}

/**
 * إرجاع الحد الأدنى للنقطة على المستقيم
 * @param {Line} line
 * @returns {Point}
 */
from.min = function ({ dis, neg }) {
  // note: أسرع من استدعاء `from(line, 0)`
  return neg ? -dis : 0
}

/**
 * إرجاع الحد الأقصى للنقطة على المستقيم
 * @param {Line} line
 * @returns {Point}
 */
from.max = function ({ dis, neg }) {
  // note: أسرع من استدعاء `from(line, 1)`
  return neg ? 0 : dis
}
