const { Router } = require('express')
const { errorHandler } = require('./error')

const createRouter = (context) => {
  const userHandlers = require('./users')(context)
  const itemHandlers = require('./items')(context)

  const router = Router()
  router.post('/login', userHandlers.login)
  router.post('/users', userHandlers.create)
  router.use(userHandlers.verify)

  router.get('/items/:id', itemHandlers.get)
  router.get('/items', itemHandlers.list)
  router.post('/items', itemHandlers.create)

  router.use(errorHandler)
  return router
}

module.exports = createRouter