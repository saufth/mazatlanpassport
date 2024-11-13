import {
  boolean as zodBoolean,
  object as zodObject,
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { passwordWithConfirmSchema } from '@/lib/validations/password'
import { profileSchema } from '@/lib/validations/profile'
import { calculateYears } from '@/lib/utils'

export const signupSchema = zodObject({
  terms: zodBoolean().refine((terms) => terms, {
    message: 'Acepta los términos de servicio y privacidad'
  })
})
  .merge(profileSchema)
  .merge(passwordWithConfirmSchema)
  .superRefine((val, ctx) => {
    if (val.confirmPassword !== val.password) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }

    const yearsDifference = calculateYears(new Date(val.birthdate), new Date())
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

export type SignupInputs = zodInfer<typeof signupSchema>
