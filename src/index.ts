
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import routes from  './routes'


const { port } = process.env
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: true,
  methods: ['GET', 'POST']
}))

export default () => {
  app.use(routes)
  app.listen(port, () => {
    console.log(`Server running on port ${port}`) // eslint-disable-line no-console
  })
}
