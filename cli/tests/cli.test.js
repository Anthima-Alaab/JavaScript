import clean from './func/clean.js'
import read from './func/read.js'
import write from './func/write.js'

describe('cli', function () {
  describe('func', function () {
    describe('clean', function () {
      clean()
    })

    describe('read', function () {
      read()
    })

    describe('write', function () {
      write()
    })
  })
})
