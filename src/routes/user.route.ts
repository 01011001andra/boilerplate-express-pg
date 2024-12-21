import { Router } from 'express'
import { authjs, getMe, loginGoogle, loginGoogleCallback, loginUser, registerUser, verifyEmail } from '../controllers/user.controller'
import { validation } from '../middlewares/validation.middleware'
import { loginUserSchema, registerUserSchema, verifyEmailSchema } from '../schemas/user.schema'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.route('/authjs').post(authjs)

router
  .route('/')
  .post(validation(loginUserSchema), loginUser)
  .get(protect(['admin', 'student', 'mentor']), getMe)

router.route('/google/callback').get(loginGoogleCallback)

router.route('/google').get(loginGoogle)

router.route('/verify/:token').get(validation(verifyEmailSchema), verifyEmail)

router.route('/register').post(validation(registerUserSchema), registerUser)

export default router
