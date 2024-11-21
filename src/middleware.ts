import { NextResponse, type NextRequest } from 'next/server'
import { redirects, roles } from '@/lib/constants'
import { updateSession } from '@/lib/actions/auth'

export async function middleware (request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/webhooks')) {
    return NextResponse.next() // Bypass for webhooks
  }

  if (request.nextUrl.pathname.includes('/signin')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith(`/${roles.root}`)) {
    const rootSession = await updateSession(request, roles.root)

    if (!rootSession.data) {
      return NextResponse.redirect(new URL(redirects.root.toSignin, request.url))
    }

    return rootSession.data
  }

  if (request.nextUrl.pathname.startsWith(`/${roles.admin}`)) {
    const adminSession = await updateSession(request, roles.admin)

    if (!adminSession.data) {
      return NextResponse.redirect(new URL(redirects.admin.toSignin, request.url))
    }

    return adminSession.data
  }

  const session = await updateSession(request, roles.user)

  if (!session.data) {
    return NextResponse.redirect(new URL(redirects.user.toSignin, request.url))
  }

  return session.data
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/admin/:path*',
    '/root/:path*'
  ]
}
