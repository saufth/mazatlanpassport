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
        const stripeSessionCompletedMetadata = checkoutSessionCompleted.metadata

        const plan = Object.values(pricingConfig.plans).find(
          (plan) => plan.stripePriceId === stripeSessionCompletedMetadata.priceId
        )

        console.log(plan)

        if (!plan) {
          return new Response('Internal error.',
            { status: 500 }
          )
        }

        try {
          await db.query(
            'INSERT INTO subscriptions (id, user_id, stripe_price_id, stripe_payment_id, expires_at) VALUES (UUID_TO_BIN(?, TRUE), UUID_TO_BIN(?, TRUE), ?, ?, ?)',
            [
              crypto.randomUUID(),
              stripeSessionCompletedMetadata.userId,
              stripeSessionCompletedMetadata.priceId,
              checkoutSessionCompleted.id,
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
