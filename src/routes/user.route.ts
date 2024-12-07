import { Router } from 'express'
import { loginUser, registerUser, verifyEmail } from '../controllers/user.controller'
import { validation } from '../middlewares/validation.middleware'
import { loginUserSchema, registerUserSchema, verifyEmailSchema } from '../schemas/user.schema'

const router = Router()

router.route('/').post(validation(loginUserSchema), loginUser)

router.route('/verify/:token').get(validation(verifyEmailSchema), verifyEmail)

router.route('/register').post(validation(registerUserSchema), registerUser)

export default router
