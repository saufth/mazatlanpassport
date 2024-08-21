import { Author as NextAuthor } from 'next/dist/lib/metadata/types/metadata-types'
import { blog } from '@/config/blog'
import type {
  SiteConfig,
  MainNavItem,
  NavItem
} from '@/types'

export const author: NextAuthor = {
  name: 'saufth',
  url: 'https://github.com/saufth'
}

export const blogNav: MainNavItem[] = [
  ...blog.map((blogItem) => ({ title: blogItem.title, href: blogItem.slug }))
]

export const siteNav: MainNavItem[] = [
  {
    title: 'Promociones',
    href: '/#promos'
  },
  {
    title: 'Quiénes somos',
    href: '/#nosotros'
  },
  {
    title: 'Suscribirse',
    href: '/#signin'
  },
  {
    title: 'Iniciar sesión',
    href: '/#login'
  },
  {
    title: 'Preguntas frecuentes',
    href: '/#preguntas-frecuentes'
  },
  {
    title: 'Contacto',
    href: '/contacto'
  }
]

export const domain = 'mazatlanpassport.com'

export const contactEmail = `contacto@${domain}`

export const contact = [
  {
    country: 'México',
    phone: {
      number: '6695555555',
      code: '+52',
      fullNumber: '+526695555555'
    },
    address: {
      name: 'Mazatlán, Sinaloa.',
      url: 'https://maps.app.goo.gl/CBoETvyJYMmrmifX9'
    }
  }
]

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
  slogan: 'Descuentos Exclusivos con Mazatlán Passport',
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
