import express from 'express'
import cors from 'cors'
import app from '../routes'
import morgan from 'morgan'
import '../utils/winston'

const appMiddleware = express()

if (process.env.NODE_ENV === 'development') {
  appMiddleware.use(morgan('dev'))
}
appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
)

appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(app)

export default appMiddleware
