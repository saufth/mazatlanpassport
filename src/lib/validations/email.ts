import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

const errorMessages = 'Correo electrónico requerido'

export const emailSchema = zodObject({
  email: zodString({ required_error: errorMessages })
    .min(1, errorMessages)
    .email('Correo electrónico invalido')
})

export type EmailInputs = zodInfer<typeof emailSchema>
