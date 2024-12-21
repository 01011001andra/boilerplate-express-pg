import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { type NextFunction, type Request, type Response } from 'express'
import { LoginUserInput, RegisterUserInput, VerifyEmailParam } from '../schemas/user.schema'
import userService from '../services/user.service'
import sendEmail from '../utils/nodemailer'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'
import { authorizationUrl, oauth2Client } from '../configs/oauth/google'
import { google } from 'googleapis/build/src'

export const loginGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.redirect(authorizationUrl)
    return
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: loginGoogle - ${String(error as Error)}`))
  }
}

export const loginGoogleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { code } = req.query

  try {
    const { tokens } = await oauth2Client.getToken(String(code))
    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    })

    const { data } = await oauth2.userinfo.get()
    if (!data) {
      res.status(404).json({
        info: 'error',
        data: {
          doc: data
        }
      })
      return
    }

    const isEmailExist = await userService.findUniqueEmail({ email: String(data?.email) })
    if (!isEmailExist) {
      const result = await userService.register({ email: String(data.email), password: '', oauth: true })
      const userDetail = await userService.findUniqueEmail({ email: String(result?.email) })

      const accessToken = generateAccessToken({ user: userDetail, expiresIn: 3600 })
      // console.log('AKUN BARU')

      // res.status(201).json({
      //   info: 'success',
      //   data: {
      //     doc: accessToken
      //   }
      // })
      res.redirect(`http://localhost:3000/auth-success?token=${accessToken}`)

      return
    }
    const accessToken = generateAccessToken({ user: isEmailExist, expiresIn: 3600 })
    // res.status(200).json({
    //   info: 'success',
    //   data: {
    //     doc: accessToken
    //   }
    // })

    res.redirect(`http://localhost:3000/auth-success?token=${accessToken}`)
    return
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: loginGoogleCallback - ${String(error as Error)}`))
  }
}
export const authjs = async (req: Request<object, object, RegisterUserInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body
  const { oauth } = req.query

  try {
    const isEmailExist = await userService.findUniqueEmail({ email })
    if (!isEmailExist) {
      const result = await userService.register({ email, password: '', oauth: Boolean(oauth) })

      const accessToken = generateAccessToken({ user: result, expiresIn: 3600 })
      res.status(201).json({
        info: 'success',
        data: {
          doc: {
            id: result.id,
            new_account: true,
            email_verified: result.email_verified,
            role: result.role,
            token: accessToken
          }
        }
      })
      return
    }
    const accessToken = generateAccessToken({ user: isEmailExist, expiresIn: 3600 })

    res.status(201).json({
      info: 'success',
      data: {
        doc: {
          id: isEmailExist.id,
          new_account: false,
          email_verified: isEmailExist.email_verified,
          role: isEmailExist.role,
          token: accessToken
        }
      }
    })
    return
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: authjs - ${String(error as Error)}`))
  }
}

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
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: registerUser - ${String(error as Error)}`))
  }
}

export const loginUser = async (req: Request<object, object, LoginUserInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  try {
    const result = await userService.findUniqueEmail({ email })

    if (!result) {
      res.status(400).json({ info: 'error', message: 'Invalid email or password!', data: null })
      return
    }

    const comparePassword = await bcrypt.compare(password, result.password)

    if (!comparePassword) {
      res.status(400).json({ info: 'error', message: 'Invalid email or password!', data: null })
      return
    }
    const accessToken = generateAccessToken({ user: result, expiresIn: 3600 })
    const refreshToken = generateRefreshToken({ user: result, expiresIn: 3600 * 5 })
    if (!result.email_verified) {
      sendEmail(accessToken)
      res.status(403).json({ info: 'error', message: 'Email not verified. Please check your inbox email to verified!', data: null })
      return
    }

    res.status(200).json({
      info: 'Success',
      data: {
        doc: { accessToken, refreshToken }
      }
    })
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: loginUser - ${String(error as Error)}`))
  }
}

export const verifyEmail = async (req: Request<VerifyEmailParam['params']>, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.params

  try {
    jwt.verify(token, process.env.TOKEN_KEY as string, async (err, decoded) => {
      if (err) {
        res.status(400).json({
          info: 'error',
          message: err.message,
          data: null
        })
        return
      }
      if (decoded) {
        const user = await userService.findUniqueEmail({ email: (decoded as { email: string }).email })
        if (user.email_verified) {
          res.status(400).json({
            info: 'error',
            message: 'Email already verified',
            data: null
          })
          return
        }

        const result = await userService.verifyEmail({ email: (decoded as { email: string }).email })
        res.status(200).json({
          info: 'success',
          data: result
        })
      }
    })
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: verifyEmail - ${String(error as Error)}`))
  }
}

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await userService.findUniqueEmail({ email: req.body.decoded_user.email })
    res.status(200).json({
      info: 'success',
      data: {
        doc: result
      }
    })
    return
  } catch (error) {
    next(new Error(`Error pada file src/controllers/user.controller.ts: loginUser - ${String(error as Error)}`))
  }
}
