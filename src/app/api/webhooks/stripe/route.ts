import { headers } from 'next/headers'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { pricingConfig } from '@/config/pricing'
import type { Plan } from '@/types'
import { db } from '@/db'
import { addDays } from 'date-fns'

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
    case 'checkout.session.completed':{
      const checkoutSessionCompleted = event.data.object

      if (
        checkoutSessionCompleted?.metadata?.userId &&
        checkoutSessionCompleted?.metadata?.priceId
      ) {
        const priceId = checkoutSessionCompleted?.metadata?.priceId as Plan['id']
        const priceData = pricingConfig.plans[priceId]

        try {
          await db.query(
            'INSERT INTO subscription (user_id, title, description, days, stripe_payment_id, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
            [
              checkoutSessionCompleted.metadata.userId,
              priceData.title,
              priceData.description,
              priceData.days,
              priceData.stripePriceId,
              addDays(new Date(), priceData.days)
            ]
          )
        } catch (err) {
          return new Response(
            `Database Error: ${err instanceof Error ? err.message : 'Unknown error.'}`,
            { status: 400 }
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
