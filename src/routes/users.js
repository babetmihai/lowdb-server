const get = require('lodash/get')
const { withError } = require('./error')
const userService = require('../services/users')

module.exports = withError({
  create: async (req, res) => {
    const { email, password } = req.body
    const user = await userService.createUser({ email, password })
    res.status(200).json(user)
  },

  verify: async (req, res, next) => {
    const token = get(req, 'headers.authorization', '').replace('Bearer ', '')
    const { userId } = await userService.verifyToken({ token })
    req.locals = { ...req.locals, userId }
    next()
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const token = await userService.createToken({ email, password })
    res.status(200).json({ token })
  }
})