import { Author as NextAuthor } from 'next/dist/lib/metadata/types/metadata-types'
import { blog } from '@/config/blog'
import type {
  SiteConfig,
  MainNavItem,
  NavItem
} from '@/types'
import { COUNTRIES } from './app'
import { createWhatsappUrl, formatPhoneNumber } from '@/lib/utils'

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
  //   title: 'Quiénes somos',
  //   href: '/#nosotros'
  // },
  {
    title: 'Preguntas frecuentes',
    href: '/#preguntas-frecuentes'
  },
  {
    title: 'Contacto',
    href: '/contacto'
  }
]

export const domain = 'mazatlanpassport.mx'

const country = COUNTRIES.find((countryItem) => countryItem.alpha2 === 'MX')!
const phone = '526692393939'
const address = 'Mazatlán, Sinaloa.'
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

export const siteConfig: SiteConfig = {
  name: 'Mazatlán Passport',
  slogan: '¡Descuentos exclusivos en Mazatlán!',
  description: 'Sé socio y accede a descuentos exclusivos en los mejores lugares de Mazatlán',
  url: `https://${domain}`,
  author,
  mainNav: [
    {
      title: 'Página principal',
      href: '/'
    },
    ...siteNav
  ]
}
