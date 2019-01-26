const { Signale } = require('signale')

const options = {
  stream: process.stdout,
  types: {
    success: {
      badge: '✔',
      color: 'green',
      label: 'done'
    },
    error: {
      badge: '✖',
      color: 'red',
      label: 'fail'
    },
    info: {
      badge: 'ℹ',
      color: 'cyan',
      label: 'info'
    },
    warn: {
      badge: 'ℹ',
      color: 'yellow',
      label: 'warn'
    }
  }
}

const logger = new Signale(options)

module.exports = logger
