import { deepEqual, ok } from 'assert/strict'
import { isAbsolute, sep } from 'path'
import { readFolder, readImport } from '../../src/func/read.js'

export default function () {
  describe('1: قراءة مسارات المجلدات', function () {
    it('1.1: إعادة المسارات المتوقعة', async function () {
      const paths = await readFolder('cli/src')
      deepEqual(
        paths,
        [
          'clean.js',
          'docs.js',
          'func/clean.js',
          'func/read.js',
          'func/write.js'
          // eslint-disable-next-line no-undef
        ].map((subPath) => (process.cwd() + '/cli/src/' + subPath).replace(/\//g, sep))
      )
    })

    it('1.2: إعادة المسارات المطلقة', async function () {
      const paths = await readFolder('cli')
      ok(paths.every((x) => isAbsolute(x)))
    })
  })

  describe('2: قراءة محتويات الملفات', function () {
    it('2.1: إعادة المسار والنوع الصحيحين', function () {
      const a = readImport('@param {import("./file").string} str')
      deepEqual(a, ['@param {string} str', './file', 'string'])

      const a2 = readImport("@param {import('./file').string} str")
      deepEqual(a2, ['@param {string} str', './file', 'string'])

      const a3 = readImport('@param {import(`./file`).string} str')
      deepEqual(a3, ['@param {string} str', './file', 'string'])
    })

    it('2.2: إعادة المسار والنوع الصحيحين مع مسافة', function () {
      const a = readImport('@param {import("./file").string } str')
      deepEqual(a, ['@param {string } str', './file', 'string'])
    })

    it('2.3: إعادة المسار والنوع الصحيحين مع ()', function () {
      const a = readImport('@param {(import("./file").string)} str')
      deepEqual(a, ['@param {(string)} str', './file', 'string'])
    })

    it('2.4: إعادة المسار والنوع الصحيحين مع []', function () {
      const a = readImport('@param {import("./file").string[]} str')
      deepEqual(a, ['@param {string[]} str', './file', 'string'])
    })

    it('2.5: إعادة المسار والنوع الصحيحين مع [any]', function () {
      const a = readImport('@param {import("./file").string[any]} str')
      deepEqual(a, ['@param {string[any]} str', './file', 'string'])
    })

    it('2.6: إعادة المسار والنوع الصحيحين مع tuple', function () {
      let a = readImport('@param {[import("./file").string, import("./file").number]} str')

      deepEqual(a, ['@param {[string, import("./file").number]} str', './file', 'string'])

      a = readImport(a[0])
      deepEqual(a, ['@param {[string, number]} str', './file', 'number'])
    })

    it('2.7: إعادة المسار والنوع الصحيحين مع <any>', function () {
      const a = readImport('@param {import("./file").string<any>} str')
      deepEqual(a, ['@param {string<any>} str', './file', 'string'])
    })

    it('2.8: إعادة المسار والنوع الصحيحين مع Promise', function () {
      const a = readImport('@param {Promise<import("./file").string>} str')
      deepEqual(a, ['@param {Promise<string>} str', './file', 'string'])
    })

    it('2.9: إعادة المسار والنوع الصحيحين مع Map', function () {
      let a = readImport('@param {Map<import("./file").string, import("./file").number>} str')

      deepEqual(a, ['@param {Map<string, import("./file").number>} str', './file', 'string'])

      a = readImport(a[0])
      deepEqual(a, ['@param {Map<string, number>} str', './file', 'number'])
    })

    it('2.10: إعادة المسار والنوع الصحيحين مع نفس المسار استيرادات متعددة', function () {
      let a = readImport('@param {import("./file").string|import("./file").number} str')

      deepEqual(a, ['@param {string|import("./file").number} str', './file', 'string'])

      a = readImport(a[0])
      deepEqual(a, ['@param {string|number} str', './file', 'number'])
    })

    it('2.11: إعادة المسار والنوع الصحيحين مع مسارات مختلفة استيرادات متعددة', function () {
      let a = readImport('@param {import("./file1").string|import("./file2").number} str')
      deepEqual(a, ['@param {string|import("./file2").number} str', './file1', 'string'])

      a = readImport(a[0])
      deepEqual(a, ['@param {string|number} str', './file2', 'number'])
    })

    it('2.12: إعادة المسار والنوع الصحيحين مع استيرادات كاملة', function () {
      const a = readImport('export type string = typeof import("./file");')
      deepEqual(a, ['export type string = typeof import("./file");', null, null])
    })
  })

  describe('3: الحالات السلبية', function () {
    it('3.1: إعادة المسارات المطلقة', function () {
      const a = readImport('str')
      deepEqual(a, ['str', null, null])
    })
  })
}
