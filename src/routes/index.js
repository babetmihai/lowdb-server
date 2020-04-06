const { Router } = require('express')
const auth = require('./auth')
const items = require('./items')

const router = Router()

module.exports = router
  .use(auth)
  .use(items)
  .use((error, req, res, next) => {
    const { status = 500, message } = error
    res.status(status).json({ status, message })
  })