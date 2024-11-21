import 'server-only'
import { unstable_noStore as noStore } from 'next/cache'
import { db } from '@/db'
import { pricingConfig } from '@/config/pricing'
import type { UUIDInputs } from '@/lib/validations/common/uuid'
import type { UserPlan } from '@/types'

type Subscription = Pick<UserPlan, 'paidInCash' | 'stripePriceId' | 'stripePaymentIntentId' | 'expiresAt' | 'isCanceled'>

export async function getSubscription (
  input: UUIDInputs
): Promise<UserPlan | null> {
  noStore()

  try {
    const [subscription] = await db.query<Subscription[]>(
      'SELECT paid_in_cash AS paidInCash, stripe_price_id AS stripePriceId, stripe_payment_id AS stripePaymentIntentId, expires_at AS expiresAt, NOT status AS isCanceled FROM subscriptions WHERE user_id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!subscription) {
      return null
    }

    const plan = Object.values(pricingConfig.plans).find(
      (plan) => plan.stripePriceId === subscription.stripePriceId
    )

    if (!plan) {
      return null
    }

    const isSubscribed =
      (subscription.paidInCash || !!subscription.stripePaymentIntentId) &&
      new Date(subscription.expiresAt).getTime() > Date.now()

    return {
      ...plan,
      paidInCash: subscription.paidInCash,
      stripePaymentIntentId: subscription.stripePaymentIntentId,
      expiresAt: subscription.expiresAt,
      isSubscribed,
      isCanceled: subscription.isCanceled,
      isActive: isSubscribed && !subscription.isCanceled
    }
  } catch {
    return null
  }
}
