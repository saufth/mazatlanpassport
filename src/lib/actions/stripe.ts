'use server'
import { unstable_noStore as noStore, unstable_cache as cache } from 'next/cache'
import { getSession } from '@/lib/actions/auth'
import { getUserEmail } from '@/lib/queries/user'
import { getErrorMessage } from '@/lib/handle-error'
import { stripe } from '@/lib/stripe'
import { formatPrice, absoluteUrl } from '@/lib/utils'
import { uuidSchema } from '@/lib/validations/common/uuid'
import { type ManagePlanInputs } from '@/lib/validations/stripe'
import { pricingConfig } from '@/config/pricing'
import { roles } from '@/lib/constants'
import type { PlanWithPrice } from '@/types'

const userRole = roles.user

// Retrieve prices for all plans from Stripe
export async function getPlans (): Promise<PlanWithPrice[]> {
  return await cache(
    async () => {
      const weekPriceId = pricingConfig.plans.week.stripePriceId
      const monthPriceId = pricingConfig.plans.month.stripePriceId

      const [weekPrice, monthPrice] = await Promise.all([
        stripe.prices.retrieve(weekPriceId),
        stripe.prices.retrieve(monthPriceId)
      ])

      const currency = monthPrice.currency

      return Object.values(pricingConfig.plans).map((plan) => {
        const price =
          plan.stripePriceId === monthPriceId
            ? monthPrice
            : plan.stripePriceId === weekPriceId
              ? weekPrice
              : null

        return {
          ...plan,
          price: formatPrice((price?.unit_amount ?? 0) / 100, { currency })
        }
      })
    },
    ['subscription-plans'],
    {
      revalidate: 3600, // every hour
      tags: ['subscription-plans']
    }
  )()
}

// Managing subscription
export async function managePlan (input: ManagePlanInputs) {
  noStore()

  try {
    const session = await getSession(userRole)

    if (!session.data) {
      throw new Error(session.error)
    }

    const userId = uuidSchema.parse(session.data)

    const email = await getUserEmail(userId)

    if (!email.data) {
      throw new Error(email.error)
    }

    const billingUrl = absoluteUrl('/profile')

    // If the user is already subscribed to a plan, we redirect them to profile page
    if (input.isSubscribed) {
      return {
        data: {
          url: billingUrl
        },
        error: null
      }
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: email.data.email,
      line_items: [
        {
          price: input.stripePriceId,
          quantity: 1
        }
      ],
      metadata: {
        userId: userId.id,
        priceId: input.stripePriceId
      }
    })

    return {
      data: {
        url: stripeSession.url ?? billingUrl
      },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
