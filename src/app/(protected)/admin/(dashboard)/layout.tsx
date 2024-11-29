import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { StoreSwitcher } from '@/app/(protected)/admin/(dashboard)/_components/store-switcher'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { DashboardSidebar } from '@/app/(protected)/_components/dashboard-sidebar'
import { getCachedAdmin } from '@/lib/queries/admin'
import { getStoresByAdminId } from '@/lib/queries/store'
import { protectedRoles, redirects } from '@/lib/constants'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default async function DashboardAdminLayout ({
  children
}: PropsWithChildren) {
  const admin = await getCachedAdmin()

  if (!admin) {
    redirect(redirects.admin.toSignin)
  }

  const storesPromise = getStoresByAdminId({ adminId: admin.id })
  const adminRole = protectedRoles.admin

  return (
    <div className='flex min-h-screen'>
      <DashboardSidebar
        user={{
          name: admin.name,
          email: admin.email,
          role: adminRole
        }}
        className='top-0 z-30 hidden flex-col gap-4 border-r border-secondary-foreground/60 lg:sticky lg:block'
      >
        <StoreSwitcher
          adminId={admin.id}
          storesPromise={storesPromise}
        />
      </DashboardSidebar>
      <SidebarInset>
        <DashboardHeader
          user={{
            name: admin.name,
            role: adminRole
          }}
        >
          <SidebarTrigger />
        </DashboardHeader>
        <div className='flex flex-col'>
          <main className='flex-1 overflow-hidden px-gutter'>
            {children}
          </main>
        </div>
      </SidebarInset>
    </div>
  )
}
