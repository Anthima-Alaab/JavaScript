import { equal } from 'assert'
import { writeImports } from '../../cli/func/write.js'

describe('1: تحويل خريطة الأنواع إلى واردات', function () {
  it('1.1: قيمة واحدة', function () {
    const a = writeImports(new Map([['./file', ['string']]]))
    equal(a, 'import type { string } from "./file";\n')
  })

  it('1.3: قيم متعددة', function () {
    const a = writeImports(new Map([['./file', ['string', 'number']]]))
    equal(a, 'import type { string, number } from "./file";\n')
  })

  it('1.4: واردات متعددة', function () {
    const a = writeImports(
      new Map([
        ['./file1', ['string']],
        ['./file2', ['number']]
      ])
    )
    equal(a, 'import type { string } from "./file1";\nimport type { number } from "./file2";\n')
  })
})

describe('2: حالات سلبية', function () {
  it('2.1: إعادة لا شيء', function () {
    const a = writeImports(new Map())
    equal(a, undefined)
  })
})
