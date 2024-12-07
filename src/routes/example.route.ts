import { Router } from 'express'
import { validation } from '../middlewares/validation.middleware'
import { findAllExample, createExample, findUniqueExample, updateExample, deleteExample } from '../controllers/example.controller'
import { createExampleSchema, deleteExampleSchema, findManyExampleSchema, findUniqueExampleSchema, updateExampleSchema } from '../schemas/example.schema'
import { protect } from '../middlewares/auth.middleware'

const examplesRouter = Router()

examplesRouter
  .route('/examples')
  .get(protect(['admin', 'student']), validation(findManyExampleSchema), findAllExample)
  .post(validation(createExampleSchema), createExample)
examplesRouter.route('/examples/:exampleId').get(validation(findUniqueExampleSchema), findUniqueExample).put(validation(updateExampleSchema), updateExample).delete(validation(deleteExampleSchema), deleteExample)

export default examplesRouter
