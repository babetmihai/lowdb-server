const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { privateKey } = process.env
const db = require('../db')

const createUser = async ({ id, email, password }) => {
  if (!email || !password) throw new Error(400)
  const existing = await getUserByEmail({ email })
  if (existing) throw new Error(400)
  const user = {
    id,
    email,
    hash: bcrypt.hashSync(password, 10)
  }

  await db().set(`users.${id}`, user).write()

  return user
}

const getUserByEmail = ({ email }) => {
  return db().get('users')
    .find({ email })
    .value()
}

const verifyToken = async ({ token }) => {
  if (!token) throw new Error(401)
  const { userId } = await jwt.verify(token, privateKey)
  if (!userId) throw new Error(401)
  return { userId }
}

const createToken = async ({ email, password }) => {
  if (!email || !password) throw new Error(400)
  const user = await getUserByEmail({ email })
  if (!bcrypt.compareSync(password, user.hash)) throw new Error(401)
  return jwt.sign({
    userId: user.id,
    email: user.email
  }, privateKey)
}

module.exports = {
  createUser,
  getUserByEmail,
  verifyToken,
  createToken
}