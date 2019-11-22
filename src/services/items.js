const db = require('../db')

const createItem = async ({ id, name, userId }) => {
  if (!name) throw new Error(400)
  const item = { id, name, userId }
  await db().set(`items.${id}`, item).write()
  return item
}

const getItem = async ({ id, userId }) => {
  if (!id) throw new Error(400)
  const item = await db.get(`items.${id}`).value()
  if (!item || item.userId !== userId) throw new Error(404)
  return item
}

const listItems = ({ value, userId }) => {
  if (!value) throw new Error(400)
  return db().get('items')
    .filter((item) => (
      item.userId === userId &&
      item.name.includes(value)
    ))
    .sortBy('name')
    .take(50)
    .value()
}

module.exports = {
  createItem,
  getItem,
  listItems
}