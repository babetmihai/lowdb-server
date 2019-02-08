const uuidv1 = require('uuid/v1')
const get = require('lodash/get')
const { withError } = require('./error')
const {
  createUser,
  verifyToken,
  createToken
} = require('../services/users')

module.exports = ({ db }) => withError({
  create: async (req, res) => {
    const id = uuidv1()
    const { email, password } = req.body
    if (!email || !password) throw new Error(400)
    const user = await createUser({ db, id, email, password })
    return res.status(200).json(user)
  },

  verify: async (req, res, next) => {
    const token = get(req, 'headers.authorization', '').replace('Bearer ', '')
    if (!token) throw new Error(401)
    const { userId } = await verifyToken({ token })
    req.locals = { ...req.locals, userId }
    return next()
  },

  login: async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new Error(400)
    const token = await createToken({ db, email, password })
    return res.status(200).json({ token })
  }
})