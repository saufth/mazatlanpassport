import {
  string as zodString,
  object as zodObject,
  type infer as zodInfer
} from 'zod'

export const facebookIdSchema = zodObject({
  faceookId: zodString()
    .min(5, { message: 'Ingresa un ID de facebook valido' })
    .max(50, { message: 'El ID de facebook no debe exceder los 50 caracteres' })
    .nullish()
    .default(null)
})

export type FacebookIdInputs = zodInfer<typeof facebookIdSchema>

export const instagramIdSchema = zodObject({
  instagramId: zodString()
    .max(30, { message: 'El ID de instagram no debe exceder los 30 caracteres' })
    .nullish()
    .default(null)
})

export type InstagramIdInputs = zodInfer<typeof instagramIdSchema>

export const twitterIdSchema = zodObject({
  twitterId: zodString()
    .max(15, { message: 'El ID de twitter no debe exceder los 15 caracteres' })
    .nullish()
    .default(null)
    .default(null)
})

export type TwitterIdInputs = zodInfer<typeof twitterIdSchema>

export const tiktokIdSchema = zodObject({
  tiktokId: zodString()
    .max(24, { message: 'El ID de tiktok no debe exceder los 24 caracteres' })
    .nullish()
    .default(null)
})

export type TiktokIdInputs = zodInfer<typeof tiktokIdSchema>

export const socialSchema = facebookIdSchema
  .merge(instagramIdSchema)
  .merge(twitterIdSchema)
  .merge(tiktokIdSchema)

export type SocialInputs = zodInfer<typeof socialSchema>
