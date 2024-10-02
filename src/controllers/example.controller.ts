import { type NextFunction, type Request, type Response } from 'express'
import { CreateExampleInput, DeleteExampleInput, GetExampleInput, UpdateExampleInput } from '../schemas/example.schema'
import exampleService from '../services/example.service'

export const createExample = async (
  req: Request<unknown, unknown, CreateExampleInput['body']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const { name, type } = req.body
  try {
    const result = await exampleService.create({ name: '', type: '' })

    res.status(201).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts: createExample - ' + error.message))
    }
  }
}

export const getAllExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
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
      next(new Error('Error pada file src/controllers/example.controller.ts: getAllExample - ' + error.message))
    }
  }
}

export const getOneExample = async (
  req: Request<GetExampleInput['params']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { exampleId } = req.params
  try {
    res.status(200).json({
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
      next(new Error('Error pada file src/controllers/example.controller.ts: getOneExample - ' + error.message))
    }
  }
}

export const updateExample = async (
  req: Request<UpdateExampleInput['params'], unknown, UpdateExampleInput['body']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { exampleId } = req.params
  const { name, type } = req.body
  try {
    res.status(200).json({
      info: 'success',
      data: {
        doc: { exampleId, name, type }
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts: updateExample - ' + error.message))
    }
  }
}

export const deleteExample = async (
  req: Request<DeleteExampleInput['params']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { exampleId } = req.params
  try {
    res.status(200).json({
      info: 'success',
      data: {
        doc: { exampleId }
      }
    })
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      next(new Error('Error pada file src/controllers/example.controller.ts: deleteExample - ' + error.message))
    }
  }
}
