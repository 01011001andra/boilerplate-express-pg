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

const findUniqueParams = {
  params: z.object({
    exampleId: z.string({
      required_error: 'exampleId is required'
    })
  })
}

const findManyQuery = {
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional()
  })
}

export const createExampleSchema = z.object({
  ...payload
})
export const findUniqueExampleSchema = z.object({
  ...findUniqueParams
})
export const findManyExampleSchema = z.object({
  ...findManyQuery
})
export const updateExampleSchema = z.object({
  ...findUniqueParams,
  ...payload
})
export const deleteExampleSchema = z.object({
  ...findUniqueParams
})

export type CreateExampleInput = z.infer<typeof createExampleSchema>
export type FindUniqueExampleInput = z.infer<typeof findUniqueExampleSchema>
export type FindManyExampleInput = z.infer<typeof findManyExampleSchema>
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>
export type DeleteExampleInput = z.infer<typeof deleteExampleSchema>
