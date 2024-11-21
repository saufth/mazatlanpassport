import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const usernameSchema = zodObject({
  username: zodString({ required_error: 'El Nombre de usuario es requqrido' })
    .min(4, { message: 'El Nombre debe tener de 4 a 16 caracteres' })
    .max(16, { message: 'El Nombre debe tener de 4 a 16 caracteres' })
})

export type UsernameInputs = zodInfer<typeof usernameSchema>
