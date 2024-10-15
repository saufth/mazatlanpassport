import {
  coerce,
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { uuidSchema } from '@/lib/validations/uuid'

export const verifyCodeSchema = zodObject({
  code: coerce.number({
    required_error: 'Ingresa el codigo enviado a tu correo electrónico',
    invalid_type_error: 'El codigo debe ser un número de 6 dígitos'
  })
    .positive({ message: 'El codigo es un número positivo' })
    .int({ message: 'El codigo es un número entero' })
    .or(zodString())
    .pipe(
      coerce
        .number({ required_error: 'Ingresa el codigo enviado a tu correo electrónico' })
        .positive({ message: 'El codigo es un número positivo' })
        .int({ message: 'El codigo es un número entero' })
    )
    .refine((code) => code >= 100000 && code <= 999999, {
      message: 'El codigo debe tener 6 dígitos'
    })
})
  .merge(uuidSchema)

export type VerifyCodeInputs = zodInfer<typeof verifyCodeSchema>
