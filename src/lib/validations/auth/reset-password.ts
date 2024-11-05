import { type infer as zodInfer } from 'zod'
import { passwordWithConfirmSchema } from '@/lib/validations/password'
import { uuidSchema } from '@/lib/validations/uuid'
import { verifyCodeSchema } from '@/lib/validations/verify-code'

export const resetPasswordSchema = uuidSchema
  .merge(passwordWithConfirmSchema)
  .merge(verifyCodeSchema)

export type ResetPasswordInputs = zodInfer<typeof resetPasswordSchema>
