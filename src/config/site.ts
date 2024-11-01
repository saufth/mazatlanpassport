import type { Author as NextAuthor } from 'next/dist/lib/metadata/types/metadata-types'
import { createWhatsappUrl, formatPhoneNumber } from '@/lib/utils'
import { blog } from '@/config/blog'
import { COUNTRIES } from '@/config/app'
import type { MainNavItem, NavItem } from '@/types'

export const author: NextAuthor = {
  name: 'saufth',
  url: 'https://github.com/saufth'
}

export const blogNav: MainNavItem[] = [
  ...blog.map((blogItem) => ({ title: blogItem.title, href: blogItem.slug }))
]

export const siteNav: MainNavItem[] = [
  {
    title: '¡Obten tu membresía!',
    href: '/signup'
  },
  {
    title: 'Iniciar sesión',
    href: '/signin'
  },
  {
    title: 'Promociones exclusivas',
    href: '/#promociones-exclusivas'
  },
  // {
  //   title: 'Preguntas frecuentes',
  //   href: '/#preguntas-frecuentes'
  // },
  {
    title: 'Contacto',
    href: '/contacto'
  }
]

const phone = String(process.env.NEXT_PUBLIC_APP_PHONE)
const address = 'Mazatlán, Sinaloa.'
const country = COUNTRIES.find((countryItem) => countryItem.alpha2 === 'MX')!
export const contactConfig = {
  email: String(process.env.NEXT_PUBLIC_EMAIL),
  phone: {
    number: phone,
    displayNumber: formatPhoneNumber(phone),
    whatsappUrl: createWhatsappUrl(phone)
  },
  address: {
    country: country.name.es,
    title: address,
    fullTitle: `${address} ${country.name.es}.`,
    url: 'https://maps.app.goo.gl/CBoETvyJYMmrmifX9'
  }
}

export const socialNav: NavItem[] = [
  {
    title: 'facebook',
    href: '#'
  },
  {
    title: 'instagram',
    href: '#'
  },
  {
    title: 'twitter',
    href: '#'
  },
  {
    title: 'linkedin',
    href: '#'
  },
  {
    title: 'tiktok',
    href: '#'
  }
]

export const siteConfig = {
  name: 'Mazatlán Passport',
  slogan: '¡Descuentos exclusivos en Mazatlán!',
  description: 'Promociones exclusivas para viajeros inteligentes.',
  url: String(process.env.NEXT_PUBLIC_APP_URL),
  mainNav: [
    {
      title: 'Inicio',
      href: '/'
    },
    ...siteNav
  ]
}
