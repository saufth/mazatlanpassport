import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const emailSchema = zodObject({
  email: zodString({ required_error: 'El Correo electrónico es requqrido' })
    .email({ message: 'El Correo electrónico no es valido' })
    .min(6, { message: 'El Correo electrónico debe tener de 6 a 64 caracteres' })
    .max(64, { message: 'El Correo electrónico debe tener de 6 a 64 caracteres' })
})

export type EmailInputs = zodInfer<typeof emailSchema>
