import {
  string as zodString,
  object as zodObject,
  type infer as zodInfer
} from 'zod'

export const imageSchema = zodObject({
  image: zodString()
    .min(12, { message: 'Ingresa una imagen de perfil valida' })
    .max(250, { message: 'La imagen de perfil no debe exceder los 250 caracteres' })
})

export type imageInputs = zodInfer<typeof imageSchema>

export const imageProfileSchema = zodObject({
  imageProfile: imageSchema.shape.image
})

export type ImageProfileInputs = zodInfer<typeof imageProfileSchema>

export const imageCoverSchema = zodObject({
  imageCover: imageSchema.shape.image
})

export type ImageCoverInputs = zodInfer<typeof imageCoverSchema>
