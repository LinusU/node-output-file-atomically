const path = require('path')
const pify = require('pify')

const mkdirp = pify(require('mkdirp'))
const writeFileAtomic = pify(require('write-file-atomic'))

module.exports = function outputFileAtomically (filename, data, options) {
  return mkdirp(path.dirname(filename)).then(() => writeFileAtomic(filename, data, options))
}
