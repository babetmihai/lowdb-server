require('dotenv').config({ path: './.test.env' })
const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')
const createApp = require('../src/server.js')

const DB_PATH = './data/test.json'
const testDir = 'tests'

const runTests = async () => {
  const mocha = new Mocha()
  fs.readdirSync(testDir)
    .filter((file) => file.substr(-3) === '.js')
    .forEach((file) => {
      mocha.addFile(
        path.join(testDir, file)
      )
    })
  fs.writeFileSync(DB_PATH, JSON.stringify({}), 'utf8')
  const app = await createApp({
    port: process.env.port,
    dbPath: process.env.dbPath
  })
  mocha.run((failures) => {
    app.close()
    process.exitCode = failures ? 1 : 0
    process.exit()
  })
}

runTests()

