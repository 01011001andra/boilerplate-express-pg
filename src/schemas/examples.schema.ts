import { z } from 'zod'

export const examplesSchema = z.object({
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
