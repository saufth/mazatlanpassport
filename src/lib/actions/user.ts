'use server'
import { unstable_noStore as noStore } from 'next/cache'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import {
  createSession,
  deleteSession,
  getSessionStatus
} from '@/lib/actions/auth'
import {
  getUserStatus,
  getUserStatusByEmail
} from '@/lib/queries/user'
import { getErrorMessage } from '@/lib/handle-error'
import { sendVerifyEmailCode } from '@/lib/verify-email'
import { type EmailInputs } from '@/lib/validations/common/email'
import {
  type ResetPasswordInputs,
  type SigninInputs,
  type VerifyCodeInputs
} from '@/lib/validations/auth'
import { type SignupUserInputs } from '@/lib/validations/user'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import {
  calculateMinutes,
  createVerifyCode,
  toLocalDate
} from '@/lib/utils'
import { userStatus, roles } from '@/lib/constants'
import type {
  RowKey,
  UserKeys,
  VerifyEmailCode,
  VerifyEmailConfirm
} from '@/types'

const userRole = roles.user

export async function signup (input: SignupUserInputs) {
  noStore()

  try {
    if (!input.terms) {
      throw new Error('Acepta los términos de servicio y privacidad')
    }

    const session = await getSessionStatus(userRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const [userWithSameEmail] = await db.query<{ status: boolean }[]>(
      'SELECT status FROM users WHERE email = ?',
      [input.email]
    )

    if (userWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado')
    }

    const userId = { id: crypto.randomUUID() }
    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    await db.query(
      'INSERT INTO users (id, email, password, first_name, last_name, genre_iso, birthdate) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?, STR_TO_DATE(?, "%d/%m/%Y"))',
      [
        userId.id,
        input.email,
        encryptedPassword,
        input.firstName,
        input.lastName,
        Number(input.genreISO),
        input.birthdate
      ]
    )

    const [userKey] = await db.query<RowKey[]>(
      'SELECT row_key AS rowKey FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [userId.id]
    )

    if (!userKey) {
      throw new Error('Error al obetener datos de cuenta')
    }

    const code = createVerifyCode()

    await db.query(
      'INSERT INTO users_verify_codes (user_row_key, code) VALUES (?, ?)',
      [userKey.rowKey, code]
    )

    await sendVerifyEmailCode(
      input.email,
      code
    )

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

export async function signin (input: SigninInputs) {
  try {
    const session = await getSessionStatus(userRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await getUserStatusByEmail({ email: input.email })

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      return status
    }

    const [userKeys] = await db.query<UserKeys[]>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id, password FROM users WHERE email = ?',
      [input.email]
    )

    if (!userKeys) {
      throw new Error('Contraseña no encontrada, intentalo de nuevo más tarde')
    }

    const passwordMatch = await bcrypt.compare(input.password, userKeys.password)

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const userId = { id: userKeys.id }

    if (status.error === userStatus.unverified) {
      const [verifyCode] = await db.query<VerifyEmailCode[]>(
        'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
        [userKeys.rowKey]
      )

      if (verifyCode) {
        if (
          calculateMinutes(toLocalDate(verifyCode.createdAt)) < 5 &&
          verifyCode.attempts < 2
        ) {
          return {
            data: userId,
            error: userStatus.unverified
          }
        }

        await db.query(
          'DELETE FROM users_verify_codes WHERE user_row_key = ?',
          [userKeys.rowKey]
        )
      }

      const code = createVerifyCode()

      await db.query(
        'INSERT INTO users_verify_codes (user_row_key, code) VALUES (?, ?)',
        [userKeys.rowKey, code]
      )

      await sendVerifyEmailCode(
        input.email,
        code
      )

      return {
        data: userId,
        error: userStatus.unverified
      }
    }

    const newSession = await createSession(userId, userRole)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

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

export async function signout () {
  try {
    await deleteSession(userRole)

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

export async function verifyEmail (input: VerifyCodeInputs) {
  noStore()

  try {
    const session = await getSessionStatus(userRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const userId = { id: input.id }

    const status = await getUserStatus(userId)

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      return status
    }

    const [userVerifyData] = await db.query<VerifyEmailConfirm[]>(
      'SELECT row_key AS rowKey, first_name AS name, email FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [input.id]
    )

    if (!userVerifyData) {
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
      [userVerifyData.rowKey]
    )

    if (!verifyCode) {
      throw new Error('Código no encontrado, crea otro iniciando sesión')
    }

    const deleteCurrentVerifyEmailCode = () => {
      db.query(
        'DELETE FROM users_verify_codes WHERE user_row_key = ?',
        [userVerifyData.rowKey]
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
        'UPDATE users_verify_codes SET attempts = ?, updated_at = (NOW())',
        [verifyCode.attempts + 1]
      )
      throw new Error('Código incorrecto')
    }

    await db.query(
      'UPDATE users SET verified_at = (NOW()) WHERE row_key = ?',
      [userVerifyData.rowKey]
    )

    deleteCurrentVerifyEmailCode()

    const newSession = await createSession(userId, userRole)

    if (newSession.error) {
      throw new Error(newSession.error)
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

export async function resetPasswordEmailCode (input: EmailInputs) {
  noStore()

  try {
    const session = await getSessionStatus(userRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await getUserStatusByEmail({ email: input.email })

    if (status.error) {
      throw new Error(status.error)
    }

    const [userKeyID] = await db.query<Array<RowKey & UUIDInputs>>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?',
      [input.email]
    )

    if (!userKeyID) {
      throw new Error('Hubo un problema al solicitar llave de usuario, intentalo de nuevo más tarde')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_recovery_codes WHERE user_row_key = ?',
      [userKeyID.rowKey]
    )

    if (verifyCode) {
      if (
        calculateMinutes(toLocalDate(verifyCode.createdAt)) < 5 &&
        verifyCode.attempts < 2
      ) {
        return {
          data: { id: userKeyID.id },
          error: null
        }
      }

      await db.query(
        'DELETE FROM users_recovery_codes WHERE user_row_key = ?',
        [userKeyID.rowKey]
      )
    }

    const code = createVerifyCode()

    await db.query(
      'INSERT INTO users_recovery_codes (user_row_key, code) VALUES (?, ?)',
      [userKeyID.rowKey, code]
    )

    await sendVerifyEmailCode(
      input.email,
      code
    )

    return {
      data: { id: userKeyID.id },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function resetPassword (input: ResetPasswordInputs) {
  noStore()

  try {
    const session = await getSessionStatus(userRole)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const userId = { id: input.id }

    const status = await getUserStatus(userId)

    if (
      status.error &&
      status.error !== userStatus.unverified
    ) {
      throw new Error(status.error)
    }

    const [userVerifyData] = await db.query<VerifyEmailConfirm[]>(
      'SELECT row_key AS rowKey, first_name AS name, email FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [input.id]
    )

    if (!userVerifyData) {
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyEmailCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_recovery_codes WHERE user_row_key = ?',
      [userVerifyData.rowKey]
    )

    if (!verifyCode) {
      throw new Error('Código no encontrado')
    }

    const deleteCurrentRecoveryEmailCode = () => {
      db.query(
        'DELETE FROM users_recovery_codes WHERE user_row_key = ?',
        [userVerifyData.rowKey]
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
        'UPDATE users_recovery_codes SET attempts = ?, updated_at = (NOW())',
        [verifyCode.attempts + 1]
      )
      throw new Error('Código incorrecto')
    }

    deleteCurrentRecoveryEmailCode()

    const encryptedPassword = await bcrypt.hash(
      input.password,
      10
    )

    if (!encryptedPassword) {
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    await db.query(
      'UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?, TRUE);',
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
