import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const fullNameSchema = zodObject({
  firstName: zodString({ required_error: 'El Nombre es requqrido' })
    .min(3, { message: 'El Nombre debe tener de 3 a 35 caracteres' })
    .max(35, { message: 'El Nombre debe tener de 3 a 35 caracteres' }),
  lastName: zodString({ required_error: 'El Apellido es requerido' })
    .min(3, { message: 'El Apellido debe tener de 3 a 35 caracteres' })
    .max(35, { message: 'El Apellido debe tener de 3 a 35 caracteres' })
})

export type FullNameInputs = zodInfer<typeof fullNameSchema>
