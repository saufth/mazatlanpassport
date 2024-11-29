import {
  boolean as zodBoolean,
  object as zodObject,
  type infer as zodInfer
} from 'zod'
import { addressSchema, googleMapsIdSchema } from '@/lib/validations/common/address'
import { descriptionSchema } from '@/lib/validations/common/description'
import { fullPhoneSchema, phoneCodeSchema } from '@/lib/validations/common/phone'
import { imageCoverSchema, imageProfileSchema } from '@/lib/validations/common/image'
import { nameSchema, sloganSchema } from '@/lib/validations/common/name'
import { socialSchema } from '@/lib/validations/common/social'
import { uuidSchema } from '@/lib/validations/common/uuid'
import { websiteSchema } from '@/lib/validations/common/website'

export const reservationSchema = zodObject({
  reservation: zodBoolean()
})

export type ReservationInputs = zodInfer<typeof reservationSchema>

export const createStoreSchema = nameSchema
  .merge(sloganSchema)
  .merge(descriptionSchema)
  .merge(phoneCodeSchema)
  .merge(addressSchema)
  .merge(googleMapsIdSchema)
  .merge(websiteSchema)
  .merge(reservationSchema)

export type CreateStoreInputs = zodInfer<typeof createStoreSchema>

export const storeSchema = uuidSchema
  .merge(nameSchema)
  .merge(sloganSchema)
  .merge(descriptionSchema)
  .merge(fullPhoneSchema)
  .merge(addressSchema)
  .merge(googleMapsIdSchema)
  .merge(websiteSchema)
  .merge(imageProfileSchema)
  .merge(imageCoverSchema)
  .merge(socialSchema)
  .merge(reservationSchema)

export type StoreInputs = zodInfer<typeof storeSchema>
