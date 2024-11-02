import { type PropsWithChildren } from 'react'
import { type Metadata, type Viewport } from 'next'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import ThemeProvider from '@/components/layouts/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import GoogleSearchScript from '@/components/layouts/google-seacrch-script'
import { cn } from '@/lib/utils'
import { fontHeader, fontSans } from '@/lib/fonts'
import { siteConfig, author } from '@/config/site'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: ${siteConfig.slogan}`,
    template: `${siteConfig.name}: %s`
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    siteConfig.slogan,
    'Mazatlan Passport',
    'Mazatlán',
    'Mazatlan',
    'Sinaloa',
    'Mazatlan Sinaloa',
    'Mazatlán Sinaloa',
    'Passport',
    'Descuentos en Mazatlan Sinaloa',
    'Descuentos en Mazatlán Sinaloa',
    'Promociones en Mazatlan Sinaloa',
    'Promociones en Mazatlán Sinaloa',
    'Viajes a Mazatlan Sinaloa',
    'Viajes a Mazatlán Sinaloa',
    'Vacaciones en Mazatlan Sinaloa',
    'Vacaciones en Mazatlán Sinaloa',
    '¿Que hacer en Mazatlan Sinaloa?',
    '¿Que hacer en Mazatlán Sinaloa',
    'Restaurantes en Mazatlan Sinaloa',
    'Restaurantes en Mazatlán Sinaloa',
    'Lugares en Mazatlan Sinaloa',
    'Lugares en Mazatlán Sinaloa',
    '¿Porque ir a Mazatlan Sinaloa?',
    '¿Porque ir a Mazatlán Sinaloa',
    'Mejores lugares de Mazatlan Sinaloa',
    'Mejores lugares de Mazatlán Sinaloa',
    'Atracciones en Mazatlan Sinaloa',
    'Atracciones en Mazatlán Sinaloa',
    'Noticias Mazatlan Sinaloa',
    'Noticias Mazatlán Sinaloa',
    'Recuerdos Mazatlan Sinaload',
    'Recuerdos Mazatlán Sinaload'
  ],
  authors: author,
  creator: author.name,
  publisher: author.name,
  applicationName: siteConfig.name,
  generator: 'Next.js',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: true,
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'normal'
}

export default function RootLayout ({ children }: PropsWithChildren) {
  return (
    <html lang='es'>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased !scroll-smooth',
          fontHeader.variable,
          fontSans.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system'>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
        <GoogleSearchScript />
      </body>
    </html>
  )
}
