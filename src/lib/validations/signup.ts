import { type infer as zodInfer } from 'zod'
import { nameSchema } from '@/lib/validations/name'
import { loginSchema } from '@/lib/validations/login'

export const signupSchema = nameSchema.merge(loginSchema)

export type SignupInputs = zodInfer<typeof signupSchema>
