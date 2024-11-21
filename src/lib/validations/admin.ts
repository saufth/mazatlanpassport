import {
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { nameSchema } from '@/lib/validations/common/name'
import { emailSchema } from '@/lib/validations/common/email'
import { passwordWithConfirmSchema } from '@/lib/validations/common/password'

export const createAdminSchema = nameSchema
  .merge(emailSchema)
  .merge(passwordWithConfirmSchema)
  .superRefine((val, ctx) => {
    if (val.confirmPassword !== val.password) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })

export type CreateAdminInputs = zodInfer<typeof createAdminSchema>
