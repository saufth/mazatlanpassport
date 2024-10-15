import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const passwordSchema = zodObject({
  password: zodString({ required_error: 'La Contraseña es requqrido' })
    .min(6, { message: 'La Contraseña debe tener de 6 a 32 caracteres' })
    .max(32, { message: 'La Contraseña debe tener de 6 a 32 caracteres' })
})

export type PasswordInputs = zodInfer<typeof passwordSchema>

export const passwordWithConfirmSchema = zodObject({
  confirmPassword: zodString({ required_error: 'Confirma tu contraseña' })
})
  .merge(passwordSchema)

export type PasswordWithConfirmInputs = zodInfer<typeof passwordWithConfirmSchema>
