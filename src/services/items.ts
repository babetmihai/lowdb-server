import db from '../db'
import uuidv1 from 'uuid/v1'

export const createItem = async ({ name, userId }) => {
  if (!name) throw new Error('400')
  const id = uuidv1()
  const item = { id, name, userId }
  await db.set(`items.${id}`, item).write()
  return item
}

export const getItem = async ({ id, userId }) => {
  if (!id) throw new Error('400')
  const item = await db.get(`items.${id}`).value()
  if (!item || item.userId !== userId) throw new Error('404')
  return item
}

export const listItems = ({ value, userId }) => {
  if (!value) return db.get('items').value()
  return db.get('items')
    .filter((item) => (
      item.userId === userId &&
      item.name.includes(value)
    ))
    .sortBy('name')
    .take(50)
    .value()
}