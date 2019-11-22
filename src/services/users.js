const { privateKey } = process.env

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db')

async function createUser({ id, email, password }) {
  if (!email || !password) throw new Error(400)
  const existing = await getUserByEmail({ email })
  if (existing) throw new Error(400)
  const hash = bcrypt.hashSync(password, 10)
  const user = {  id, email, hash }
  await db().set(`users.${id}`, user).write()
  return user
}

function getUserByEmail({ email }) {
  return db().get('users')
    .find({ email })
    .value()
}

async function verifyToken({ token }) {
  if (!token) throw new Error(401)
  const { userId } = await jwt.verify(token, privateKey)
  if (!userId) throw new Error(401)
  return { userId }
}

async function createToken({ email, password }) {
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
