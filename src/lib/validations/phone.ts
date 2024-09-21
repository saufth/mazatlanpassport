import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import type { PhoneSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<PhoneSchemaFields> = {
  phone: {
    name: 'Número de teléfono',
    invalid: true,
    required: true,
    limits: { min: 10, max: 10 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const phoneSchema = zodObject({
  phone: zodString(validationErrorMessages.phone.required!)
    .regex(phoneRegExp, validationErrorMessages.phone.invalid!)
    .min(
      validationConfig.phone.limits!.min,
      validationErrorMessages.phone.limits
    )
    .max(
      validationConfig.phone.limits!.max,
      validationErrorMessages.phone.limits
    )
})

export type PhoneInputs = zodInfer<typeof phoneSchema>
