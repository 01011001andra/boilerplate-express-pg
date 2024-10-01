import { Router } from 'express'
import examples_router from './example.route'

const app = Router()

app.use('/api', examples_router)

export default app
