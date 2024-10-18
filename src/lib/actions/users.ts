'use server'
import { type RowDataPacket } from 'mysql2'
import { db } from '@/lib/database'
import { userStatus } from '@/lib/constants'
import { getErrorMessage } from '@/lib/handle-error'
import { type UUIDInputs } from '@/lib/validations/uuid'

interface UserStatus extends RowDataPacket {
  verifiedAt?: string
  blocked: boolean
  status: boolean
}

export async function checkUserStatus (input: UUIDInputs) {
  try {
    const [userStatusData] = await db.query<UserStatus[]>(
      'SELECT verified_at AS verifiedAt, blocked, status FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    const data: Record<keyof typeof userStatus, boolean> = {
      notFound: false,
      inactive: false,
      blocked: false,
      unverified: false
    }

    if (!userStatusData) {
      data.notFound = true
    }

    if (!userStatusData.status) {
      data.inactive = true
    }

    if (userStatusData.blocked) {
      data.blocked = true
    }

    if (!userStatusData.verifiedAt) {
      data.unverified = true
    }

    return {
      data,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
