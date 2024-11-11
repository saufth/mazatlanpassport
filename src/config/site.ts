import { createWhatsappUrl, formatPhoneNumber } from '@/lib/utils'
import { blog } from '@/config/blog'
import { countries } from '@/lib/constants'
import type { Author } from 'next/dist/lib/metadata/types/metadata-types'
import type { MainNavItem, NavItem } from '@/types'

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

const country = countries.find((countryItem) => countryItem.alpha2 === 'MX')!
const address = 'Mazatlán, Sinaloa.'
const phone = '526692393939'
export const contactConfig = {
  email: 'mazatlanpassport@gmail.com',
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
  url: 'https://kz2qvwcp-3000.usw3.devtunnels.ms',
  mainNav: [
    {
      title: 'Inicio',
      href: '/'
    },
    ...siteNav
  ] satisfies MainNavItem[],
  author: {
    name: 'saufth',
    url: 'https://github.com/saufth'
  } satisfies Author
}

export type SiteConfig = typeof siteConfig
