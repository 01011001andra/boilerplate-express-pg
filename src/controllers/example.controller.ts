import { type NextFunction, type Request, type Response } from 'express'
import {
  CreateExampleInput,
  DeleteExampleInput,
  FindUniqueExampleInput,
  FindManyExampleInput,
  UpdateExampleInput
} from '../schemas/example.schema'
import exampleService from '../services/example.service'

export const createExample = async (
  req: Request<unknown, unknown, CreateExampleInput['body']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, type } = req.body
  try {
    const result = await exampleService.create({ name: name, type: type })

    res.status(201).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/example.controller.ts: createExample - ' + String((error as Error).message)
      )
    )
  }
}

export const findAllExample = async (
  req: Request<object, object, object, FindManyExampleInput['query']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { limit = '10', page = '1', search = '' } = req.query

  try {
    const result = await exampleService.findMany({ limit, page, search })

    res.status(200).json({
      info: 'success',
      data: {
        datas: [limit, page, search],
        docs: result.docs,
        pagination: result.pagination
      }
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/example.controller.ts: findAllExample - ' + String((error as Error).message)
      )
    )
  }
}

export const findUniqueExample = async (
  req: Request<FindUniqueExampleInput['params']>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { exampleId } = req.params
  try {
    const result = await exampleService.findUnique({ exampleId })

    res.status(200).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controllers/example.controller.ts: findUniqueExample - ' + String((error as Error).message)
      )
    )
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
    next(
      new Error(
        'Error pada file src/controllers/example.controller.ts: updateExample - ' + String((error as Error).message)
      )
    )
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
    next(
      new Error(
        'Error pada file src/controllers/example.controller.ts: deleteExample - ' + String((error as Error).message)
      )
    )
  }
}
