const { Router } = require('express')
const error = require('./error')
const auth = require('./auth')
const items = require('./items')

const router = Router()

module.exports = router
  .use(auth)
  .use(items)
  .use(error)
