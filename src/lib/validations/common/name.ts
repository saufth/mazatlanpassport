import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const nameSchema = zodObject({
  name: zodString({ required_error: 'El Nombre es requqrido' })
    .min(3, { message: 'El Nombre debe tener de 3 a 32 caracteres' })
    .max(32, { message: 'El Nombre debe tener de 3 a 32 caracteres' })
})

export type NameInputs = zodInfer<typeof nameSchema>

export const fullNameSchema = zodObject({
  firstName: nameSchema.shape.name,
  lastName: nameSchema.shape.name
})

export type FullNameInputs = zodInfer<typeof fullNameSchema>
