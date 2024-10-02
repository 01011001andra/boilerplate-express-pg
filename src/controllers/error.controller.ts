import { type Request, type Response } from 'express'
import { logger } from '../utils/winston'

export const errorHandling = (err: Error, req: Request, res: Response): void => {
  const message = err.message.split(' - ')[0]
  logger.error(err)
  res.status(500).json({
    error: message,
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Endpoint Tidak Ditemukan',
    message: 'Endpoint Tidak Ditemukan',
    data: null
  })
}
