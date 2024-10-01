import { Router, type Request, type Response } from 'express'
import { validation } from '../middlewares/validation.middleware'
import { examplesSchema } from '../schemas/examples.schema'

const examplesRouter = Router()

examplesRouter.get('/examples', validation(examplesSchema), (req: Request, res: Response) => {
  res.json({ status: true })
})

export default examplesRouter
