import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import type { FullNameSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<FullNameSchemaFields> = {
  firstName: {
    name: 'Nombre',
    required: true,
    limits: { min: 3, max: 35 }
  },
  lastName: {
    name: 'Apellido',
    required: true,
    limits: { min: 3, max: 35 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const fullNameSchema = zodObject({
  firstName: zodString(validationErrorMessages.name.required!)
    .min(
      validationConfig.firstName.limits!.min,
      validationErrorMessages.name.limits
    )
    .max(
      validationConfig.firstName.limits!.max,
      validationErrorMessages.name.limits
    ),
  lastName: zodString(validationErrorMessages.lastName.required!)
    .min(
      validationConfig.lastName.limits!.min,
      validationErrorMessages.lastName.limits
    )
    .max(
      validationConfig.lastName.limits!.max,
      validationErrorMessages.lastName.limits
    )
})

export type FullNameInputs = zodInfer<typeof fullNameSchema>
