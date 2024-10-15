import { type infer as zodInfer } from 'zod'
import { passwordSchema } from '@/lib/validations/password'
import { emailSchema } from '@/lib/validations/email'

export const signinSchema = emailSchema.merge(passwordSchema)

export type SigninInputs = zodInfer<typeof signinSchema>
