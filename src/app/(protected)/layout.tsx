import { type PropsWithChildren } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function ProtectedLayout ({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <main className='w-full'>
        {children}
      </main>
    </SidebarProvider>
  )
}
