import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import { emailSchema } from '@/lib/validations/email'

const LIMITS = {
  password: { min: 6, max: 32 }
} as const

const ERROR_MESSAGES = createValidationErrorMessages(LIMITS)

export const loginSchema = zodObject({
  password: zodString({ required_error: 'Contraseña requerida' })
    .min(1, 'Contraseña reuqrida')
    .min(LIMITS.password.min, ERROR_MESSAGES.password.limits)
    .max(LIMITS.password.max, ERROR_MESSAGES.password.limits)
}).merge(emailSchema)

export type LoginInputs = zodInfer<typeof loginSchema>
