import localFont from 'next/font/local'

export const fontHeader = localFont({
  src: '../../public/fonts/header.woff2',
  display: 'swap',
  variable: '--font-header'
})

export const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/sans-regular.woff2',
      weight: '400'
    },
    {
      path: '../../public/fonts/sans-medium.woff2',
      weight: '500'
    }
  ],
  display: 'swap',
  variable: '--font-sans'
})
