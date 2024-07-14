import { strictEqual } from 'assert'
import { cleanFile } from '../../cli/func/clean.js'

describe('1: Cleaning lines', function () {
  it('1.1: ', function () {
    const a = cleanFile('export = example;')
    strictEqual(a, 'export default example;')
  })

  it('1.2: ', function () {
    const a = cleanFile('export * as Types from "./file/path.js";')
    strictEqual(a, 'export * as Types from "./file/path.js";')
  })

  it('1.3: ', function () {
    const a = cleanFile('export type exports = example;')
    strictEqual(a, 'export declare type exports = example;')
  })

  it('1.4: ', function () {
    const a = cleanFile('export { example };')
    strictEqual(a, 'export { example };')
  })

  it('1.5: ', function () {
    const a = cleanFile('import type { example } from "./file/path.js";')
    strictEqual(a, 'import type { example } from "./file/path.js";')
  })

  it('1.6: ', function () {
    const a = cleanFile(
      'export type example = typeof import("./file/path.js");'
    )
    strictEqual(
      a,
      'export declare type example = typeof import("./file/path.js");'
    )
  })

  it('1.7: ', function () {
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

  it('1.8: ', function () {
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

  it('1.9: ', function () {
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

  it('1.10: ', function () {
    const a = cleanFile(
      'export declare type Example = import("./file/path").example1 | import("./file/path").example2;'
    )
    strictEqual(
      a,
      `import type { example1, example2 } from "./file/path";

export declare type Example = example1 | example2;`
    )
  })

  it('1.11: ', function () {
    const a = cleanFile('import { example } from "./file/path";')
    strictEqual(a, 'import { example } from "./file/path";')
  })

  it('1.12: ', function () {
    const a = cleanFile(`const e1 = import("./file/path.js").Example1;
const e2 = import("./file/path.js").Example2;`)
    strictEqual(
      a,
      `import type { Example1, Example2 } from "./file/path.js";

const e1 = Example1;
const e2 = Example2;`
    )
  })

  it('1.13: ', function () {
    const a = cleanFile('/** @typedef {Example} Example */')
    strictEqual(a, '')
  })

  it('1.14: ', function () {
    const a = cleanFile('export type Example = Example;')
    strictEqual(a, '')
  })
})

describe('Cleaning nothing', function () {
  it('should return it as is', function () {
    const newFile = cleanFile('function foo() { return 0 }')
    strictEqual(newFile, 'function foo() { return 0 }')
  })
})
