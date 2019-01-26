const shell = require('shelljs')
const exec = require('../utils/exec')
const logger = require('../utils/logger')

class Build {
  constructor() {
    // 存储需要构建发布的包名
    this.target = []
    this.init()
  }

  init() {
    this.check()
  }

  async check() {
    const { code, output = [], error = null } = await exec(
      'lerna changed --json -al',
      { silent: true }
    )
    if (code === 1) {
      logger.info('当前没有组件需要构建发布')
      shell.exit(0)
    }
    if (code !== 0) {
      logger.error(error)
      shell.exit(1)
    }
    const changedPackages = JSON.parse(output)
    const len = changedPackages.length
    for (let i = 0; i < len; i++) {
      this.target.push(changedPackages[i].name)
    }
    this.build()
  }

  async build() {
    const scope = this.target.map(name => `--scope ${name}`)
    await exec(`lerna run build ${scope.join(' ')}`)
    shell.exit(0)
  }
}

module.exports = Build
