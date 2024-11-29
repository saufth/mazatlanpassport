import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const descriptionSchema = zodObject({
  description: zodString({ required_error: 'La descripción es requqrida' })
    .min(12, { message: 'La descripción debe tener de 12 a 250 caracteres' })
    .max(250, { message: 'La descripción debe tener de 12 a 250 caracteres' })
})

export type DescriptionInputs = zodInfer<typeof descriptionSchema>
