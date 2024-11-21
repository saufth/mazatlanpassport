import {
  object as zodObject,
  string as zodString,
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { calculateYears } from '@/lib/utils'

export const birthdateSchema = zodObject({
  birthdate: zodString({ required_error: 'Ingresa tu fecha de nacimiento' })
    .superRefine((val, ctx) => {
      const yearsDifference = calculateYears(new Date(val))
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
})

export type BirthdateInputs = zodInfer<typeof birthdateSchema>
