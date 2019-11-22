require('dotenv').config({ path: './.test.env' })

const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')
const server = require('../src/server.js')

const { dbPath } = process.env

const runTests = async () => {
  const mocha = new Mocha()
  fs.readdirSync('tests')
    .filter((file) => file.substr(-3) === '.js')
    .forEach((file) => {
      mocha.addFile(
        path.join('tests', file)
      )
    })
  fs.writeFileSync(dbPath, JSON.stringify({}), 'utf8')
  const app = await server()
  mocha.run((failures) => {
    app.close()
    process.exitCode = failures ? 1 : 0
    process.exit()
  })
}

runTests()

