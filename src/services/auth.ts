const { privateKey } = process.env
import { User } from '../models'

import uuidv1 from 'uuid/v1'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db'

export const createUser = async ({ email, password }): Promise<User> => {
  if (!email || !password) throw new Error('400')
  const existing = await getUserByEmail({ email })
  if (existing) throw new Error('400')
  const id = uuidv1()
  const hash = await bcrypt.hash(password, 10)
  const user = { id, email, hash }
  await db().set(`users.${id}`, user).write()
  return user
}

export const getUserByEmail = ({ email }): Promise<User> => {
  return db().get('users')
    .find({ email })
    .value()
}

export const verifyToken = async ({ token }) => {
  if (!token) throw new Error('401')
  const { userId } = await jwt.verify(token, privateKey)
  if (!userId) throw new Error('401')
  return { userId }
}

export const createToken = async ({ email, password }) => {
  if (!email || !password) throw new Error('400')
  const user = await getUserByEmail({ email })
  const authenticated = await bcrypt.compare(password, user.hash)
  if (!authenticated) throw new Error('401')
  return jwt.sign({
    userId: user.id,
    email: user.email
  }, privateKey)
}
