import express, { Application } from 'express'
import 'dotenv/config'
import morgan from 'morgan'

const app: Application = express()
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 5000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
