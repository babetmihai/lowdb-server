const uuidv1 = require('uuid/v1')
const { withError } = require('./error')
const itemService = require('../services/items')

module.exports = withError({
  create: async (req, res) => {
    const id = uuidv1()
    const { name } = req.body
    const { userId } = req.locals
    const item = await itemService.createItem({ id, name, userId })
    return res.status(200).json(item)
  },

  get: async (req, res) => {
    const { id } = req.params
    const { userId } = req.locals
    const item = await itemService.getItemById({ id, userId })
    return res.status(200).json(item)
  },

  list: async (req, res) => {
    const { value } = req.query
    const { userId } = req.locals
    const items = await itemService.listItems({ value, userId })
    return res.status(200).json(items)
  }
})