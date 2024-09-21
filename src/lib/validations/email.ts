import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import type { EmailSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<EmailSchemaFields> = {
  email: {
    name: 'Correo electrónico',
    invalid: true,
    required: true,
    limits: { min: 6, max: 64 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const emailSchema = zodObject({
  email: zodString(validationErrorMessages.email.required!)
    .email(validationErrorMessages.email.invalid!)
    .min(
      validationConfig.email.limits!.min,
      validationErrorMessages.email.limits
    )
    .max(
      validationConfig.email.limits!.max,
      validationErrorMessages.email.limits
    )
})

export type EmailInputs = zodInfer<typeof emailSchema>
