import { type PropsWithChildren } from 'react'
import SiteHeader from '@/components/layouts/site-header'

export default function UserLayout ({ children }: PropsWithChildren) {
  return (
    <div className='bg-primary text-primary-foreground relative z-10'>
      <SiteHeader actions={false} />
      <main className='relative z-10'>
        {children}
      </main>
    </div>
  )
}
