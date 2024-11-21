import { type infer as zodInfer } from 'zod'
import { emailSchema } from '@/lib/validations/common/email'
import { fullNameSchema } from '@/lib/validations/common/name'
import { phoneSchema } from '@/lib/validations/common/phone'
import { subjectSchema } from '@/lib/validations/common/subject'

export const contactSchema = fullNameSchema
  .merge(emailSchema)
  .merge(phoneSchema)
  .merge(subjectSchema)

export type ContactInputs = zodInfer<typeof contactSchema>
