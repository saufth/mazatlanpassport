import { type PropsWithChildren } from 'react'

export default function ProtectedLayout ({ children }: PropsWithChildren) {
  return (
    <div className='bg-primary text-primary-foreground relative z-10'>
      <main className='relative z-10'>
        {children}
      </main>
    </div>
  )
}
