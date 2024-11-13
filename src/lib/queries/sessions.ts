import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify, SignJWT, type JWTPayload } from 'jose'
import { getErrorMessage } from '@/lib/handle-error'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { roles } from '@/lib/constants'
import type { Roles } from '@/types'

const domain = process.env.APP_DOMAIN as string

const jwtSecretKeys: Record<Roles, Uint8Array> = {
  user: new TextEncoder().encode(process.env.JWT_USERS_SECRET_KEY as string),
  admin: new TextEncoder().encode(process.env.JWT_ADMINS_SECRET_KEY as string),
  root: new TextEncoder().encode(process.env.JWT_ROOTS_SECRET_KEY as string)
}

const createSessionName = (role: Roles) => {
  return `${role}Session`
}

const createSessionExpirationDate = (role: Roles) => {
  const hours = role === roles.user ? 1 : 1
  return new Date(Date.now() + hours * 10 * 60000)
}

export async function encryptSession (payload: JWTPayload, role: Roles) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(createSessionExpirationDate(role))
      .sign(jwtSecretKeys[role])
  } catch {
    throw new Error('Hubo un problema al intentar guardar la sesión, intentalo de nuevo más tarde.')
  }
}

export async function decryptSession (jwt: string | Uint8Array, role: Roles) {
  try {
    const { payload } = await jwtVerify(
      jwt,
      jwtSecretKeys[role],
      { algorithms: ['HS256'] }
    )
    return payload
  } catch {
    throw new Error('Hubo un problema al intentar verificar la sesión, intentalo de nuevo más tarde.')
  }
}

export async function createSession (inputs: UUIDInputs, role: Roles) {
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

export async function getSessionToken (role: Roles) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(createSessionName(role))?.value

    return {
      data: session,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getSession (role: Roles) {
  try {
    const session = await getSessionToken(role)

    if (!session.data) {
      throw new Error('Hubo un problema al intentar obtener datos de sesión.')
    }

    const decryptedJwt = await decryptSession(session.data, role)

    return {
      data: decryptedJwt,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getSessionStatus (role: Roles) {
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

export async function updateSession (request: NextRequest, role: Roles) {
  try {
    const sessionName = createSessionName(role)
    const session = request.cookies.get(sessionName)?.value

    if (!session) {
      return {
        data: null,
        error: null
      }
    }

    const expires = createSessionExpirationDate(role)

    const decryptedJwt = await decryptSession(session, role)
    decryptedJwt.expires = expires

    const res = NextResponse.next()
    const value = await encryptSession(decryptedJwt, role)
    res.cookies.set({
      name: sessionName,
      value,
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

export async function deleteSession (role: Roles) {
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
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}
