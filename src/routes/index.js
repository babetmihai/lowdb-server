const { Router } = require('express')
const { errorController } = require('./error')

const createRouter = (context) => {
  const usersController = require('./users')(context)
  const itemsController = require('./items')(context)

  const router = Router()
  router.post('/login', usersController.login)
  router.post('/users', usersController.create)
  router.use(usersController.verify)

  router.get('/items/:id', itemsController.get)
  router.get('/items', itemsController.list)
  router.post('/items', itemsController.create)

  router.use(errorController)
  return router
}

module.exports = createRouter