import { Router } from 'express'
import error from './error'
import auth from './auth'
import items from './items'

const router = Router()

router
  .use(auth)
  .use(items)
  .use(error)

export default router