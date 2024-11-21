import SiteHeaderContent from '@/components/layouts/site-header-content'
import { getCachedUser } from '@/lib/queries/user'

interface SiteHeaderProps {
  actions?: boolean
}

export default async function SiteHeader ({
  actions = true
}: SiteHeaderProps) {
  const user = await getCachedUser()

  return (
    <SiteHeaderContent
      actions={actions}
      user={user}
    />
  )
}
