import {
  coerce,
  date as zodDate,
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { emailSchema } from '@/lib/validations/common/email'
import {
  passwordSchema,
  passwordWithConfirmSchema
} from '@/lib/validations/common/password'
import { usernameSchema } from '@/lib/validations/common/username'
import { uuidSchema } from '@/lib/validations/common/uuid'

export const signinSchema = emailSchema.merge(passwordSchema)

export type SigninInputs = zodInfer<typeof signinSchema>

export const signinRootSchema = usernameSchema.merge(passwordSchema)

export type SigninRootInputs = zodInfer<typeof signinRootSchema>

export const verifyCodeSchema = zodObject({
  code: coerce.number({
    required_error: 'Ingresa el código enviado a tu correo electrónico',
    invalid_type_error: 'El código debe ser un número de 6 dígitos'
  })
    .positive({ message: 'El código es un número positivo' })
    .int({ message: 'El código es un número entero' })
    .or(zodString())
    .pipe(
      coerce
        .number({ required_error: 'Ingresa el código enviado a tu correo electrónico' })
        .positive({ message: 'El código es un número positivo' })
        .int({ message: 'El código es un número entero' })
    )
    .refine((code) => code >= 100000 && code <= 999999, {
      message: 'El código debe tener 6 dígitos'
    })
})
  .merge(uuidSchema)

export type VerifyCodeInputs = zodInfer<typeof verifyCodeSchema>

export const resetPasswordSchema = uuidSchema
  .merge(passwordWithConfirmSchema)
  .merge(verifyCodeSchema)

export type ResetPasswordInputs = zodInfer<typeof resetPasswordSchema>

export const sessionSchema = zodObject({
  expires: zodDate()
    .refine((val) => val.getTime() > Date.now(), {
      message: 'La fecha de expiración debe ser mayor a la fecha actual'
    })
})
  .merge(uuidSchema)

export type SessionInputs = zodInfer<typeof sessionSchema>
