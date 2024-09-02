import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'

const LIMITS = { name: { min: 2, max: 48 } } as const

const ERROR_MESSAGES = createValidationErrorMessages(LIMITS)

export const nameSchema = zodObject({
  firstName: zodString()
    .min(LIMITS.name.min, ERROR_MESSAGES.name.limits)
    .max(LIMITS.name.max, ERROR_MESSAGES.name.limits),
  lastName: zodString()
    .min(LIMITS.name.min, ERROR_MESSAGES.name.limits)
    .max(LIMITS.name.max, ERROR_MESSAGES.name.limits)
})

export type NameInputs = zodInfer<typeof nameSchema>
