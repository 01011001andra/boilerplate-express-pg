import express, { type Application } from 'express'
import 'dotenv/config'
import appMiddleware from './middlewares'
import './configs/db'

const app: Application = express()
const port: number = process.env.PORT != null ? parseInt(process.env.PORT) : 5000

app.use(appMiddleware)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
