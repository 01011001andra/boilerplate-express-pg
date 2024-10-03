import { type NextFunction, type Request, type Response } from 'express'
import { CreateExampleInput, DeleteExampleInput, FindUniqueExampleInput, FindManyExampleInput, UpdateExampleInput } from '../schemas/example.schema'
import exampleService from '../services/example.service'

export const createExample = async (req: Request<unknown, unknown, CreateExampleInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { name, type, description } = req.body
  try {
    const result = await exampleService.create({ name, type, description })

    res.status(201).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/example.controller.ts: createExample - ' + String((error as Error).message)))
  }
}

export const findAllExample = async (req: Request<object, object, object, FindManyExampleInput['query']>, res: Response, next: NextFunction): Promise<void> => {
  const { limit = '10', page = '1', search = '' } = req.query

  try {
    const result = await exampleService.findMany({ limit, page, search })
    console.log(result)

    res.status(200).json({
      info: 'success',
      data: {
        docs: result.docs,
        pagination: result.pagination
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/example.controller.ts: findAllExample - ' + String((error as Error).message)))
  }
}

export const findUniqueExample = async (req: Request<FindUniqueExampleInput['params']>, res: Response, next: NextFunction): Promise<void> => {
  const { exampleId } = req.params
  try {
    const result = await exampleService.findUnique({ id: exampleId })

    res.status(200).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/example.controller.ts: findUniqueExample - ' + String((error as Error).message)))
  }
}

export const updateExample = async (req: Request<UpdateExampleInput['params'], unknown, UpdateExampleInput['body']>, res: Response, next: NextFunction): Promise<void> => {
  const { exampleId } = req.params
  const { name, type, description } = req.body
  try {
    const result = await exampleService.update({ id: exampleId, description, name, type })

    res.status(200).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/example.controller.ts: updateExample - ' + String((error as Error).message)))
  }
}

export const deleteExample = async (req: Request<DeleteExampleInput['params']>, res: Response, next: NextFunction): Promise<void> => {
  const { exampleId } = req.params
  try {
    const result = await exampleService.remove({ id: exampleId })
    if (!result) {
      res.status(400).json({ error: 'error', message: 'Data not exist', data: null })
      return
    }
    res.status(200).json({
      info: 'success',
      data: {
        doc: result
      }
    })
  } catch (error: Error | unknown) {
    next(new Error('Error pada file src/controllers/example.controller.ts: deleteExample - ' + String((error as Error).message)))
  }
}
