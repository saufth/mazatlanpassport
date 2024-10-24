import SiteHeaderContent from '@/components/layouts/site-header-content'
import { getSessionToken } from '@/lib/actions/session'
import { roles } from '@/lib/constants'

export default async function SiteHeader ({ actions = true }: { actions?: boolean }) {
  const role = roles.user
  const sessionToken = await getSessionToken(role)

  const isSession = typeof sessionToken.data === 'string'

  return (
    <header>
      <SiteHeaderContent actions={actions} auth={isSession} />
    </header>
  )
}
