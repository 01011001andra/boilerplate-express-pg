import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

export const protect = (role: ('admin' | 'mentor' | 'student')[]) => async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({
      info: 'Unauthorized',
      message: 'Token not found',
      data: null
    })
    return
  }

  // try {
  jwt.verify(token, process.env.TOKEN_KEY as string, async (err, decoded) => {
    if (err) {
      res.status(401).json({
        info: 'Unauthorized',
        message: err.message,
        data: null
      })
      return
    }

    if (!decoded) return
    if (!role.includes((decoded as { role: 'admin' | 'mentor' | 'student' }).role)) {
      res.status(403).json({
        info: 'Unauthorized',
        message: 'Access Denied: You are not authorized to this route',
        data: null
      })
      return
    }
    req.body.decoded_user = decoded
    next()
  })
  // } catch (error: unknown) {
  // next(new Error(`Error pada file src/middlewares/auth.middleware.ts: protect - ${String(error as Error)}`))
  // }
}
