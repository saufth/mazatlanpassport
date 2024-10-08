'use server'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import { db } from '@/lib/database'
import { getErrorMessage } from '@/lib/handle-error'
import { type SignupInputs } from '@/lib/validations/auth/signup'
import { type RowDataPacket } from 'mysql2'

const bcrypt = require('bcrypt')

interface Email extends RowDataPacket {
  email: string
}

interface User extends RowDataPacket, SignupInputs {
  id: string
}

export async function signup (input: SignupInputs) {
  try {
    const [userWithSameEmail] = await db.query<Email[]>(
      'SELECT id FROM users WHERE email = ?',
      [input.email]
    )

    console.log(userWithSameEmail)

    if (userWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado.')
    }

    await db.query<User[]>(
      'INSERT INTO users (id, email, password, first_name, last_name, genre_iso) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        input.email,
        bcrypt.hash(input.password, 10),
        input.firstName,
        input.lastName,
        Number(input.genreISO)
      ]
    )

    revalidatePath('/')

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
