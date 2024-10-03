import { Request, Response, NextFunction } from 'express'
import { ZodError, AnyZodObject } from 'zod'
import { StatusCodes } from 'http-status-codes'

export function validation(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          [`${issue.path[1]}`]: issue.message
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ info: 'error', message: 'Invalid Data', data: errorMessages })
      } else {
        next(new Error('Error pada file src/middlewares/validation.middleware.ts: validation - ' + String((error as Error).message)))
      }
    }
  }
}
