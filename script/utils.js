const fs = require('fs-extra')
const path = require('path')
const dir = path.resolve(__dirname, '..', 'dist')
function loadModule(name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}

function copy(version) {
  const src = path.resolve(__dirname, `../dist/v${version}`)
  const dest = path.join(dir)
  fs.copySync(src, dest)
}

function switchVersion(version) {
  copy(version)
}

module.exports.loadModule = loadModule
module.exports.switchVersion = switchVersion
