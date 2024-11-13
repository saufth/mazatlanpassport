import {
  object as zodObject,
  string as zodString,
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { calculateYears } from '@/lib/utils'
import { emailSchema } from '@/lib/validations/email'
import { fullNameSchema } from '@/lib/validations/full-name'
import { genreISOSchema } from '@/lib/validations/genre-iso'
import { uuidSchema } from '@/lib/validations/uuid'

export const profileSchema = zodObject({
  birthdate: zodString({ required_error: 'Ingresa tu fecha de nacimiento' })
})
  .merge(uuidSchema)
  .merge(fullNameSchema)
  .merge(emailSchema)
  .merge(genreISOSchema)
  .superRefine((val, ctx) => {
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

export type ProfileInputs = zodInfer<typeof profileSchema>
