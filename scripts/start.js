require('dotenv').config()
const createApp = require('../src/server.js')
createApp({
  port: process.env.port,
  dbPath: process.env.dbPath
})
