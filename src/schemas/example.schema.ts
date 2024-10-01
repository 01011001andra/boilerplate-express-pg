import { z } from 'zod'

const payload = {
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name should be alphabet'
      })
      .min(1, { message: 'Name cannot be empty' }),
    type: z
      .string({
        required_error: 'Type is required',
        invalid_type_error: 'Type should be alphabet'
      })
      .min(1, { message: 'Type cannot be empty' })
  })
}

const params = {
  params: z.object({
    exampleId: z.string({
      required_error: 'exampleId is required'
    })
  })
}

export const createExampleSchema = z.object({
  ...payload
})
export const getExampleSchema = z.object({
  ...params
})
export const updateExampleSchema = z.object({
  ...params,
  ...payload
})
export const deleteExampleSchema = z.object({
  ...params
})

export type CreateExampleInput = z.infer<typeof createExampleSchema>
export type GetExampleInput = z.infer<typeof getExampleSchema>
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>
export type DeleteExampleInput = z.infer<typeof deleteExampleSchema>
