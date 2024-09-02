import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import { emailSchema } from '@/lib/validations/email'
import { nameSchema } from './name'

const LIMITS = {
  phone: { min: 10, max: 10 },
  subject: { min: 12, max: 512 }
} as const

const ERROR_MESSAGES = createValidationErrorMessages(LIMITS)

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const contactSchema = zodObject({
  phone: zodString()
    .regex(phoneRegExp, ERROR_MESSAGES.phone.default)
    .min(LIMITS.phone.min, ERROR_MESSAGES.phone.limits)
    .max(LIMITS.phone.max, ERROR_MESSAGES.phone.limits),
  subject: zodString()
    .min(LIMITS.subject.min, ERROR_MESSAGES.subject.limits)
    .max(LIMITS.subject.max, ERROR_MESSAGES.subject.limits)
}).merge(nameSchema).merge(emailSchema)

export type ContactInputs = zodInfer<typeof contactSchema>
