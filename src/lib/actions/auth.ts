'use server'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { roles, userStatus } from '@/lib/constants'
import { db } from '@/db'
import { checkUserStatus } from '@/lib/actions/users'
import { type RowDataPacket } from 'mysql2'
import { type SignupInputs } from '@/lib/validations/auth/signup'
import { type VerifyCodeInputs } from '@/lib/validations/verify-code'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { type SigninInputs } from '@/lib/validations/auth/signin'
import { getErrorMessage } from '@/lib/handle-error'
import { createSession, deleteSession, getSessionToken } from '@/lib/actions/session'
import { calculateMinutes, createVerifyCode } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import type { Roles } from '@/types'

interface RowKey extends RowDataPacket {
  rowKey: number
}

interface RowID extends RowDataPacket, UUIDInputs {}

interface RowKeyID extends RowKey, UUIDInputs {}

interface Password extends RowDataPacket {
  password: string
}

interface VerifyCode
  extends RowDataPacket,
    Pick<VerifyCodeInputs, 'code'> {
    attempts: number
    createdAt: string
}

interface UserVerifyData
  extends RowKey,
    Pick<SigninInputs, 'email'>,
    Pick<SignupInputs, 'firstName'> {}

const sendVerifyEmailCode = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sauft.dev@gmail.com',
        pass: String(process.env.GOOGLE_APP_PASSWORD)
      }
    })

    await transporter.sendMail({
      from: siteConfig.name,
      to: email,
      subject: `Tu codigo de verificación es ${code}`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 28px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>Ingrese el siguiente código de verificación cuando se le solicite:</div>
          <div style="font-size: 48px; font-weight: 700; padding: 16px 0;">${code}</div>
          <div>Por seguridad, no compartas este codigo.</div>
        </div>
      `
    })
  } catch {
    throw new Error('Problemas al envias codigo de verificación, intenta crear otro iniciando sesión')
  }
}

export async function signup (input: SignupInputs) {
  try {
    const session = await getSessionToken(roles.user)

    if (session.data) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (!input.terms) {
      throw new Error('Acepta los términos de servicio y privacidad')
    }

    const [userWithSameEmail] = await db.query<RowID[]>(
      'SELECT BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?',
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

    await db.end()

    await sendVerifyEmailCode(input.email, code)

    return {
      data: userId,
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

export async function signin (input: SigninInputs) {
  try {
    const session = await getSessionToken(roles.user)

    if (session.data) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    const [userData] = await db.query<RowKeyID[]>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?',
      [input.email]
    )

    if (!userData) {
      throw new Error('El usuario no existe')
    }

    const userId: UUIDInputs = { id: userData.id }

    const userStatusData = await checkUserStatus(userId)

    if (userStatusData.error && userStatusData.error !== userStatus.unverified) {
      await db.end()
      return userStatusData
    }

    const [userPassword] = await db.query<Password[]>(
      'SELECT password FROM users WHERE row_key = ?',
      [userData.rowKey]
    )

    if (!userPassword) {
      throw new Error('Contraseña no encontrada, intentalo de nuevo más tarde')
    }

    const passwordMatch = await bcrypt.compare(input.password, userPassword.password)

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    if (userStatusData.error === userStatus.unverified) {
      const [verifyCode] = await db.query<VerifyCode[]>(
        'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
        [userData.rowKey]
      )

      if (verifyCode) {
        if (calculateMinutes(new Date(verifyCode.createdAt)) < 5 && verifyCode.attempts < 2) {
          await db.end()
          return {
            data: userId,
            error: userStatus.unverified
          }
        }

        await db.query(
          'DELETE FROM users_verify_codes WHERE user_row_key = ?',
          [userData.rowKey]
        )
      }

      const code = createVerifyCode()

      await db.query(
        'INSERT INTO users_verify_codes (user_row_key, code) VALUES (?, ?)',
        [userData.rowKey, code]
      )

      await db.end()

      await sendVerifyEmailCode(input.email, code)

      return {
        data: userId,
        error: userStatus.unverified
      }
    }

    await db.end()

    const newSession = await createSession(userId, roles.user)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

    return {
      data: userId,
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

export async function verifyEmail (input: VerifyCodeInputs) {
  try {
    const session = await getSessionToken(roles.user)

    if (session.data) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    const userId: UUIDInputs = { id: input.id }

    const userStatusData = await checkUserStatus(userId)

    if (userStatusData.error && userStatusData.error !== userStatus.unverified) {
      return userStatusData
    }

    const [userData] = await db.query<UserVerifyData[]>(
      'SELECT row_key AS rowKey, first_name AS firstName, email FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [input.id]
    )

    if (!userData) {
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
      [userData.rowKey]
    )

    if (!verifyCode) {
      throw new Error('Codigo no encontrado, crea otro iniciando sesión')
    }

    const deleteCurrentVerifyEmailCode = () => {
      db.query(
        'DELETE FROM users_verify_codes WHERE user_row_key = ?',
        [userData.rowKey]
      )
    }

    if (calculateMinutes(new Date(verifyCode.createdAt)) >= 5) {
      deleteCurrentVerifyEmailCode()
      throw new Error('El codigo ha caducado, crea otro iniciando sesión')
    }

    if (verifyCode.attempts > 2) {
      deleteCurrentVerifyEmailCode()
      throw new Error('Demasiados intentos, crea otro codigo iniciando sesión')
    }

    if (verifyCode.code !== input.code) {
      await db.query(
        'UPDATE users_verify_codes SET attempts = ?, updated_at = (NOW())',
        [verifyCode.attempts + 1]
      )
      throw new Error('Codigo incorrecto')
    }

    await db.query(
      'UPDATE users SET verified_at = (NOW()) WHERE row_key = ?',
      [userData.rowKey]
    )

    deleteCurrentVerifyEmailCode()

    await db.end()

    const newSession = await createSession(userId, roles.user)

    if (newSession.error) {
      throw new Error(newSession.error)
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sauft.dev@gmail.com',
        pass: String(process.env.GOOGLE_APP_PASSWORD)
      }
    })

    await transporter.sendMail({
      from: siteConfig.name,
      to: userData.email,
      subject: `${userData.firstName}, tu cuenta se verificó exitosamente`,
      text: '!Estas a nada de disfuta de descuentos exclusivos!',
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 32px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>${userData.firstName}, tu cuenta se ha verificado.</div>
        </div>
      `
    })

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

export async function signout (role: Roles) {
  try {
    await deleteSession(role)

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
