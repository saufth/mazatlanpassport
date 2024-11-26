import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { AdminSwitcher } from '@/app/(protected)/root/(dashboard)/_components/admin-switcher'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { DashboardSidebar } from '@/app/(protected)/_components/dashboard-sidebar'
import { getAdminsByRootId } from '@/lib/queries/admin'
import { getCachedRoot } from '@/lib/queries/root'
import { protectedRoles, redirects } from '@/lib/constants'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default async function DashboardRootLayout ({
  children
}: PropsWithChildren) {
  const root = await getCachedRoot()
  const rootRole = protectedRoles.root

  if (!root) {
    redirect(redirects.root.afterSignin)
  }

  const adminsPromise = getAdminsByRootId({ rootId: root.id })

  return (
    <div className='flex min-h-screen'>
      <DashboardSidebar
        user={{
          name: root.username,
          role: rootRole
        }}
        className='top-0 z-30 hidden flex-col gap-4 border-r border-secondary-foreground/60 lg:sticky lg:block'
      >
        <AdminSwitcher
          rootId={root.id}
          adminsPromise={adminsPromise}
        />
      </DashboardSidebar>
      <SidebarInset>
        <DashboardHeader
          user={{
            name: root.username,
            role: rootRole
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
