import {
  object as zodObject,
  string as zodString,
  boolean as zodBoolean,
  type infer as zodInfer
} from 'zod'

export const managePlanSchema = zodObject({
  stripePriceId: zodString(),
  stripePaymentIntentId: zodString().optional().nullable(),
  isSubscribed: zodBoolean().optional(),
  isCurrentPlan: zodBoolean().optional()
})

export type ManagePlanInputs = zodInfer<typeof managePlanSchema>
