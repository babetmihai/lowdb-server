const { Router } = require('express')
const error = require('./error')
const auth = require('./auth')
const items = require('./items')

const router = Router()

router.use(auth)
router.use(items)
router.use(error)

module.exports = router
