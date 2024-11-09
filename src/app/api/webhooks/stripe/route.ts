// import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import type Stripe from 'stripe'
// import { z } from 'zod'
import { stripe } from '@/lib/stripe'

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

      // If there is a user id, and no cart id in the metadata, then this is a new subscription
      if (
        checkoutSessionCompleted?.metadata?.userId &&
        !checkoutSessionCompleted?.metadata?.cartId
      ) {
        // Retrieve the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(
          checkoutSessionCompleted.subscription as string
        )

        console.log(subscription)
      }

      break
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`)
    }
  }

  return new Response(null, { status: 200 })
}
