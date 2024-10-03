import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller'
import { validation } from '../middlewares/validation.middleware'
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema'

const router = Router()

router.route('/').post(validation(loginUserSchema), loginUser)

router.route('/register').post(validation(registerUserSchema), registerUser)

export default router
