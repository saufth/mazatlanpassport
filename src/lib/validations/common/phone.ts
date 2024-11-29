import {
  coerce,
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const phoneSchema = zodObject({
  phone: coerce.number({
    required_error: 'El número de teléfono es requerido',
    invalid_type_error: 'El número de teléfono no es valido'
  })
    .positive({ message: 'El número de teléfono no es valido' })
    .int({ message: 'El número de teléfono no es valido' })
    .or(zodString())
    .pipe(
      coerce
        .number({ required_error: 'El número de teléfono es requerido' })
        .positive({ message: 'El número de teléfono no es valido' })
        .int({ message: 'El número de teléfono no es valido' })
    )
    .refine((countryCode) => countryCode >= 1000000009 && countryCode <= 9999999900, {
      message: 'El número de teléfono no es valido'
    })
})

export type PhoneInputs = zodInfer<typeof phoneSchema>

export const phoneCodeSchema = zodObject({
  countryCode: coerce.number({
    required_error: 'El código de país es requerido',
    invalid_type_error: 'El código de país no es valido'
  })
    .positive({ message: 'El código de país no es valido' })
    .int({ message: 'El código de país no es valido' })
    .or(zodString())
    .pipe(
      coerce
        .number({ required_error: 'El código de país es requerido' })
        .positive({ message: 'El código de país no es valido' })
        .int({ message: 'El código de país no es valido' })
    )
    .refine((countryCode) => countryCode >= 1 && countryCode <= 1939, {
      message: 'El código de país no es valido'
    })
})
  .merge(phoneSchema)

export type PhoneCodeInputs = zodInfer<typeof phoneCodeSchema>

export const fullPhoneSchema = zodObject({
  phone: coerce.number({
    required_error: 'El número de teléfono es requerido',
    invalid_type_error: 'El número de teléfono debe ser un número de 1 a 4 dígitos'
  })
    .positive({ message: 'El número de teléfono es un número positivo' })
    .int({ message: 'El número de teléfono es un número entero' })
    .or(zodString())
    .pipe(
      coerce
        .number({ required_error: 'El número de teléfono es requerido' })
        .positive({ message: 'El número de teléfono es un número positivo' })
        .int({ message: 'El número de teléfono es un número entero' })
    )
    .refine((countryCode) => countryCode >= 11000000009 && countryCode <= 19399999999900, {
      message: 'El número de teléfono no es valido'
    })
})

export type FullPhoneInputs = zodInfer<typeof fullPhoneSchema>
