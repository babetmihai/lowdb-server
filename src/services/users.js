const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { privateKey } = process.env

const createUser = async ({ db, id, email, password }) => {
  const existing = await getUserByEmail({ db, email })
  if (existing) throw new Error(400)
  const user = {
    id,
    email,
    hash: bcrypt.hashSync(password, 10)
  }
  await db.set(`users.${id}`, user).write()
  return user
}

const getUserByEmail = ({ db, email }) => {
  return db.get('users')
    .find({ email })
    .value()
}

const verifyToken = async ({ token }) => {
  const { userId } = await jwt.verify(token, privateKey)
  if (!userId) throw new Error(401)
  return { userId }
}

const createToken = async ({ db, email, password }) => {
  const user = await getUserByEmail({ db, email })
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