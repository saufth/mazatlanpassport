import { Nunito as NunitoFont } from 'next/font/google'
import localFont from 'next/font/local'

export const fontSans = NunitoFont({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap'
})

export const fontHeader = localFont({
  src: '../../public/fonts/header.woff2',
  display: 'swap',
  variable: '--font-header'
})
