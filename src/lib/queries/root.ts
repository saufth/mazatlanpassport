import 'server-only'
import { unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'
import { db } from '@/db'
import { getSession } from '@/lib/actions/auth'
import { getErrorMessage } from '@/lib/handle-error'
import { type UsernameInputs } from '@/lib/validations/common/username'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { roles, userStatus } from '@/lib/constants'
import type { Status } from '@/types'

interface ProfileRootInputs
  extends UUIDInputs, UsernameInputs {}

const rootStatus = {
  notFound: userStatus.notFound,
  inactive: userStatus.inactive
}

const rootRole = roles.root

export async function getCurrentRoot (): Promise<ProfileRootInputs | null> {
  noStore()

  try {
    const session = await getSession(rootRole)

    if (!session.data) {
      throw new Error('Usuario no encontrado.')
    }

    const rootId = { id: session.data.id }

    const [rootProfile] = await db.query<UsernameInputs[]>(
      'SELECT username FROM roots WHERE id = UUID_TO_BIN(?, TRUE);',
      [rootId.id]
    )

    if (!rootProfile) {
      throw new Error('Hubo un problema al buscar datos de usuario, intentalo de nuevo más tarde')
    }

    return {
      ...rootId,
      ...rootProfile
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
export const getCachedRoot = cache(getCurrentRoot)

export async function getRootStatus (input: UUIDInputs) {
  noStore()

  try {
    const [rootStatusData] = await db.query<Status[]>(
      'SELECT status FROM roots WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!rootStatusData) {
      throw new Error(rootStatus.notFound)
    }

    if (!rootStatusData.status) {
      throw new Error(rootStatus.inactive)
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

export async function getRootStatusByUsername (input: UsernameInputs) {
  noStore()

  try {
    const [rootStatusData] = await db.query<Status[]>(
      'SELECT status FROM roots WHERE username = ?;',
      [input.username]
    )

    if (!rootStatusData) {
      throw new Error(userStatus.notFound)
    }

    if (!rootStatusData.status) {
      throw new Error(userStatus.inactive)
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
