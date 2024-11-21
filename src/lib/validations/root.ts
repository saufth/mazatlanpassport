import {
  ZodIssueCode,
  type infer as zodInfer
} from 'zod'
import { passwordWithConfirmSchema } from '@/lib/validations/common/password'
import { usernameSchema } from '@/lib/validations/common/username'

export const createRootSchema = usernameSchema
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

export type CreateRootInputs = zodInfer<typeof createRootSchema>
