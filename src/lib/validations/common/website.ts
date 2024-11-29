import {
  literal as zodLiteral,
  string as zodString,
  object as zodObject,
  union as zodUnion,
  type infer as zodInfer
} from 'zod'

export const websiteSchema = zodObject({
  website: zodUnion([
    zodLiteral(''),
    zodString()
      .url({ message: 'Ingresa una URL valida' })
      .min(5, { message: 'Ingresa una URL valida' })
      .max(50, { message: 'La URL no debe exceder los 50 caracteres' })
      .nullish()
      .default(null)
  ])
})

export type WebsiteInputs = zodInfer<typeof websiteSchema>
