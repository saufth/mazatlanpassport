import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import type { PasswordSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<PasswordSchemaFields> = {
  password: {
    name: 'Contraseña',
    required: true,
    limits: { min: 6, max: 32 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const PasswordSchema = zodObject({
  password: zodString(validationErrorMessages.password.required!)
    .min(
      validationConfig.password.limits!.min,
      validationErrorMessages.password.limits
    )
    .max(
      validationConfig.password.limits!.max,
      validationErrorMessages.password.limits
    )
})

export type PasswordInputs = zodInfer<typeof PasswordSchema>
