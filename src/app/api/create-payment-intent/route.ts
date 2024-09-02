import { type NextRequest, NextResponse } from 'next/server'
import type { Amount } from '@/types'
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST (request: NextRequest) {
  try {
    const data = await request.json() as Amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: 'mxn'
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.log('internal error:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}
