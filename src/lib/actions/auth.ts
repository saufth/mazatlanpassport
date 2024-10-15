'use server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { type RowDataPacket } from 'mysql2'
import { db } from '@/lib/database'
import { getErrorMessage } from '@/lib/handle-error'
import { type SignupInputs } from '@/lib/validations/auth/signup'
import { type VerifyCodeInputs } from '@/lib/validations/verify-code'
import { calculateMinutes, createVerifyCode } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const bcrypt = require('bcrypt')

interface Email extends RowDataPacket {
  email: string
}

interface UserKey extends RowDataPacket {
  rowKey: number
}

export async function signup (input: SignupInputs) {
  try {
    if (!input.terms) {
      throw new Error('Acepta los términos de servicio y privacidad.')
    }

    const [userWithSameEmail] = await db.query<Email[]>(
      'SELECT BIN_TO_UUID(id, TRUE) AS id FROM users WHERE email = ?;',
      [input.email]
    )

    if (userWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado.')
    }

    const userId = crypto.randomUUID()
    const encryptedPassword = await bcrypt.hash(input.password, 10)

    await db.query(
      'INSERT INTO users (id, email, password, first_name, last_name, genre_iso, birthday) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?, ?);',
      [
        userId,
        input.email,
        encryptedPassword,
        input.firstName,
        input.lastName,
        Number(input.genreISO),
        new Date(input.age)
      ]
    )

    const [userKey] = await db.query<UserKey[]>(
      'SELECT row_key AS rowKey FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [userId]
    )

    const verifyCode = createVerifyCode()

    await db.query(
      'INSERT INTO users_verify_codes (user_row_key, code) VALUES (?, ?);',
      [userKey.rowKey, verifyCode]
    )

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
      to: input.email,
      subject: 'Tu codigo de verificación de registro',
      text: `${verifyCode} es tu codigo de verificación`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 32px; font-weight: 600; padding-bottom: 12px;">${siteConfig.name}</div>
          <div>Ingrese el siguiente código de verificación cuando se le solicite:</div>
          <div style="font-size: 48px; font-weight: 700; padding: 16px 0;">${verifyCode}</div>
          <div>Por seguridad, no compartas este codigo.</div>
        </div>
      `
    })

    return {
      data: { id: userId },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}

interface VerifyCode extends RowDataPacket {
  id: number
  createdAt: string
}

interface UserData extends UserKey {
  firstName: string
  email: string
  verifiedAt?: string
}

export async function verifyEmail (input: VerifyCodeInputs) {
  try {
    const [userData] = await db.query<UserData[]>(
      'SELECT row_key AS rowKey, first_name AS firstName, email, verified_at AS verifiedAt FROM users WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.id]
    )

    if (!userData) {
      throw new Error('Este usuario no existe.')
    }

    if (userData.verifiedAt) {
      throw new Error('El usuario ya esta verificado.')
    }

    const [verifyCode] = await db.query<VerifyCode[]>(
      'SELECT created_at AS createdAt FROM users_verify_codes WHERE user_row_key = ? AND code = ?;',
      [userData.rowKey, input.code]
    )

    if (!verifyCode) {
      throw new Error('Codigo incorrecto.')
    }

    if (calculateMinutes(new Date(verifyCode.createdAt)) > 5) {
      throw new Error('El codigo ha caducado, crea otro en iniciando sesión.')
    }

    await db.query(
      'UPDATE users SET verified_at = (NOW()) WHERE row_key = ?;',
      [userData.rowKey]
    )

    await db.query(
      'DELETE FROM users_verify_codes WHERE user_row_key = ?;',
      [userData.rowKey]
    )

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
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
