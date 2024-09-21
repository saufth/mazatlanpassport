import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import type { SubjectSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<SubjectSchemaFields> = {
  subject: {
    name: 'Asunto',
    required: true,
    limits: { min: 4, max: 512 }
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const subjectSchema = zodObject({
  subject: zodString(validationErrorMessages.subject.required!)
    .min(
      validationConfig.subject.limits!.min,
      validationErrorMessages.subject.limits
    )
    .max(
      validationConfig.subject.limits!.max,
      validationErrorMessages.subject.limits
    )
})

export type SubjectInputs = zodInfer<typeof subjectSchema>
