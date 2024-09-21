import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import { fullNameSchema } from '@/lib/validations/full-name'
import { signinSchema } from '@/lib/validations/auth/signin'
import { phoneSchema } from '@/lib/validations/phone'
import { genreISOSchema } from '@/lib/validations/genre-iso'
import type { SignupSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<SignupSchemaFields> = {
  confirmPassword: {
    name: 'Confirmar contraseña',
    required: true,
    limits: { min: 6, max: 32 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const signupSchema = zodObject({
  confirmPassword: zodString(validationErrorMessages.confirmPassword.required!)
    .min(
      validationConfig.confirmPassword.limits!.min,
      validationErrorMessages.confirmPassword.limits
    )
    .max(
      validationConfig.confirmPassword.limits!.max,
      validationErrorMessages.confirmPassword.limits
    )
})
  .merge(fullNameSchema)
  .merge(signinSchema)
  .merge(phoneSchema)
  .merge(genreISOSchema)
  .refine(({ confirmPassword, password }) => confirmPassword !== password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

export type SignupInputs = zodInfer<typeof signupSchema>
