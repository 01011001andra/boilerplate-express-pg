import { type NextFunction, type Request, type Response } from 'express'
import { CreateExampleInput, DeleteExampleInput, GetExampleInput, UpdateExampleInput } from '../schemas/example.schema'

export const createExample = async (
  req: Request<unknown, unknown, CreateExampleInput['body']>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { name, type } = req.body
  try {
    return res.status(200).json({
      info: 'success',
      data: {
        doc: { name, type }
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts' + error.message))
    }
  }
}

export const getAllExample = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    return res.status(200).json({
      info: 'success',
      data: {
        docs: [''],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          total: 0
        }
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Error at file src/controllers/examples.controller.ts: ' + error.message))
    }
  }
}

export const getOneExample = async (
  req: Request<GetExampleInput['params']>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { exampleId } = req.params
  try {
    return res.status(200).json({
      info: 'success',
      data: {
        doc: { exampleId },
        pagination: {
          currentPage: 0,
          totalPages: 0,
          total: 0
        }
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Error at file src/controllers/examples.controller.ts: ' + error.message))
    }
  }
}

export const updateExample = async (
  req: Request<UpdateExampleInput['params'], unknown, UpdateExampleInput['body']>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { exampleId } = req.params
  const { name, type } = req.body
  try {
    return res.status(200).json({
      info: 'success',
      data: {
        doc: { exampleId, name, type }
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts' + error.message))
    }
  }
}

export const deleteExample = async (
  req: Request<DeleteExampleInput['params']>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { exampleId } = req.params
  try {
    return res.status(200).json({
      info: 'success',
      data: {
        doc: { exampleId }
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts' + error.message))
    }
  }
}
