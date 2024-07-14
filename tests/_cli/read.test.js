import { deepStrictEqual, ok } from 'assert'
import { isAbsolute, sep } from 'path'
import { readFolder, readImport } from '../../cli/func/read.js'

describe('Reading folder paths', function () {
  it('should return expected paths', async function () {
    const paths = await readFolder('cli')
    deepStrictEqual(
      paths,
      [
        'clean.js',
        'docs.js',
        'func/clean.js',
        'func/read.js',
        'func/write.js'
      ].map((subPath) =>
        (process.cwd() + '/cli/' + subPath).replace(/\//g, sep)
      )
    )
  })

  it('should return absolute paths', async function () {
    const paths = await readFolder('cli')
    ok(paths.every((x) => isAbsolute(x)))
  })
})

describe('Reading file contents', function () {
  it('should return valid path and type', function () {
    const content = readImport('@param {import("./file").string} str')
    deepStrictEqual(content, ['@param {string} str', './file', 'string'])

    const content2 = readImport("@param {import('./file').string} str")
    deepStrictEqual(content2, ['@param {string} str', './file', 'string'])

    const content3 = readImport('@param {import(`./file`).string} str')
    deepStrictEqual(content3, ['@param {string} str', './file', 'string'])
  })

  it('should return valid path and type with space', function () {
    const content = readImport('@param {import("./file").string } str')
    deepStrictEqual(content, ['@param {string } str', './file', 'string'])
  })

  it('should return valid path and type with ()', function () {
    const content = readImport('@param {(import("./file").string)} str')
    deepStrictEqual(content, ['@param {(string)} str', './file', 'string'])
  })

  it('should return valid path and type with []', function () {
    const content = readImport('@param {import("./file").string[]} str')
    deepStrictEqual(content, ['@param {string[]} str', './file', 'string'])
  })

  it('should return valid path and type with [any]', function () {
    const content = readImport('@param {import("./file").string[any]} str')
    deepStrictEqual(content, ['@param {string[any]} str', './file', 'string'])
  })

  it('should return valid path and type with tuple', function () {
    let content = readImport(
      '@param {[import("./file").string, import("./file").number]} str'
    )

    deepStrictEqual(content, [
      '@param {[string, import("./file").number]} str',
      './file',
      'string'
    ])

    content = readImport(content[0])
    deepStrictEqual(content, [
      '@param {[string, number]} str',
      './file',
      'number'
    ])
  })

  it('should return valid path and type with <any>', function () {
    const content = readImport('@param {import("./file").string<any>} str')
    deepStrictEqual(content, ['@param {string<any>} str', './file', 'string'])
  })

  it('should return valid path and type with Promise', function () {
    const content = readImport('@param {Promise<import("./file").string>} str')
    deepStrictEqual(content, [
      '@param {Promise<string>} str',
      './file',
      'string'
    ])
  })

  it('should return valid path and type with Map', function () {
    let content = readImport(
      '@param {Map<import("./file").string, import("./file").number>} str'
    )

    deepStrictEqual(content, [
      '@param {Map<string, import("./file").number>} str',
      './file',
      'string'
    ])

    content = readImport(content[0])
    deepStrictEqual(content, [
      '@param {Map<string, number>} str',
      './file',
      'number'
    ])
  })

  it('should return valid path and type with same path multiple imports', function () {
    let content = readImport(
      '@param {import("./file").string|import("./file").number} str'
    )

    deepStrictEqual(content, [
      '@param {string|import("./file").number} str',
      './file',
      'string'
    ])

    content = readImport(content[0])
    deepStrictEqual(content, ['@param {string|number} str', './file', 'number'])
  })

  it('should return valid path and type with different path multiple imports', function () {
    let content = readImport(
      '@param {import("./file1").string|import("./file2").number} str'
    )
    deepStrictEqual(content, [
      '@param {string|import("./file2").number} str',
      './file1',
      'string'
    ])

    content = readImport(content[0])
    deepStrictEqual(content, [
      '@param {string|number} str',
      './file2',
      'number'
    ])
  })

  it('should return valid path and type with full imports', function () {
    const content = readImport('export type string = typeof import("./file");')
    deepStrictEqual(content, [
      'export type string = typeof import("./file");',
      null,
      null
    ])
  })
})

describe('Negative cases', function () {
  it('should return absolute paths', function () {
    const content = readImport('str')
    deepStrictEqual(content, ['str', null, null])
  })
})
