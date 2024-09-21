import { type infer as zodInfer } from 'zod'
import { emailSchema } from '@/lib/validations/email'
import { fullNameSchema } from '@/lib/validations/full-name'
import { phoneSchema } from '@/lib/validations/phone'
import { subjectSchema } from '@/lib/validations/subject'

export const contactSchema = fullNameSchema
  .merge(emailSchema)
  .merge(phoneSchema)
  .merge(subjectSchema)

export type ContactInputs = zodInfer<typeof contactSchema>
