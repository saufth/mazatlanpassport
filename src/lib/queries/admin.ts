import 'server-only'
import { unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'
import { db } from '@/db'
import { getSession } from '@/lib/actions/auth'
import { getErrorMessage } from '@/lib/handle-error'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type NameInputs } from '@/lib/validations/common/name'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { roles, userStatus } from '@/lib/constants'
import type { RowKey, UserStatus } from '@/types'

interface AdminProfileInputs
  extends UUIDInputs,
    EmailInputs,
    NameInputs {}

type AdminProfile = Omit<AdminProfileInputs, 'id'>

const adminRole = roles.admin

export async function getCurrentAdmin (): Promise<AdminProfileInputs | null> {
  noStore()

  try {
    const session = await getSession(adminRole)

    if (!session.data) {
      throw new Error('Usuario no encontrado.')
    }

    const adminId = { id: session.data.id }

    const [adminProfile] = await db.query<AdminProfile[]>(
      'SELECT email, name FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [adminId.id]
    )

    if (!adminProfile) {
      throw new Error('Hubo un problema al buscar datos de usuario, intentalo de nuevo más tarde')
    }

    return {
      ...adminId,
      ...adminProfile
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
export const getCachedAdmin = cache(getCurrentAdmin)

export async function getAdminEmail (input: UUIDInputs) {
  noStore()

  try {
    const [adminEmail] = await db.query<EmailInputs[]>(
      'SELECT email FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!adminEmail) {
      throw new Error('Correo electrónico no encontrado.')
    }

    return {
      data: adminEmail,
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
    const [adminKey] = await db.query<RowKey[]>(
      'SELECT row_key FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!adminKey) {
      throw new Error('Hubo un problema al solicitar llave de usuario, intentalo de nuevo más tarde.')
    }

    return {
      data: adminKey,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function getAdminStatus (input: UUIDInputs) {
  noStore()

  try {
    const [adminStatusData] = await db.query<UserStatus[]>(
      'SELECT verified_at AS verifiedAt, blocked, status FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!adminStatusData) {
      throw new Error(userStatus.notFound)
    }

    if (!adminStatusData.status) {
      throw new Error(userStatus.inactive)
    }

    if (adminStatusData.blocked) {
      throw new Error(userStatus.blocked)
    }

    if (!adminStatusData.verifiedAt) {
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

export async function getAdminStatusByEmail (input: EmailInputs) {
  noStore()

  try {
    const [adminStatusData] = await db.query<UserStatus[]>(
      'SELECT verified_at AS verifiedAt, blocked, status FROM admins WHERE email = ?;',
      [input.email]
    )

    if (!adminStatusData) {
      throw new Error(userStatus.notFound)
    }

    if (!adminStatusData.status) {
      throw new Error(userStatus.inactive)
    }

    if (adminStatusData.blocked) {
      throw new Error(userStatus.blocked)
    }

    if (!adminStatusData.verifiedAt) {
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
