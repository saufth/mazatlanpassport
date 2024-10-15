import localFont from 'next/font/local'

export const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/sans-extralight.woff2',
      weight: '200'
    },
    {
      path: '../../public/fonts/sans-light.woff2',
      weight: '300'
    },
    {
      path: '../../public/fonts/sans-regular.woff2',
      weight: '400'
    },
    {
      path: '../../public/fonts/sans-medium.woff2',
      weight: '500'
    },
    {
      path: '../../public/fonts/sans-semibold.woff2',
      weight: '600'
    },
    {
      path: '../../public/fonts/sans-bold.woff2',
      weight: '700'
    },
    {
      path: '../../public/fonts/sans-extrabold.woff2',
      weight: '800'
    },
    {
      path: '../../public/fonts/sans-black.woff2',
      weight: '900'
    }
  ],
  display: 'swap',
  variable: '--font-sans'
})

export const fontHeader = localFont({
  src: '../../public/fonts/header.woff2',
  display: 'swap',
  variable: '--font-header'
})
