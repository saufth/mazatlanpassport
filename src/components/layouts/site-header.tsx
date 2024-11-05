import SiteHeaderContent from '@/components/layouts/site-header-content'
import { getSessionStatus } from '@/lib/actions/session'
import { roles } from '@/lib/constants'

interface SiteHeaderProps {
  actions?: boolean
}

export default async function SiteHeader ({ actions = true }: SiteHeaderProps) {
  const sessionStatus = await getSessionStatus(roles.user)

  return (
    <header>
      <SiteHeaderContent
        actions={actions}
        auth={sessionStatus.data?.status}
      />
    </header>
  )
}
