'use server'
import Stripe from 'stripe'
import { currentUser, getUserEmail } from '@/lib/actions/users'
import { absoluteUrl } from '@/lib/utils'
import { getErrorMessage } from '@/lib/handle-error'

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY))

interface StripeInputs {
  title: string
  amount: number
}

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

    const billingUrl = absoluteUrl('/profile/billing')

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
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
