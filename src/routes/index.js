const { Router } = require('express')
const { errorHandler } = require('./error')
const users = require('./users')
const items = require('./items')

const router = Router()
router.post('/login', users.login)
router.post('/users', users.create)
router.use(users.verify)
router.get('/items/:id', items.get)
router.get('/items', items.list)
router.post('/items', items.create)
router.use(errorHandler)

module.exports = router
