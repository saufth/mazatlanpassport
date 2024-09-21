import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import { db } from '@/lib/database'
import { getErrorMessage } from '@/lib/handle-error'
import { type SignupInputs } from '@/lib/validations/auth/signup'

const bcrypt = require('bcrypt')

export async function signup (input: SignupInputs) {
  try {
    const userWithSameEmail = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [input.email]
    )

    if (userWithSameEmail) {
      throw new Error('El correo electrónico ya esta siendo usado.')
    }

    await db.query(
      'INSERT INTO users (id, email, password, first_name, last_name, phone, genre_iso) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        input.email,
        bcrypt.hash(input.password, 10),
        input.firstName,
        input.lastName,
        input.phone,
        input.genreISO
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
