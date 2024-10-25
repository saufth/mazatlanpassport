'use server'
import { type RowDataPacket } from 'mysql2'
import { db } from '@/lib/database'
import { userStatus } from '@/lib/constants'
import { getErrorMessage } from '@/lib/handle-error'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { type SignupInputs } from '@/lib/validations/auth/signup'

interface UserStatus extends RowDataPacket {
  verifiedAt?: string
  blocked: boolean
  status: boolean
}

interface UserProfile
  extends RowDataPacket,
    Omit<SignupInputs, 'password' | 'confirmPassword' | 'terms'> {}

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

export async function getUserProfile (input: UUIDInputs) {
  try {
    const status = await checkUserStatus(input)

    if (status.error) {
      throw new Error(status.error)
    }

    const [userProfile] = await db.query<UserProfile[]>(
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
