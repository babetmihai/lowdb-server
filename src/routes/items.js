const { Router } = require('express')
const itemService = require('../services/items')
const db = require('../db')

const router = Router()
router.post('/items', async (req, res, next) => {
  try {
    const { name } = req.body
    const { userId } = req.locals
    const conn = await db.getConnection()
    const item = await itemService.createItem({ name, userId }, conn)
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/items', async (req, res, next) => {
  try {
    const { value } = req.query
    const { userId } = req.locals
    const conn = await db.getConnection()
    const items = await itemService.listItems({ value, userId }, conn)
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/items/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req.locals
    const conn = await db.getConnection()
    const item = await itemService.getItemById({ id, userId }, conn)
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

module.exports = router