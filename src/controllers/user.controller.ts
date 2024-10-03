import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { type NextFunction, type Request, type Response } from 'express'
import { LoginUserInput, RegisterUserInput } from '../schemas/user.schema'
import userService from '../services/user.service'

export const registerUser = async (req: Request<object, object, RegisterUserInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    res.status(400).json({ info: 'error', message: 'Password and confirm password not match', data: null })
    return
  }

  try {
    const isEmailExist = await userService.findUniqueEmail({ email })

    if (isEmailExist) {
      res.status(409).json({
        info: 'error',
        message: 'Email already exist',
        data: null
      })
      return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await userService.register({ email, password: hashedPassword })

    res.status(201).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/user.controller.ts: registerUser - ' + String((error as Error).message)))
  }
}

export const loginUser = async (req: Request<object, object, LoginUserInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  try {
    const result = await userService.findUniqueEmail({ email })

    if (!result) {
      res.status(400).json({ info: 'error', message: 'Wrong email or password!', data: null })
      return
    }

    const comparePassword = await bcrypt.compare(password, result.password)

    if (!comparePassword) {
      res.status(400).json({ info: 'error', message: 'Wrong email or password!', data: null })
      return
    }
    const token = jwt.sign(result, process.env.SECRET_KEY as string, {
      expiresIn: 300
    })

    if (!result.email_verified) {
      console.log(token)
      res.status(403).json({ info: 'error', message: 'Email not verified. Please check your inbox email to verified!', data: null })
      return
    }

    res.status(200).json({
      info: 'Success',
      data: {
        doc: { token }
      }
    })
  } catch (error) {
    next(new Error('Error pada file src/controllers/user.controller.ts: registerUser - ' + String((error as Error).message)))
  }
}
