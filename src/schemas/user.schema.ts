import { z } from 'zod'

const registerPayload = {
  body: z.object({
    email: z.string({ required_error: 'Name is required', invalid_type_error: 'Name should be alphabet' }).email({ message: 'Invalid email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, { message: 'Password cannot be empty' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Minimum eight characters, at least one letter, one number and one special character' }),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, { message: 'Password cannot be empty' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Minimum eight characters, at least one letter, one number and one special character' })
  })
}
const loginPayload = {
  body: z.object({
    email: z.string({ required_error: 'Name is required', invalid_type_error: 'Name should be alphabet' }).email({ message: 'Invalid email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, { message: 'Password cannot be empty' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Minimum eight characters, at least one letter, one number and one special character' })
  })
}

export const registerUserSchema = z.object({
  ...registerPayload
})
export const loginUserSchema = z.object({
  ...loginPayload
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
