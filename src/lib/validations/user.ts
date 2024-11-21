import {
  boolean as zodBoolean,
  object as zodObject,
  string as zodString,
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { calculateYears } from '@/lib/utils'
import { emailSchema } from '@/lib/validations/common/email'
import { fullNameSchema } from '@/lib/validations/common/name'
import { genreISOSchema } from '@/lib/validations/common/genre-iso'
import { uuidSchema } from '@/lib/validations/common/uuid'
import { passwordWithConfirmSchema } from '@/lib/validations/common/password'

export const userSchema = zodObject({
  birthdate: zodString({ required_error: 'Ingresa tu fecha de nacimiento' })
})
  .merge(uuidSchema)
  .merge(fullNameSchema)
  .merge(emailSchema)
  .merge(genreISOSchema)
  .superRefine((val, ctx) => {
    const yearsDifference = calculateYears(new Date(val.birthdate))

    if (yearsDifference < 16) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Debes ser mayor de 16 para registrarte',
        path: ['birthdate']
      })
    } else if (yearsDifference > 100) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Ingresa una edad validad',
        path: ['birthdate']
      })
    }
  })

export type UserInputs = zodInfer<typeof userSchema>

export const signupUserSchema = zodObject({
  terms: zodBoolean().refine((terms) => terms, {
    message: 'Acepta los términos de servicio y privacidad'
  }),
  birthdate: zodString({ required_error: 'Ingresa tu fecha de nacimiento' })
})
  .merge(fullNameSchema)
  .merge(emailSchema)
  .merge(genreISOSchema)
  .merge(passwordWithConfirmSchema)
  .superRefine((val, ctx) => {
    if (val.confirmPassword !== val.password) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }

    const yearsDifference = calculateYears(new Date(val.birthdate))
    if (yearsDifference < 16) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Debes ser mayor de 16 para registrarte',
        path: ['birthdate']
      })
    } else if (yearsDifference > 100) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Ingresa una edad validad',
        path: ['birthdate']
      })
    }
  })

export type SignupUserInputs = zodInfer<typeof signupUserSchema>
