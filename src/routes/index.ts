import { Router } from 'express'
import examples_router from './example.route'
import user_router from './user.route'
import { errorHandling, notFound } from '../controllers/error.controller'

const app = Router()

app.use('/api', examples_router)
app.use('/api/auth', user_router)

app.use('*', errorHandling)
app.use('*', notFound)
export default app
