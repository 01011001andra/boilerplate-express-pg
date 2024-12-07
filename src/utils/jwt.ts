import jwt from 'jsonwebtoken'
import { UserType } from '../types/user.type'

export const generateAccessToken = ({ user, expiresIn }: { user: Pick<UserType, 'email' | 'email_verified' | 'role'>; expiresIn: number }) => {
  return jwt.sign({ email: user.email, role: user.role, email_verified: user.email_verified }, String(process.env.TOKEN_KEY), {
    expiresIn: expiresIn
  })
}

export const generateRefreshToken = ({ user, expiresIn }: { user: Pick<UserType, 'email' | 'email_verified' | 'role'>; expiresIn: number }) => {
  return jwt.sign({ email: user.email, role: user.role, email_verified: user.email_verified }, String(process.env.REFRESH_TOKEN_KEY), {
    expiresIn: expiresIn
  })
}

export const verifyRefreshToken = async (token: string) => {
  try {
    return jwt.verify(token, String(process.env.REFRESH_TOKEN_KEY))
  } catch (error) {
    return null
  }
}

export const parseJwt = (token: string) => {
  return JSON.parse
}
