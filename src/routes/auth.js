const get = require('lodash/get')
const authService = require('../services/auth')
const { Router } = require('express')

const router = Router()

module.exports = router
  .post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body
      const token = await authService.createToken({ email, password })
      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  })
  .use(async (req, res, next) => {
    try {
      const token = get(req, 'headers.authorization', '').replace('Bearer ', '')
      const { userId } = await authService.verifyToken({ token })
      req.locals = { ...req.locals, userId }
      next()
    } catch (error) {
      next(error)
    }
  })
  .post('/users', async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await authService.createUser({ email, password })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })
