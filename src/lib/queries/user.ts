import 'server-only'
import { unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'
import { db } from '@/db'
import { getSession } from '@/lib/actions/auth'
import { getErrorMessage } from '@/lib/handle-error'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type FullNameInputs } from '@/lib/validations/common/name'
import { type UserInputs } from '@/lib/validations/user'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { roles, userStatus } from '@/lib/constants'
import type { RowKey, UserStatus } from '@/types'

type UserProfile = Omit<UserInputs, 'id'>

const userRole = roles.user

export async function getCurrentUser () {
  noStore()

  try {
    const session = await getSession(userRole)

    if (!session.data) {
      throw new Error('Usuario no encontrado.')
    }

    const userId = { id: session.data.id }

    const [userProfile] = await db.query<UserProfile[]>(
      'SELECT email, first_name AS firstName, last_name AS lastName, birthdate, genre_iso AS genreIso FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [userId.id]
    )

    if (!userProfile) {
      throw new Error('Hubo un problema al buscar datos de usuario, intentalo de nuevo más tarde')
    }

    return {
      ...userId,
      ...userProfile
    }
  } catch {
    return null
  }
}

/**
 * Cache is used with a data-fetching function like fetch to share a data snapshot between components.
 * It ensures a single request is made for multiple identical data fetches, with the returned data
 * cached and shared across components during the server render.
 * @see https://react.dev/reference/react/cache#reference
*/
export const getCachedUser = cache(getCurrentUser)

export async function getUserFullName (input: UUIDInputs) {
  noStore()

  try {
    const [userFullName] = await db.query<FullNameInputs[]>(
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
  noStore()

  try {
    const [userEmail] = await db.query<EmailInputs[]>(
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
  noStore()

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

export async function getUserStatus (input: UUIDInputs) {
  noStore()

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

export async function getUserStatusByEmail (input: EmailInputs) {
  noStore()

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
