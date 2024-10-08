import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'
import { fullNameSchema } from '@/lib/validations/full-name'
import { signinSchema } from '@/lib/validations/auth/signin'
import { genreISOSchema } from '@/lib/validations/genre-iso'

export const signupSchema = zodObject({
  confirmPassword: zodString({ required_error: 'Confirma tu contraseña' })
    .min(6, { message: 'La Contraseña debe tener de 6 a 32 caracteres' })
    .max(32, { message: 'La Contraseña debe tener de 6 a 32 caracteres' })
})
  .merge(fullNameSchema)
  .merge(signinSchema)
  .merge(genreISOSchema)
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

export type SignupInputs = zodInfer<typeof signupSchema>
