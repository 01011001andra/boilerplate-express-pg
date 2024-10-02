import { Router } from 'express'
import { validation } from '../middlewares/validation.middleware'
import {
  getAllExample,
  createExample,
  getOneExample,
  updateExample,
  deleteExample
} from '../controllers/example.controller'
import {
  createExampleSchema,
  deleteExampleSchema,
  getExampleSchema,
  updateExampleSchema
} from '../schemas/example.schema'

const examplesRouter = Router()

examplesRouter.route('/examples').get(getAllExample).post(validation(createExampleSchema), createExample)
examplesRouter
  .route('/examples/:exampleId')
  .get(validation(getExampleSchema), getOneExample)
  .put(validation(updateExampleSchema), updateExample)
  .delete(validation(deleteExampleSchema), deleteExample)

export default examplesRouter
