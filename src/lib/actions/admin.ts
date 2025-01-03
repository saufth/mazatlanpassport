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
import { getAdminStatus, getAdminStatusByEmail } from '@/lib/queries/admin'
import { getErrorMessage } from '@/lib/handle-error'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type PasswordInputs } from '@/lib/validations/common/password'
import {
  type ResetPasswordInputs,
  type SigninInputs,
  type VerifyCodeInputs
} from '@/lib/validations/auth'
import { type CreateAdminInputs } from '@/lib/validations/admin'
import { type NameInputs } from '@/lib/validations/common/name'
import { sendVerifyEmailCode } from '@/lib/verify-email'
import {
  calculateMinutes,
  createVerifyCode,
  toLocalDate
} from '@/lib/utils'
import { roles, userStatus } from '@/lib/constants'
import type {
  RowKey,
  Status,
  UserKeys,
  VerifyEmailConfirm,
  VerifyEmailCode
} from '@/types'
import { getLastStoreIdByAdminId } from '../queries/store'

const adminRole = roles.admin

export async function createAdmin (
  input: CreateAdminInputs & { rootId: string }
) {
  noStore()

  try {
    const [adminWithSameName] = await db.query<Status[]>(
      'SELECT status FROM admins WHERE name = ?;',
      [input.name]
    )

    if (adminWithSameName) {
      throw new Error('El correo electrónico ya esta siendo usado')
    }

    const [adminWithSameEmail] = await db.query<Status[]>(
      'SELECT status FROM admins WHERE email = ?;',
      [input.email]
    )

    if (adminWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado')
    }

    const [rootRowKey] = await db.query<RowKey[]>(
      'SELECT row_key AS rowKey FROM roots WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.rootId]
    )

    if (!rootRowKey) {
      throw new Error('Error al buscar llave de usuario root')
    }

    const adminId = { id: crypto.randomUUID() }
    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    await db.query(
      'INSERT INTO admins (id, email, name, password, root_row_key) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?);',
      [
        adminId.id,
        input.email,
        input.name,
        encryptedPassword,
        rootRowKey.rowKey
      ]
    )

    revalidatePath(`/root/admin/${adminId.id}`)

    return {
      data: adminId,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function updateAdminName (adminId: string, input: NameInputs) {
  noStore()

  try {
    const [adminWithSameName] = await db.query<Status[]>(
      'SELECT status FROM admins WHERE name = ?;',
      [input.name]
    )

    if (adminWithSameName) {
      throw new Error('El nombre ya esta siendo usado.')
    }

    await db.query(
      'UPDATE admins SET name = ? WHERE id = UUID_TO_BIN(?, TRUE);',
      [
        input.name,
        adminId
      ]
    )

    revalidatePath(`/root/admin/${adminId}`)

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

export async function updateAdminEmail (adminId: string, input: EmailInputs) {
  noStore()

  try {
    const [adminWithSameEmail] = await db.query<Status[]>(
      'SELECT status FROM admins WHERE email = ?',
      [input.email]
    )

    if (adminWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado.')
    }

    await db.query(
      'UPDATE admins SET email = ?, verified_at = NULL WHERE id = UUID_TO_BIN(?, TRUE);',
      [
        input.email,
        adminId
      ]
    )

    revalidatePath(`/root/admin/${adminId}`)

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

export async function signinAdmin (input: SigninInputs) {
  noStore()

  try {
    const session = await getSessionStatus(adminRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await getAdminStatusByEmail({ email: input.email })

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      return status
    }

    const [adminKeys] = await db.query<Array<UserKeys & PasswordInputs>>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id, password FROM admins WHERE email = ?;',
      [input.email]
    )

    if (!adminKeys) {
      throw new Error('Contraseña no encontrada, intentalo de nuevo más tarde')
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      adminKeys.password
    )

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const adminId = { id: adminKeys.id }

    if (status.error === userStatus.unverified) {
      const [verifyCode] = await db.query<VerifyEmailCode[]>(
        'SELECT code, attempts, created_at AS createdAt FROM admins_verify_codes WHERE admin_row_key = ?;',
        [adminKeys.rowKey]
      )

      if (verifyCode) {
        if (
          calculateMinutes(toLocalDate(verifyCode.createdAt)) < 5 &&
          verifyCode.attempts < 2
        ) {
          return {
            data: {
              adminId: adminId.id,
              storeId: null
            },
            error: userStatus.unverified
          }
        }

        await db.query(
          'DELETE FROM admins_verify_codes WHERE admin_row_key = ?;',
          [adminKeys.rowKey]
        )
      }

      const code = createVerifyCode()

      await db.query(
        'INSERT INTO admins_verify_codes (admin_row_key, code) VALUES (?, ?);',
        [
          adminKeys.rowKey,
          code
        ]
      )

      await sendVerifyEmailCode(input.email, code)

      return {
        data: {
          adminId: adminId.id,
          storeId: null
        },
        error: userStatus.unverified
      }
    }

    const newSession = await createSession(adminId, adminRole)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

    const lastStoreId = await getLastStoreIdByAdminId({ adminId: adminId.id })

    if (lastStoreId.error) {
      throw new Error('Hubo un problema al intentar conseguir datos del administrador, porfavor intentalo de nuevo más tarde')
    }

    return {
      data: {
        adminId: adminId.id,
        storeId: lastStoreId.data?.storeId
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

export async function signoutAdmin () {
  try {
    await deleteSession(adminRole)

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

export async function verifyAdminEmail (input: VerifyCodeInputs) {
  noStore()

  try {
    const session = await getSessionStatus(adminRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const adminId = { id: input.id }

    const status = await getAdminStatus(adminId)

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      return status
    }

    const [adminVerifyData] = await db.query<VerifyEmailConfirm[]>(
      'SELECT row_key AS rowKey, name, email FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!adminVerifyData) {
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM admins_verify_codes WHERE admin_row_key = ?;',
      [adminVerifyData.rowKey]
    )

    if (!verifyCode) {
      throw new Error('Código no encontrado, crea otro iniciando sesión')
    }

    const deleteCurrentVerifyEmailCode = () => {
      db.query(
        'DELETE FROM admins_verify_codes WHERE admin_row_key = ?;',
        [adminVerifyData.rowKey]
      )
    }

    if (calculateMinutes(toLocalDate(verifyCode.createdAt)) >= 5) {
      deleteCurrentVerifyEmailCode()
      throw new Error('El código ha caducado, crea otro iniciando sesión')
    }

    if (verifyCode.attempts > 2) {
      deleteCurrentVerifyEmailCode()
      throw new Error('Demasiados intentos, crea otro código iniciando sesión')
    }

    if (verifyCode.code !== input.code) {
      await db.query(
        'UPDATE admins_verify_codes SET attempts = ?, updated_at = (NOW()) WHERE admin_row_key = ?;',
        [
          verifyCode.attempts + 1,
          adminVerifyData.rowKey
        ]
      )
      throw new Error('Código incorrecto')
    }

    await db.query(
      'UPDATE admins SET verified_at = (NOW()) WHERE row_key = ?;',
      [adminVerifyData.rowKey]
    )

    deleteCurrentVerifyEmailCode()

    const newSession = await createSession(adminId, adminRole)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

    const storeId = await getLastStoreIdByAdminId({ adminId: adminId.id })

    return {
      data: storeId.data,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function resetAdminPasswordEmailCode (input: EmailInputs) {
  noStore()

  try {
    const session = await getSessionStatus(adminRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await getAdminStatusByEmail({ email: input.email })

    if (status.error) {
      throw new Error(status.error)
    }

    const [adminKeys] = await db.query<UserKeys[]>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id FROM admins WHERE email = ?;',
      [input.email]
    )

    if (!adminKeys) {
      throw new Error('Hubo un problema al solicitar llave de usuario, intentalo de nuevo más tarde')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM admins_recovery_codes WHERE admin_row_key = ?;',
      [adminKeys.rowKey]
    )

    if (verifyCode) {
      if (
        calculateMinutes(toLocalDate(verifyCode.createdAt)) < 5 &&
        verifyCode.attempts < 2
      ) {
        return {
          data: { id: adminKeys.id },
          error: null
        }
      }

      await db.query(
        'DELETE FROM admins_recovery_codes WHERE admin_row_key = ?;',
        [adminKeys.rowKey]
      )
    }

    const code = createVerifyCode()

    await db.query(
      'INSERT INTO admins_recovery_codes (admin_row_key, code) VALUES (?, ?);',
      [adminKeys.rowKey, code]
    )

    await sendVerifyEmailCode(
      input.email,
      code
    )

    return {
      data: { id: adminKeys.id },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function resetAdminPassword (input: ResetPasswordInputs) {
  noStore()

  try {
    const session = await getSessionStatus(adminRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const adminId = { id: input.id }

    const status = await getAdminStatus(adminId)

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      throw new Error(status.error)
    }

    const [adminVerifyData] = await db.query<VerifyEmailConfirm[]>(
      'SELECT row_key AS rowKey, name, email FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!adminVerifyData) {
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM admins_recovery_codes WHERE admin_row_key = ?;',
      [adminVerifyData.rowKey]
    )

    if (!verifyCode) {
      throw new Error('Código no encontrado')
    }

    const deleteCurrentRecoveryEmailCode = () => {
      db.query(
        'DELETE FROM admins_recovery_codes WHERE admin_row_key = ?;',
        [adminVerifyData.rowKey]
      )
    }

    if (calculateMinutes(toLocalDate(verifyCode.createdAt)) >= 5) {
      deleteCurrentRecoveryEmailCode()
      throw new Error('El código ha caducado')
    }

    if (verifyCode.attempts > 2) {
      deleteCurrentRecoveryEmailCode()
      throw new Error('Demasiados intentos')
    }

    if (verifyCode.code !== input.code) {
      await db.query(
        'UPDATE admins_recovery_codes SET attempts = ?, updated_at = (NOW()) WHERE admin_row_key = ?;',
        [
          verifyCode.attempts + 1,
          adminVerifyData.rowKey
        ]
      )
      throw new Error('Código incorrecto')
    }

    deleteCurrentRecoveryEmailCode()

    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    await db.query(
      'UPDATE admins SET password = ? WHERE id = UUID_TO_BIN(?, TRUE);',
      [
        encryptedPassword,
        input.id
      ]
    )

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
