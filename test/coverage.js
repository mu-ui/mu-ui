const fs = require('fs')
const path = require('path')
const opn = require('opn')

const coveragePage = path.resolve(__dirname, './coverage/index.html')

if (fs.existsSync(coveragePage)) {
  opn(coveragePage, {
    app: [process.platform === 'win32' ? 'chrome' : 'google chrome']
  })
  process.exit(0)
}
