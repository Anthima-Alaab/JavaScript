/** @typedef {import("./imports.js").Point} Point */

export {}

/**
 * خيارات إنشاء مستقيم
 * @typedef {object} LineOptions
 * @property {Point} [dis] - المسافة
 * @property {Point} [end] - نقطة النهاية
 * @property {Point} [spacing] - التباعد بين النقاط
 * @property {Point[]} [points] - النقاط المحددة على المستقيم
 * @property {number} [count] - عدد النقاط على المستقيم، يشمل النقطة الأولى والأخيرة
 * @property {boolean} [neg] - قيمة تخبر إذا كان المستقيم موجباً أم سالباً
 */

/**
 * كائن يمثل مستقيماً
 * @typedef {object} Line
 * @property {Point} dis - المسافة
 * @property {Point} spacing - التباعد بين النقاط
 * @property {number} count - عدد النقاط على المستقيم، يشمل النقطة الأولى والأخيرة
 * @property {boolean} neg - قيمة تخبر إذا كان المستقيم موجباً أم سالباً
 * @property {Readonly<Point>} end - نقطة النهاية
 * @property {Readonly<Point>} min - النقطة على طرف المستقيم الأدنى
 * @property {Readonly<Point>} max - النقطة على طرف المستقيم الأقصى
 * @property {Readonly<Point[]>} points - النقاط المحددة على المستقيم
 */
