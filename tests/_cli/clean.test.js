import { strictEqual } from 'assert'
import { cleanFile } from '../../cli/func/clean.js'

describe('1: تنظيف الأسطر', function () {
  it('1.1: تحويل التصدير إلى التصدير الافتراضي', function () {
    const a = cleanFile('export = example;')
    strictEqual(a, 'export default example;')
  })

  it('1.2: يجب أن يبقى التصدير كما هو', function () {
    const a = cleanFile('export * as Types from "./file/path.js";')
    strictEqual(a, 'export * as Types from "./file/path.js";')
  })

  it('1.3: تحويل نوع التصدير إلى إعلان نوع التصدير', function () {
    const a = cleanFile('export type exports = example;')
    strictEqual(a, 'export declare type exports = example;')
  })

  it('1.4: يجب أن يبقى التصدير كما هو', function () {
    const a = cleanFile('export { example };')
    strictEqual(a, 'export { example };')
  })

  it('1.5: يجب أن يبقى استيراد النوع كما هو', function () {
    const a = cleanFile('import type { example } from "./file/path.js";')
    strictEqual(a, 'import type { example } from "./file/path.js";')
  })

  it('1.6: تحويل نوع التصدير إلى إعلان نوع التصدير', function () {
    const a = cleanFile(
      'export type example = typeof import("./file/path.js");'
    )
    strictEqual(
      a,
      'export declare type example = typeof import("./file/path.js");'
    )
  })

  it('1.7: تحويل دالة التصدير إلى دالة إعلان التصدير', function () {
    const a =
      cleanFile(`export function (...args: example[][], ...args2: example[example][], ...args3: example[][][]) :
    | Promise<import("file/path.js").example | void>
    | example
    | void { }`)
    strictEqual(
      a,
      `import type { example } from "file/path.js";

export declare function (...args: example[], ...args2: example[example], ...args3: example[][]) :
    | Promise<example | void>
    | example
    | void { }`
    )
  })

  it('1.8: تحويل تعداد التصدير إلى تعداد إعلان التصدير', function () {
    const a = cleanFile(`export enum Example = {
  other: import("../file/path.js").OtherExample;
};`)
    strictEqual(
      a,
      `import type { OtherExample } from "../file/path.js";

export declare enum Example = {
  other: OtherExample;
};`
    )
  })

  it('1.9: تحويل نوع التصدير إلى إعلان نوع التصدير مع تعليق', function () {
    const a = cleanFile(
      `export type Example = {
  /**
   * pretend to be a useful comment
   */
  some?: import("../file/path.js").SomeExample;
};`
    )
    strictEqual(
      a,
      `import type { SomeExample } from "../file/path.js";

export declare type Example = {
  /**
   * pretend to be a useful comment
   */
  some?: SomeExample;
};`
    )
  })

  it('1.10: تحويل نوع التصدير إلى إعلان نوع التصدير مع استيراد', function () {
    const a = cleanFile(
      'export declare type Example = import("./file/path").example1 | import("./file/path").example2;'
    )
    strictEqual(
      a,
      `import type { example1, example2 } from "./file/path";

export declare type Example = example1 | example2;`
    )
  })

  it('1.11: يجب أن يبقى الاستيراد كما هو', function () {
    const a = cleanFile('import { example } from "./file/path";')
    strictEqual(a, 'import { example } from "./file/path";')
  })

  it('1.12: تحويل استيراد إلى استيراد نوع', function () {
    const a = cleanFile(`const e1 = import("./file/path.js").Example1;
const e2 = import("./file/path.js").Example2;`)
    strictEqual(
      a,
      `import type { Example1, Example2 } from "./file/path.js";

const e1 = Example1;
const e2 = Example2;`
    )
  })

  it('1.13: إزالة تعريف النوع', function () {
    const a = cleanFile('/** @typedef {Example} Example */')
    strictEqual(a, '')
  })

  it('1.14: إزالة نوع التصدير', function () {
    const a = cleanFile('export type Example = Example;')
    strictEqual(a, '')
  })
})

describe('2: تنظيف لا شيء', function () {
  it('2.1: يجب أن تعيده كما هو', function () {
    const a = cleanFile('function foo() { return 0 }')
    strictEqual(a, 'function foo() { return 0 }')
  })
})
