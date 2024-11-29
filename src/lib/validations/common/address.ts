import {
  string as zodString,
  object as zodObject,
  type infer as zodInfer
} from 'zod'

export const addressSchema = zodObject({
  address: zodString()
    .min(12, { message: 'Ingresa una dirección valida' })
    .max(250, { message: 'La dirección no debe exceder los 250 caracteres' })
})

export type AddressInputs = zodInfer<typeof addressSchema>

export const googleMapsIdSchema = zodObject({
  googleMapsId: zodString()
    .min(17, { message: 'Ingresa una ID de Google Maps valida' })
    .max(17, { message: 'Ingresa una ID vde Google Maps alida' })
    .nullish()
    .default(null)
})

export type GoogleMapsIdInputs = zodInfer<typeof googleMapsIdSchema>
