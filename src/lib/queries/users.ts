import 'server-only'
import { cache } from 'react'
import { db } from '@/db'
import { getSession } from '@/lib/queries/sessions'
import { roles, userStatus } from '@/lib/constants'
import { getErrorMessage } from '@/lib/handle-error'
import { type EmailInputs } from '@/lib/validations/email'
import { type FullNameInputs } from '@/lib/validations/full-name'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { type ProfileInputs } from '@/lib/validations/profile'

type User = Omit<ProfileInputs, 'id'>

interface RowKey {
  rowKey: number
}

type Email = EmailInputs

type UserFullName = FullNameInputs

interface UserStatus {
  verifiedAt?: string
  blocked: boolean
  status: boolean
}

export async function currentUser (): Promise<ProfileInputs | null> {
  try {
    const role = roles.user
    const session = await getSession(role)

    if (!session.data) {
      throw new Error('Usuario no encontrado.')
    }

    const userId = session.data.id as string

    const [user] = await db.query<User[]>(
      'SELECT first_name AS firstName, last_name AS lastName, email, birthdate, genre_iso AS genreIso  FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [userId]
    )

    if (!user) {
      throw new Error('Hubo un problema al buscar datos de usuario, intentalo de nuevo más tarde')
    }

    return {
      id: userId,
      ...user
    }
  } catch {
    return null
  }
}

/**
 * Cache is used with a data-fetching function like fetch to share a data snapshot between components.
 * It ensures a single request is made for multiple identical data fetches, with the returned data cached and shared across components during the server render.
 * @see https://react.dev/reference/react/cache#reference
*/
export const getCachedUser = cache(currentUser)

export async function currentUserId () {
  try {
    const role = roles.user
    const session = await getSession(role)

    if (!session.data) {
      throw new Error('Usuario no encontrado.')
    }

    const userId = { id: session.data.id } as UUIDInputs

    return {
      data: userId,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getUserFullName (input: UUIDInputs) {
  try {
    const [userFullName] = await db.query<UserFullName[]>(
      'SELECT first_name AS firstName, last_name AS lastName FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userFullName) {
      throw new Error('Nombre del usuario no encontrado.')
    }

    return {
      data: userFullName,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getUserEmail (input: UUIDInputs) {
  try {
    const [userEmail] = await db.query<Email[]>(
      'SELECT email FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userEmail) {
      throw new Error('Correo electrónico no encontrado.')
    }

    return {
      data: userEmail,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getUserKey (input: UUIDInputs) {
  try {
    const [userKey] = await db.query<RowKey[]>(
      'SELECT row_key FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userKey) {
      throw new Error('Hubo un problema al solicitar llave de usuario, intentalo de nuevo más tarde.')
    }

    return {
      data: userKey,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getUserProfile (input: UUIDInputs) {
  try {
    const status = await checkUserStatus(input)

    if (status.error) {
      throw new Error(status.error)
    }

    const [userProfile] = await db.query<User[]>(
      'SELECT first_name AS firstName, last_name AS lastName, email, birthdate, genre_iso AS genreISO FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userProfile) {
      throw new Error('Hubo un problema al intentar obtener datos de perfil, intentalo de nuevo más tarde.')
    }

    return {
      data: userProfile,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function checkUserStatus (input: UUIDInputs) {
  try {
    const [userStatusData] = await db.query<UserStatus[]>(
      'SELECT verified_at AS verifiedAt, blocked, status FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userStatusData) {
      throw new Error(userStatus.notFound)
    }

    if (!userStatusData.status) {
      throw new Error(userStatus.inactive)
    }

    if (userStatusData.blocked) {
      throw new Error(userStatus.blocked)
    }

    if (!userStatusData.verifiedAt) {
      throw new Error(userStatus.unverified)
    }

    await db.end()

    return {
      data: null,
      error: null
    }
  } catch (err) {
    await db.end()
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function checkUserStatusByEmail (input: EmailInputs) {
  try {
    const [userStatusData] = await db.query<UserStatus[]>(
      'SELECT verified_at AS verifiedAt, blocked, status FROM users WHERE email = ?;',
      [input.email]
    )

    if (!userStatusData) {
      throw new Error(userStatus.notFound)
    }

    if (!userStatusData.status) {
      throw new Error(userStatus.inactive)
    }

    if (userStatusData.blocked) {
      throw new Error(userStatus.blocked)
    }

    if (!userStatusData.verifiedAt) {
      throw new Error(userStatus.unverified)
    }

    await db.end()

    return {
      data: null,
      error: null
    }
  } catch (err) {
    await db.end()
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
