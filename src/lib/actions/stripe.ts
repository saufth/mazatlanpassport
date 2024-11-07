'use server'
import { unstable_cache as cache } from 'next/cache'
import { currentUser, getUserEmail } from '@/lib/actions/users'
import { getErrorMessage } from '@/lib/handle-error'
import { stripe } from '@/lib/stripe'
import { absoluteUrl, formatPrice } from '@/lib/utils'
import { pricingConfig } from '@/config/pricing'
import type { PlanWithPrice } from '@/types'

interface StripeInputs {
  title: string
  amount: number
}

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
export async function managePlan (input: StripeInputs) {
  try {
    const userId = await currentUser()

    if (!userId.data) {
      throw new Error(userId.error)
    }

    const email = await getUserEmail(userId.data)

    if (!email.data) {
      throw new Error(email.error)
    }

    const billingUrl = absoluteUrl('/profile')

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      customer_email: email.data.email,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: input.title
            },
            unit_amount: (input.amount * 100)
          },
          quantity: 1
        }
      ]
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
