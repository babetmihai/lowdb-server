
import * as itemService from '../services/items'
import { Router } from 'express'

const router = Router()

router.post('/items', async (req, res, next) => {
  try {
    const { name } = req.body
    const { userId } = req.locals
    const item = await itemService.createItem({ name, userId })

    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/items', async (req, res, next) => {
  try {
    const { value } = req.query
    const { userId } = req.locals
    const items = await itemService.listItems({ value, userId })
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/items/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req.locals
    const item = await itemService.getItem({ id, userId })
    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
})

export default router