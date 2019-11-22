const { db } = require('../db')

const createItem = async ({ id, name, userId }) => {
  const item = { id, name, userId }
  await db().set(`items.${id}`, item).write()
  return item
}

const getItem = ({ id }) => db.get(`items.${id}`).value()

const listItems = ({ value, userId }) => {
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