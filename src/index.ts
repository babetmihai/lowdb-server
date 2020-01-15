
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import routes from  './routes'
import { init } from './db'


const { port } = process.env
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}))

export default async () => {
  await init()
  app.use(routes)
  
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`) // eslint-disable-line no-console
  })
}
