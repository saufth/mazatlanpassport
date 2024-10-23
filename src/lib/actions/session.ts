import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify, SignJWT, type JWTPayload } from 'jose'
import { createSessionExpirationDate, createSessionName } from '@/lib/utils'
import { getErrorMessage } from '@/lib/handle-error'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { domain } from '@/config/site'
import type { Roles } from '@/types'

const jwtSecretKey = new TextEncoder().encode(String(process.env.JWT_SECRET_KEY))

export async function encryptJWT (payload: JWTPayload, role: Roles) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(createSessionExpirationDate(role))
      .sign(jwtSecretKey)
  } catch {
    throw new Error('Hubo un problema al intentar guardar la sesión, intentalo de nuevo más tarde.')
  }
}

export async function decryptJWT (jwt: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(jwt, jwtSecretKey, { algorithms: ['HS256'] })
    return payload
  } catch (err) {
    throw new Error('Hubo un problema al intentar verificar la sesión, intentalo de nuevo más tarde.')
  }
}

export async function createSession (inputs: UUIDInputs, role: Roles) {
  try {
    const sessionName = createSessionName(role)
    const expires = createSessionExpirationDate(role)
    const session = await encryptJWT({ ...inputs, expires }, role)
    const cookieStore = await cookies()

    cookieStore.set(sessionName, session, {
      domain,
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
    const decryptedJwt = session.data ? await decryptJWT(session.data) : null

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

    const decryptedJwt = await decryptJWT(session)
    decryptedJwt.expires = expires

    const res = NextResponse.next()
    const value = await encryptJWT(decryptedJwt, role)
    res.cookies.set({
      name: sessionName,
      value,
      domain,
      httpOnly: true,
      expires,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
    const cookieStore = await cookies()
    cookieStore.set(createSessionName(role), '', { expires: new Date(0) })
  } catch {
    throw new Error('Hubo un problema al intentar eliminar la sesión, intentalo de nuevo más tarde.')
  }
}
