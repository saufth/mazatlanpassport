import {
  literal as zodLiteral,
  object as zodObject,
  string as zodString,
  union as zodUnion,
  type infer as zodInfer
} from 'zod'

export const nameSchema = zodObject({
  name: zodString({ required_error: 'El Nombre es requqrido' })
    .min(3, { message: 'El Nombre debe tener de 3 a 50 caracteres' })
    .max(50, { message: 'El Nombre debe tener de 3 a 50 caracteres' })
})

export type NameInputs = zodInfer<typeof nameSchema>

export const fullNameSchema = zodObject({
  firstName: nameSchema.shape.name,
  lastName: nameSchema.shape.name
})

export type FullNameInputs = zodInfer<typeof fullNameSchema>

export const sloganSchema = zodObject({
  slogan: zodUnion([
    zodLiteral(''),
    zodString()
      .min(5, { message: 'Ingresa un slogan valido' })
      .max(50, { message: 'El slogan no debe exceder los 50 caracteres' })
      .nullish()
      .default(null)
  ])
})

export type SloganInputs = zodInfer<typeof sloganSchema>
