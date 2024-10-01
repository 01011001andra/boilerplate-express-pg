import { Router } from 'express'
import examplesRouter from './examples.route'

const app = Router()

app.use('/api', examplesRouter)

export default app
