/** @typedef {import('../options.js').Line} Line */
/** @typedef {import("../imports.js").Point} Point */

/**
 * يتحقق ما إذا كانت النقطة داخل نقاط المستقيم
 * @param {Line} line - المستقيم المراد التحقق عليه
 * @param {Point} point - النقطة المراد التحقق منها
 * @returns {boolean} - يعيد صحيح إذا كانت النقطة داخل المستقيم، خلاف ذلك يعيد خطأ
 */
export function inside({ min, max }, point) {
  // أعد صحيح إذا كانت النقطة داخل النطاق
  return point >= min && point <= max
}

/**
 * يحرك النقطة على طول المستقيم
 * @param {Line} line - المستقيم المراد التحرك عليه
 * @param {Point} current - الموضع الحالي
 * @param {Point} step - مقدار الخطوة الواحدة للتحرك بها
 * @param {boolean} [inverse=false] - عكس إتجاه الحركة على المستقيم. @default false
 * @returns {Point} - يعيد الموضع الجديد بعد التحرك
 */
export function move({ min, max, neg }, current, step, inverse = false) {
  // إذا كانت الخطوة تساوي صفرًا، أعد الموضع الحالي دون تغييره
  if (step === 0) return current

  // تحقق مما إذا كان إتجاه الحركة معكوساً على مستقيم سالب.
  // إذا تطابقت، زد الموضع الحالي بالخطوة ولكن لا تتجاوز القيمة القصوى
  // إذا لم تتطابق، قلل الموضع الحالي بالخطوة ولكن لا تنزل تحت القيمة الدنيا
  return inverse === neg
    ? Math.min(current + step, max) // إذا كانت الحركة للأمام على مستقيم موجب أو للخلف على مستقيم سالب، تحرك خطوة بالموجب دون تجاوز القيمة القصوى
    : Math.max(current - step, min) // إذا كانت الحركة للأمام على مستقيم سالب أو للخلف على مستقيم موجب، تحرك خطوة بالسالب دون تجاوز القيمة الدنيا
}
