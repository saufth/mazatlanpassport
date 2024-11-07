import type { Plan } from '@/types'

export const pricingConfig = {
  plans: {
    week: {
      id: 'week',
      title: 'Plan Semana en Mazatlán',
      description: 'Accede a todos los descuentos exclusivos durante 7 días.',
      stripePriceId: process.env.STRIPE_WEEK_PRICE_ID as string
    },
    month: {
      id: 'month',
      title: 'Plan Mes en Mazatlán',
      description: 'Accede a todos los descuentos exclusivos durante 30 días.',
      stripePriceId: process.env.STRIPE_MONTH_PRICE_ID as string
    }
  } satisfies Record<Plan['id'], Plan>
}

export type PricingConfig = typeof pricingConfig
