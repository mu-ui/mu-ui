const shell = require('shelljs')

const exec = (command, option = {}) => {
  return new Promise((resolve, reject) => {
    shell.exec(command, option, (code, stdout, stderr) => {
      if (code !== 0) {
        resolve({ code, error: stderr })
      }
      resolve({ code, output: stdout })
    })
  })
}

module.exports = exec
