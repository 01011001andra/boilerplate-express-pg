import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/winston'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    info: message,
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    info: `Not found`,
    message: `Http method ${req.method} for path ${req.originalUrl} notfound`,
    data: null
  })
}
