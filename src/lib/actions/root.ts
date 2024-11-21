'use server'
import {
  unstable_noStore as noStore,
  revalidatePath
} from 'next/cache'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import {
  createSession,
  deleteSession,
  getSessionStatus
} from '@/lib/actions/auth'
import { getRootStatusByUsername } from '@/lib/queries/root'
import { getErrorMessage } from '@/lib/handle-error'
import { type SigninRootInputs } from '@/lib/validations/auth'
import { type CreateRootInputs } from '@/lib/validations/root'
import { type PasswordInputs } from '@/lib/validations/common/password'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import {
  roles,
  userStatus
} from '@/lib/constants'
import type { Status } from '@/types'

const rootRole = roles.root

export async function createRoot (input: CreateRootInputs) {
  noStore()

  try {
    const session = await getSessionStatus(rootRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const [rootWithSameUsername] = await db.query<Status[]>(
      'SELECT status FROM roots WHERE username = ?',
      [input.username]
    )

    if (rootWithSameUsername) {
      throw new Error('El nombre de usuario ya esta siendo usado')
    }

    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    const rootId = { id: crypto.randomUUID() }

    await db.query(
      'INSERT INTO roots (id, username, password) VALUES (UUID_TO_BIN(?, TRUE), ?, ?)',
      [
        rootId.id,
        input.username,
        encryptedPassword
      ]
    )

    revalidatePath('root/roots')

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

export async function signinRoot (input: SigninRootInputs) {
  noStore()

  try {
    const session = await getSessionStatus(rootRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await getRootStatusByUsername({ username: input.username })

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      return status
    }

    const [rootKeys] = await db.query<Array<UUIDInputs & PasswordInputs>>(
      'SELECT BIN_TO_UUID(id, TRUE) AS id, password FROM roots WHERE username = ?',
      [input.username]
    )

    if (!rootKeys) {
      throw new Error('Contraseña no encontrada, intentalo de nuevo más tarde')
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      rootKeys.password
    )

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const rootId = { id: rootKeys.id }

    const newSession = await createSession(rootId, rootRole)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

    return {
      data: rootId,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function signoutRoot () {
  try {
    await deleteSession(rootRole)

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
