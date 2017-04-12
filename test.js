/* eslint-env mocha */

const outputFileAtomically = require('./')

const pify = require('pify')
const path = require('path')
const assert = require('assert')

const fs = pify(require('fs'))
const rimraf = pify(require('rimraf'))

describe('Output File Atomically', () => {
  const top = path.join(__dirname, 'a')
  const filename = path.join(top, 'b', 'c')
  const data = 'Hello, World!'

  it('outputs a file', () => {
    return Promise.resolve()
      .then(() => outputFileAtomically(filename, data))
      .then(() => fs.readFile(filename, 'utf-8'))
      .then(actual => assert.strictEqual(actual, data))
  })

  after(() => {
    return rimraf(top)
  })
})
