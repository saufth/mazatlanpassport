import {
  coerce,
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { uuidSchema } from '@/lib/validations/uuid'

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
