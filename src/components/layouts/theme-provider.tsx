'use client'
import dynamic from 'next/dynamic'
import { type ThemeProviderProps } from 'next-themes/dist/types'

const NextThemeProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  { ssr: false }
)

export default function ThemeProvider ({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  )
}
