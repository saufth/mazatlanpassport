import { type infer as zodInfer } from 'zod'
import { birthdateSchema } from '@/lib/validations/birthdate'
import { emailSchema } from '@/lib/validations/email'
import { fullNameSchema } from '@/lib/validations/full-name'
import { genreISOSchema } from '@/lib/validations/genre-iso'
import { uuidSchema } from '@/lib/validations/uuid'

export const profileSchema = uuidSchema
  .merge(birthdateSchema)
  .merge(fullNameSchema)
  .merge(emailSchema)
  .merge(genreISOSchema)

export type ProfileInputs = zodInfer<typeof profileSchema>
