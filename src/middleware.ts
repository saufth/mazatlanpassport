import { NextResponse, type NextRequest } from 'next/server'
import { redirects, roles } from '@/lib/constants'
import { updateSession } from '@/lib/actions/session'

export async function middleware (request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/api/webhooks')) {
  //   return NextResponse.next() // Bypass for webhooks
  // }

  const role = roles.user
  const session = await updateSession(request, role)

  if (!session.data) {
    return NextResponse.redirect(new URL(redirects.toSignin, request.url))
  }

  return session.data
}

export const config = {
  matcher: ['/profile']
}
