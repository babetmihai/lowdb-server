const { port } = process.env

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const db = require('./db')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}))

module.exports = async () => {
  await db.init()
  app.use(routes)
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`) // eslint-disable-line no-console
  })
}
