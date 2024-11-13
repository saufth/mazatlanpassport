'use server'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { roles, userStatus } from '@/lib/constants'
import { db } from '@/db'
import { checkUserStatus, checkUserStatusByEmail } from '@/lib/queries/users'
import { type EmailInputs } from '@/lib/validations/email'
import { type ResetPasswordInputs } from '@/lib/validations/auth/reset-password'
import { type SigninInputs } from '@/lib/validations/auth/signin'
import { type SignupInputs } from '@/lib/validations/auth/signup'
import { type UUIDInputs } from '@/lib/validations/uuid'
import { type VerifyCodeInputs } from '@/lib/validations/verify-code'
import { getErrorMessage } from '@/lib/handle-error'
import { createSession, deleteSession, getSessionStatus } from '@/lib/queries/sessions'
import { calculateMinutes, createVerifyCode } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import type { Roles } from '@/types'

interface RowKey {
  rowKey: number
}

type RowID = UUIDInputs

interface RowKeyID extends RowKey, UUIDInputs {}

interface UserKeys extends RowKey, UUIDInputs {
  password: string
}

interface VerifyCode
  extends Pick<VerifyCodeInputs, 'code'> {
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
        user: process.env.EMAIL_FROM_ADDRESS as string,
        pass: process.env.EMAIL_FROM_PASSWORD as string
      }
    })

    await transporter.sendMail({
      from: siteConfig.name,
      to: email,
      subject: `Tu código de verificación es ${code}`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 28px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>Ingrese el siguiente código de verificación cuando se te solicite:</div>
          <div style="font-size: 48px; font-weight: 700; padding: 16px 0;">${code}</div>
          <div>Por seguridad, no compartas este código.</div>
        </div>
      `
    })
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

export async function signup (input: SignupInputs) {
  try {
    const session = await getSessionStatus(roles.user)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    if (!input.terms) {
      throw new Error('Acepta los términos de servicio y privacidad')
    }

    const [userWithSameEmail] = await db.query<RowID[]>(
      'SELECT BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?',
      [input.email]
    )

    if (userWithSameEmail) {
      await db.end()
      throw new Error('El correo electrónico ya esta siendo usado')
    }

    const userId = { id: crypto.randomUUID() }
    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      await db.end()
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
      await db.end()
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
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function signin (input: SigninInputs) {
  try {
    const session = await getSessionStatus(roles.user)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await checkUserStatusByEmail({ email: input.email })

    if (status.error && status.error !== userStatus.unverified) {
      return status
    }

    const [userKeys] = await db.query<UserKeys[]>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id, password FROM users WHERE email = ?',
      [input.email]
    )

    if (!userKeys) {
      await db.end()
      throw new Error('Contraseña no encontrada, intentalo de nuevo más tarde')
    }

    const passwordMatch = await bcrypt.compare(input.password, userKeys.password)

    if (!passwordMatch) {
      await db.end()
      throw new Error('Contraseña incorrecta')
    }

    const userId = { id: userKeys.id }

    if (status.error === userStatus.unverified) {
      const [verifyCode] = await db.query<VerifyCode[]>(
        'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
        [userKeys.rowKey]
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
          [userKeys.rowKey]
        )
      }

      const code = createVerifyCode()

      await db.query(
        'INSERT INTO users_verify_codes (user_row_key, code) VALUES (?, ?)',
        [userKeys.rowKey, code]
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
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

export async function verifyEmail (input: VerifyCodeInputs) {
  try {
    const session = await getSessionStatus(roles.user)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, solo puedes iniciar sesión en una cuenta a la vez')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const userId: UUIDInputs = { id: input.id }

    const status = await checkUserStatus(userId)

    if (status.error && status.error !== userStatus.unverified) {
      return status
    }

    const [userData] = await db.query<UserVerifyData[]>(
      'SELECT row_key AS rowKey, first_name AS firstName, email FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [input.id]
    )

    if (!userData) {
      await db.end()
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ?',
      [userData.rowKey]
    )

    if (!verifyCode) {
      await db.end()
      throw new Error('Código no encontrado, crea otro iniciando sesión')
    }

    const deleteCurrentVerifyEmailCode = () => {
      db.query(
        'DELETE FROM users_verify_codes WHERE user_row_key = ?',
        [userData.rowKey]
      )
    }

    console.log(verifyCode.createdAt)
    console.log(new Date().toString())
    console.log(calculateMinutes(new Date(verifyCode.createdAt)) >= 5)

    if (calculateMinutes(new Date(verifyCode.createdAt)) >= 5) {
      deleteCurrentVerifyEmailCode()
      await db.end()
      throw new Error('El código ha caducado, crea otro iniciando sesión')
    }

    if (verifyCode.attempts > 2) {
      deleteCurrentVerifyEmailCode()
      await db.end()
      throw new Error('Demasiados intentos, crea otro código iniciando sesión')
    }

    if (verifyCode.code !== input.code) {
      await db.query(
        'UPDATE users_verify_codes SET attempts = ?, updated_at = (NOW())',
        [verifyCode.attempts + 1]
      )
      await db.end()
      throw new Error('Código incorrecto')
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
        user: process.env.EMAIL_FROM_ADDRESS as string,
        pass: process.env.EMAIL_FROM_PASSWORD as string
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

export async function resetPasswordEmailCode (input: EmailInputs) {
  try {
    const session = await getSessionStatus(roles.user)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const status = await checkUserStatusByEmail({ email: input.email })

    if (status.error) {
      throw new Error(status.error)
    }

    const [userKeys] = await db.query<RowKeyID[]>(
      'SELECT row_key AS rowKey, BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?',
      [input.email]
    )

    if (!userKeys) {
      await db.end()
      throw new Error('Hubo un problema al solicitar llave de usuario, intentalo de nuevo más tarde')
    }

    const [verifyCode] = await db.query<VerifyCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_recovery_codes WHERE user_row_key = ?',
      [userKeys.rowKey]
    )

    if (verifyCode) {
      if (calculateMinutes(new Date(verifyCode.createdAt)) < 5 && verifyCode.attempts < 2) {
        await db.end()
        return {
          data: { id: userKeys.id },
          error: null
        }
      }

      await db.query(
        'DELETE FROM users_recovery_codes WHERE user_row_key = ?',
        [userKeys.rowKey]
      )
    }

    const code = createVerifyCode()

    await db.query(
      'INSERT INTO users_recovery_codes (user_row_key, code) VALUES (?, ?)',
      [userKeys.rowKey, code]
    )

    await db.end()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM_ADDRESS as string,
        pass: process.env.EMAIL_FROM_PASSWORD as string
      }
    })

    await transporter.sendMail({
      from: siteConfig.name,
      to: input.email,
      subject: `Tu código de recuperación es ${code}`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 28px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>Ingrese el siguiente código de recuperación cuando se te solicite:</div>
          <div style="font-size: 48px; font-weight: 700; padding: 16px 0;">${code}</div>
          <div>Por seguridad, no compartas este código.</div>
        </div>
      `
    })

    return {
      data: { id: userKeys.id },
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
  try {
    const session = await getSessionStatus(roles.user)

    if (session.data?.status) {
      throw new Error('Actualmente tienes una sesión activa, actualiza tus datos en la configuración de tu perfil')
    }

    if (session.error) {
      throw new Error(session.error)
    }

    const userId: UUIDInputs = { id: input.id }

    const status = await checkUserStatus(userId)

    if (status.error && status.error !== userStatus.unverified) {
      throw new Error(status.error)
    }

    const [userData] = await db.query<UserVerifyData[]>(
      'SELECT row_key AS rowKey, first_name AS firstName, email FROM users WHERE id = UUID_TO_BIN(?, TRUE)',
      [input.id]
    )

    if (!userData) {
      await db.end()
      throw new Error('No hemos encontrado la cuenta con este ID')
    }

    const [verifyCode] = await db.query<VerifyCode[]>(
      'SELECT code, attempts, created_at AS createdAt FROM users_recovery_codes WHERE user_row_key = ?',
      [userData.rowKey]
    )

    if (!verifyCode) {
      await db.end()
      throw new Error('Código no encontrado')
    }

    const deleteCurrentRecoveryEmailCode = () => {
      db.query(
        'DELETE FROM users_recovery_codes WHERE user_row_key = ?',
        [userData.rowKey]
      )
    }

    if (calculateMinutes(new Date(verifyCode.createdAt)) >= 5) {
      deleteCurrentRecoveryEmailCode()
      await db.end()
      throw new Error('El código ha caducado')
    }

    if (verifyCode.attempts > 2) {
      deleteCurrentRecoveryEmailCode()
      await db.end()
      throw new Error('Demasiados intentos')
    }

    if (verifyCode.code !== input.code) {
      await db.query(
        'UPDATE users_recovery_codes SET attempts = ?, updated_at = (NOW())',
        [verifyCode.attempts + 1]
      )
      await db.end()
      throw new Error('Código incorrecto')
    }

    deleteCurrentRecoveryEmailCode()

    const encryptedPassword = await bcrypt.hash(input.password, 10)

    if (!encryptedPassword) {
      await db.end()
      throw new Error('Error al intentar encriptar contraseña, intentalo de nuevo más tarde')
    }

    await db.query(
      'UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?, TRUE);',
      [
        encryptedPassword,
        input.id
      ]
    )

    await db.end()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM_ADDRESS as string,
        pass: process.env.EMAIL_FROM_PASSWORD as string
      }
    })

    await transporter.sendMail({
      from: siteConfig.name,
      to: userData.email,
      subject: `${userData.firstName}, tu contraseña se actualizó exitosamente`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 32px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>${userData.firstName}, tu contraseña se actualizó exitosamente.</div>
        </div>
      `
    })

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
