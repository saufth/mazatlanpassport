import { type infer as zodInfer } from 'zod'
import { PasswordSchema } from '@/lib/validations/password'
import { emailSchema } from '@/lib/validations/email'

export const signinSchema = emailSchema.merge(PasswordSchema)

export type SigninInputs = zodInfer<typeof signinSchema>
