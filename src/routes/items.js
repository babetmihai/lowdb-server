
const itemService = require('../services/items')
const { Router } = require('express')

const router = Router({ mergeParams: true })

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body
    const { userId } = req.locals
    const item = await itemService.createItem({ name, userId })
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { value } = req.query
    const { userId } = req.locals
    const items = await itemService.listItems({ value, userId })
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req.locals
    const item = await itemService.getItemById({ id, userId })
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

module.exports = router