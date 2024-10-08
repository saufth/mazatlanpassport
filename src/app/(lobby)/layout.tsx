import React from 'react'
import SiteFooter from '@/components/layouts/site-footer'
import SiteHeader from '@/components/layouts/site-header'

export default async function LobbyLayout ({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-primary text-primary-foreground relative z-10'>
      <SiteHeader />
      <main className='relative z-10'>
        {children}
      </main>
      <SiteFooter />
      <div className='w-full h-3xl absolute -z-10 top-0 left-0 bg-gradient-to-tl from-accent/0 via-accent/0 to-accent/40' />
    </div>
  )
}
