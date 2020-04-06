const { privateKey } = process.env

const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUser = async ({ email, password }, conn) => {
  if (!email || !password) throw new Error(400)
  const existing = await getUserByEmail({ email }, conn)
  if (existing) throw new Error(400)
  const id = uuidv1()
  const hash = await bcrypt.hash(password, 10)
  const user = { id, email, hash }
  await conn.set(`users.${id}`, user).write()
  return user
}

const getUserByEmail = ({ email }, conn) => {
  return conn.get('users')
    .find({ email })
    .value()
}

const verifyToken = async ({ token }) => {
  if (!token) throw new Error(401)
  const { userId } = await jwt.verify(token, privateKey)
  if (!userId) throw new Error(401)
  return { userId }
}

const createToken = async ({ email, password }, conn) => {
  if (!email || !password) throw new Error(400)
  const user = await getUserByEmail({ email }, conn)
  const authenticated = await bcrypt.compare(password, user.hash)
  if (!authenticated) throw new Error(401)
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
