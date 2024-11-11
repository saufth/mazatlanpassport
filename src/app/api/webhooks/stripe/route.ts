// // import { revalidateTag } from 'next/cache'
// import { headers } from 'next/headers'
// import type Stripe from 'stripe'
// // import { z } from 'zod'
// import { stripe } from '@/lib/stripe'

// interface CheckoutItemSchema {
//   userId: string
//   priceId: string
// }

export async function POST (request: Request) {
  console.log('Webhook start')
  return Response.json(request)
  // const body = await req.text()
  // const headersList = await headers()
  // const signature = headersList.get('Stripe-Signature') ?? ''

  // let event: Stripe.Event

  // console.log('Webhook')

  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET as string
  //   )
  // } catch (err) {
  //   return new Response(
  //     `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error.'}`,
  //     { status: 400 }
  //   )
  // }

  // console.log(event.data.object)
  // console.log('\n\n\n')

  // switch (event.type) {
  //   // Handling subscription events
  //   case 'checkout.session.completed':{
  //     const checkoutSessionCompleted = event.data.object

  //     const paymentIntentId = checkoutSessionCompleted?.id
  //     const orderAmount = checkoutSessionCompleted?.amount_total
  //     const checkoutItems = checkoutSessionCompleted?.metadata as unknown as CheckoutItemSchema[]

  //     console.log(checkoutSessionCompleted)
  //     console.log('\n\n\n')
  //     console.log(paymentIntentId)
  //     console.log('\n\n\n')
  //     console.log(orderAmount)
  //     console.log('\n\n\n')
  //     console.log(checkoutItems)

  //     break
  //   }
  //   default: {
  //     console.warn(`Unhandled event type: ${event.type}`)
  //   }
  // }

  // return new Response(null, { status: 200 })
}
