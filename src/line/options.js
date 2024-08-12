/** @typedef {import("./imports.js").Point.Point} Point */

export {}

/**
 * خيارات تعيين الموضع
 * @typedef {object} PosAssignOptions
 * @property {'to' | 'by'} type - نوع تعيين الموضع
 * @property {'start' | 'end' | 'both'} target - الهدف المراد تعيين موضعه
 */

/**
 * خيارات إنشاء نقاط
 *
 * يمكن إنشاء المستقيم بإحدى الطرق التالية:
 * - لا شيء
 * - start, end, count
 * - start, neg, dis, count
 * - start, neg, spacing, count
 * - start, neg, spacing, dis
 * - points
 * @typedef {object} PointsOptions
 * @property {Point} [spacing] - التباعد بين النقاط
 * @property {number} [count] - عدد النقاط على المستقيم، يشمل النقطة الأولى والأخيرة
 * @property {'zero' | 'neg' | 'pos'} [sort] - ترتيب النقاط
 */

/**
 * خيارات إنشاء مستقيم
 * @typedef {object} LineOptions
 * @property {Point} [start] - نقطة البداية
 * @property {Point} [end] - نقطة النهاية
 * @property {Point} [dis] - المسافة
 * @property {Point} [spacing] - التباعد بين النقاط
 * @property {number} [count] - عدد النقاط على المستقيم، يشمل النقطة الأولى والأخيرة
 * @property {boolean} [neg] - قيمة تخبر إذا كان المستقيم موجباً أم سالباً
 * @property {Point[]} [points] - النقاط المحددة على المستقيم
 */

/**
 * كائن يمثل مستقيماً
 * @typedef {object} Line
 * @property {Point} start - نقطة البداية
 * @property {Point} end - نقطة النهاية
 * @property {Point} dis - المسافة
 * @property {Point} spacing - التباعد بين النقاط
 * @property {number} count - عدد النقاط على المستقيم، يشمل النقطة الأولى والأخيرة
 * @property {boolean} neg - قيمة تخبر إذا كان المستقيم موجباً أم سالباً
 * @property {Readonly<Point[]>} points - النقاط المحددة على المستقيم
 */
