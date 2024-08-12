/** @typedef {import('../options.js').Line} Line */
/** @typedef {import("../options.js").Point} Point */
/** @typedef {import("../options.js").PosAssignOptions} PosAssignOptions */

import { from } from './time.js'

/**
 * يتحقق ما إذا كانت النقطة داخل نقاط المستقيم
 * @param {Line} line - المستقيم المراد التحقق عليه
 * @param {Point} point - النقطة المراد التحقق منها
 * @returns {boolean} - يعيد صحيح إذا كانت النقطة داخل المستقيم، خلاف ذلك يعيد خطأ
 * @example
 * const line = Line.create.one({ end: 10 })
 * const pointInLine = inside(line, 5)
 * // pointInLine = true
 * @example
 * const line = Line.create.one({ end: 10 })
 * const pointInLine = inside(line, 15)
 * // pointInLine = false
 */
export function inside(line, point) {
  // أعد صحيح إذا كانت النقطة داخل النطاق
  return point >= from.min(line) && point <= from.max(line)
}

/**
 * يحرك النقطة على طول المستقيم
 * @param {Line} line - المستقيم المراد التحرك عليه
 * @param {Point} current - الموضع الحالي
 * @param {Point} step - مقدار الخطوة الواحدة للتحرك بها
 * @param {boolean} [inverse=false] - عكس إتجاه الحركة على المستقيم. @defaultValue false
 * @returns {Point} يعيد الموضع الجديد بعد التحرك
 * @example <caption>تحريك النقطة للأمام على مستقيم موجب</caption>
 * const line = Line.create.one({ end: 10 })
 * const newCurrent = ride(line, 3, 2)
 * // newCurrent = 5
 * @example <caption>تحريك النقطة للخلف على مستقيم موجب</caption>
 * const line = Line.create.one({ end: 10 })
 * const newCurrent = ride(line, 3, 2, true)
 * // newCurrent = 1
 * @example <caption>تحريك النقطة للأمام على مستقيم سالب</caption>
 * const line = Line.create.one({ end: -10 })
 * const newCurrent = ride(line, -3, 2)
 * // newCurrent = -1
 * @example <caption>تحريك النقطة للخلف على مستقيم سالب</caption>
 * const line = Line.create.one({ end: -10 })
 * const newCurrent = ride(line, -3, 2, true)
 * // newCurrent = -5
 */
export function ride(line, current, step, inverse = false) {
  // إذا كانت الخطوة تساوي صفرًا، أعد الموضع الحالي دون تغييره
  if (step === 0) return current

  // تحقق مما إذا كان إتجاه الحركة معكوساً على مستقيم سالب.
  // إذا تطابقت، زد الموضع الحالي بالخطوة ولكن لا تتجاوز القيمة القصوى
  // إذا لم تتطابق، قلل الموضع الحالي بالخطوة ولكن لا تنزل تحت القيمة الدنيا
  return inverse === line.neg
    ? // إذا كانت الحركة للأمام على مستقيم موجب أو للخلف على مستقيم سالب، تحرك خطوة بالموجب دون تجاوز القيمة القصوى
      Math.min(current + step, from.max(line))
    : // إذا كانت الحركة للأمام على مستقيم سالب أو للخلف على مستقيم موجب، تحرك خطوة بالسالب دون تجاوز القيمة الدنيا
      Math.max(current - step, from.min(line))
}

/**
 * يقوم بتحديث موضع الخط بناءً على القيمة والخيارات المعطاة
 * @param {Line} line - كائن الخط الذي سيتم تحديثه
 * @param {Point} value - القيمة التي سيتم تحديث الخط بها
 * @param {PosAssignOptions} options - الخيارات لتعيين الموضع
 * @returns {Line} - كائن الخط المحدّث
 */
export function move(line, value, { type = 'to', target = 'both' }) {
  if (target === 'end') {
    // تحديث موضع النهاية فقط للخط
    line.end = type === 'to' ? value : line.end + value
  } else if (target === 'start') {
    // تحديث موضع البداية فقط للخط
    const temp = line.end
    line.start = type === 'to' ? value : line.start + value
    line.end = temp
  } else if (target === 'both') {
    // تحديث موضعي البداية والنهاية للخط
    if (type === 'by') line.start = line.start + value
    else if (type === 'to') {
      line.start = value
      line.end = value
    }
  }

  return line // إرجاع كائن الخط المحدّث
}

/**
 * يقوم بعكس موضعي البداية والنهاية للخط
 * @param {Line} line - كائن الخط الذي سيتم عكسه
 * @returns {Line} - كائن الخط المعكوس
 */
move.flip = function (line) {
  const temp = line.start // تخزين موضع البداية مؤقتاً
  move(line, line.end, { type: 'to', target: 'start' }) // تعيين موضع البداية إلى موضع النهاية
  move(line, temp, { type: 'to', target: 'end' }) // تعيين موضع النهاية إلى موضع البداية الأصلي

  return line // إرجاع كائن الخط المعكوس
}
