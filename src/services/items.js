const uuidv1 = require('uuid/v1')

const createItem = async ({ name, userId }, conn) => {
  if (!name) throw new Error(400)
  const id = uuidv1()
  const item = { id, name, userId }
  await conn.set(`items.${id}`, item).write()
  return item
}

const getItem = async ({ id, userId }, conn) => {
  if (!id) throw new Error(400)
  const item = await conn.get(`items.${id}`).value()
  if (!item || item.userId !== userId) throw new Error(404)
  return item
}

const listItems = ({ value, userId }, conn) => {
  if (!value) return conn.get('items').value()
  return conn.get('items')
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
