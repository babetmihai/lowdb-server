
const createItem = async ({ db, id, name, userId }) => {
  const item = { id, name, userId }
  await db.set(`items.${id}`, item).write()
  return item
}

const getItem = ({ db, id }) => db.get(`items.${id}`).value()

const listItems = ({ db, value, userId }) => {
  return db.get('items')
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