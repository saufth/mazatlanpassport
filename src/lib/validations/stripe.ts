import {
  object as zodObject,
  string as zodString,
  boolean as zodBoolean,
  type infer as zodInfer
} from 'zod'

export const managePlanSchema = zodObject({
  stripePriceId: zodString(),
  isSubscribed: zodBoolean().optional()
})

export type ManagePlanInputs = zodInfer<typeof managePlanSchema>
