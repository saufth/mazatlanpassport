'use server'
import { unstable_noStore as noStore } from 'next/cache'
import {
  NextResponse,
  type NextRequest
} from 'next/server'
import { cookies } from 'next/headers'
import { getErrorMessage } from '@/lib/handle-error'
import {
  createSessionExpirationDate,
  createSessionName,
  decryptSession,
  encryptSession
} from '@/lib/auth'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { type Role } from '@/lib/constants'

const domain = process.env.APP_DOMAIN as string

export async function createSession (inputs: UUIDInputs, role: Role) {
  noStore()

  try {
    const sessionName = createSessionName(role)
    const expires = createSessionExpirationDate(role)
    const encryptedSession = await encryptSession({ ...inputs, expires }, role)
    const cookieStore = await cookies()

    cookieStore.set(sessionName, encryptedSession, {
      expires,
      domain: process.env.NODE_ENV === 'production' ? domain : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return {
      data: null,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function updateSession (request: NextRequest, role: Role) {
  noStore()

  try {
    const sessionName = createSessionName(role)
    const session = request.cookies.get(sessionName)?.value

    if (!session) {
      return {
        data: null,
        error: null
      }
    }

    const decryptedSession = await decryptSession(session, role)

    const expires = createSessionExpirationDate(role)

    decryptedSession.expires = expires

    const encryptedSession = await encryptSession(decryptedSession, role)

    const res = NextResponse.next()

    res.cookies.set({
      name: sessionName,
      value: encryptedSession,
      expires,
      domain: process.env.NODE_ENV === 'production' ? domain : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return {
      data: res,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function deleteSession (role: Role) {
  try {
    const sessionName = createSessionName(role)
    const cookieStore = await cookies()

    cookieStore.set(sessionName, '', {
      expires: new Date(0),
      domain: process.env.NODE_ENV === 'production' ? domain : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return {
      data: null,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getSession (role: Role) {
  noStore()

  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(createSessionName(role))?.value

    if (!sessionToken) {
      throw new Error('Hubo un problema al intentar obtener datos de sesión.')
    }

    const decryptedSession = await decryptSession(sessionToken, role)

    return {
      data: decryptedSession,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getSessionStatus (role: Role) {
  noStore()

  try {
    const cookieStore = await cookies()

    return {
      data: {
        status: cookieStore.has(createSessionName(role))
      },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
