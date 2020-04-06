const get = require('lodash/get')
const { Router } = require('express')
const authService = require('../services/auth')
const db = require('../db')

const router = Router()
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const conn = await db.getConnection()
    const token = await authService.createToken({ email, password }, conn)
    res.status(200).json({ token })
  } catch (error) {
    next(error)
  }
})

router.use(async (req, res, next) => {
  try {
    const token = get(req, 'headers.authorization', '').replace('Bearer ', '')
    const conn = await db.getConnection()
    const { userId } = await authService.verifyToken({ token }, conn)
    req.locals = { ...req.locals, userId }
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const conn = await db.getConnection()
    const user = await authService.createUser({ email, password }, conn)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
