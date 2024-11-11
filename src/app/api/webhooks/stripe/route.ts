import { headers } from 'next/headers'
import type Stripe from 'stripe'
import { addMinutes } from 'date-fns'
import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { pricingConfig } from '@/config/pricing'

export async function POST (req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error.'}`,
      { status: 400 }
    )
  }

  switch (event.type) {
    // Handling subscription events
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object

      console.log(checkoutSessionCompleted)
      if (
        checkoutSessionCompleted?.metadata?.userId &&
        checkoutSessionCompleted?.metadata?.priceId
      ) {
        const priceData =
          pricingConfig.plans.week.stripePriceId === checkoutSessionCompleted.metadata.priceId
            ? pricingConfig.plans.week
            : pricingConfig.plans.month

        try {
          await db.query(
            'INSERT INTO subscriptions (id, user_id, title, description, days, stripe_payment_id, expires_at) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?, ?)',
            [
              crypto.randomUUID(),
              checkoutSessionCompleted.metadata.userId,
              priceData.title,
              priceData.description,
              priceData.days,
              priceData.stripePriceId,
              addMinutes(new Date(), 5)
            ]
          )
        } catch (err) {
          return new Response(
            `Database Error: ${err instanceof Error ? err.message : 'Unknown error.'}`,
            { status: 500 }
          )
        }
      }

      break
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`)
    }
  }

  return new Response(null, { status: 200 })
}
