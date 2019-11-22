const uuidv1 = require('uuid/v1')
const get = require('lodash/get')
const { withError } = require('./error')
const {
  createUser,
  verifyToken,
  createToken
} = require('../services/users')

module.exports = withError({
  create: async (req, res) => {
    const id = uuidv1()
    const { email, password } = req.body
    const user = await createUser({ id, email, password })
    return res.status(200).json(user)
  },

  verify: async (req, res, next) => {
    const token = get(req, 'headers.authorization', '').replace('Bearer ', '')
    const { userId } = await verifyToken({ token })
    req.locals = { ...req.locals, userId }
    return next()
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const token = await createToken({ email, password })
    return res.status(200).json({ token })
  }
})