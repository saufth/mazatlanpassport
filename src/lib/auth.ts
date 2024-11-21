import 'server-only'
import {
  jwtVerify,
  SignJWT,
  type JWTPayload
} from 'jose'
import { type SessionInputs } from '@/lib/validations/auth'
import { roles, type Role } from '@/lib/constants'

const jwtSecretKeys: Record<Role, Uint8Array> = {
  user: new TextEncoder().encode(process.env.JWT_USER_SECRET_KEY as string),
  admin: new TextEncoder().encode(process.env.JWT_ADMINS_SECRET_KEY as string),
  root: new TextEncoder().encode(process.env.JWT_ROOT_SECRET_KEY as string)
}

export async function encryptSession (payload: SessionInputs, role: Role) {
  try {
    return await new SignJWT(payload as JWTPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(createSessionExpirationDate(role))
      .sign(jwtSecretKeys[role])
  } catch {
    throw new Error('Hubo un problema al intentar guardar la sesión, intentalo de nuevo más tarde.')
  }
}

export async function decryptSession (jwt: string | Uint8Array, role: Role) {
  try {
    const { payload } = await jwtVerify(
      jwt,
      jwtSecretKeys[role],
      { algorithms: ['HS256'] }
    )

    return payload as SessionInputs
  } catch {
    throw new Error('Hubo un problema al intentar verificar la sesión, intentalo de nuevo más tarde.')
  }
}

export function createSessionName (role: Role) {
  return `${role}Session`
}

export function createSessionExpirationDate (role: Role) {
  const hours = role === roles.user ? 1 : 1
  const oneMinuteSeconds = 5
  const oneMinuteMilliseconds = 60000
  return new Date(Date.now() + hours * oneMinuteSeconds * oneMinuteMilliseconds)
}
