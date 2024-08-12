# JavaScript (JS)

تطبيق إحترافي لأنظمة الألعاب بلغة جافاسكربت بأسلوب سهل الإستخدام، يمكن تحميل جميل الملفات من مستودع الكود المصدري على [GitHub](https://github.com/Anthima-Alaab/JavaScript) ثم استيراد الكود من الملف `JavaScript-main/src/exports.js`

# المستقيم
## نظرة عامة

هذه الأداة مصممة لتسهيل عملية تطوير الألعاب من خلال توفير أدوات ووسائل لحساب وتحريك النقاط على مستقيمات محددة. تهدف الأداة إلى تبسيط العمليات الرياضية المعقدة التي يحتاجها مطورو الألعاب لإنشاء حركات ونقاط دقيقة في ألعابهم.

## حالات الاستخدام
### التحقق من نقاط داخل المستقيم
يمكن استخدام هذه الأداة للتحقق مما إذا كانت نقطة معينة تقع داخل نطاق مستقيم محدد، مما يساعد على التحكم في حركات الشخصيات أو العناصر في اللعبة.

### تحريك النقاط
توفر الأداة دوال لتحريك النقاط على طول المستقيم، سواء كان التحرك للأمام أو للخلف، وتحديد الاتجاه الصحيح للحركة بناءً على خصائص المستقيم.

### إنشاء مستقيمات ونقاط
يمكن استخدام الأداة لإنشاء مستقيمات بنقاط محددة بناءً على خيارات مختلفة مثل المسافة، عدد النقاط، والتباعد بين النقاط، مما يساعد في تخطيط مسارات الحركة بدقة.

## أمثلة الاستخدام
### التحقق من وجود نقطة داخل المستقيم
```javascript
import { Line } from './JavaScript-main/src/exports.js'

const line = Line.create.one({ end: 10 });
const pointInLine = inside(line, 5);
// pointInLine = true

const pointInLine = inside(line, 15);
// pointInLine = false
```

### تحريك النقطة على طول المستقيم
```javascript
import { Line } from './JavaScript-main/src/exports.js'

const line = Line.create.one({ end: 10 });
const newCurrent = ride(line, 3, 2);
// newCurrent = 5

const newCurrent = ride(line, 3, 2, true);
// newCurrent = 1
```

### إنشاء مستقيم مع نقاط محددة
```javascript
import { Line } from './JavaScript-main/src/exports.js'

const line = Line.create.one({ end: -10 });
// line = { neg: true, count: 2, dis: 10, spacing: 10, end: -10, points: [0, -10] }

const line = Line.create.one({ end: -10, count: 3 });
// line = { neg: true, count: 3, dis: 10, spacing: 5, end: -10, points: [0, -5, -10] }
```

### حساب نسبة النقطة على المستقيم
```javascript
import { Line } from './JavaScript-main/src/exports.js'

const line = Line.create.one({ end: 10 });
const t = Line.time.to(line, 5);
// t = 0.5

const t = Line.time.to.clamp(line, 15);
// t = 1
```

هذه الأداة تقدم لمطوري الألعاب وسيلة قوية ومرنة لإدارة النقاط والحركات في ألعابهم، مما يسهم في تحسين تجربة اللعب ودقة الحركات والعناصر داخل اللعبة.
