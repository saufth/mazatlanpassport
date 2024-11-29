'use server'
import {
  unstable_noStore as noStore,
  revalidatePath
} from 'next/cache'
import { db } from '@/db'
import { getErrorMessage } from '@/lib/handle-error'
import { type CreateStoreInputs } from '@/lib/validations/store'
import type { RowKey, Status } from '@/types'

export async function createStore (
  input: CreateStoreInputs & { adminId: string }
) {
  noStore()

  try {
    const [storeWithSameName] = await db.query<Status[]>(
      'SELECT status FROM stores WHERE name = ?;',
      [input.name]
    )

    if (storeWithSameName) {
      throw new Error('El correo electrónico ya esta siendo usado')
    }

    const [adminRowKey] = await db.query<RowKey[]>(
      'SELECT row_key AS rowKey FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.adminId]
    )

    if (!adminRowKey) {
      throw new Error('Error al buscar llave de administrador')
    }

    const storeId = { id: crypto.randomUUID() }

    revalidatePath(`/admin/store/${storeId.id}`)

    await db.query(
      'INSERT INTO stores (id, name, slogan, description, phone, website, address, google_maps_id, reservation, admin_row_key) VALUES (UUID_TO_BIN(?, TRUE), ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [
        storeId.id,
        input.name,
        input.slogan,
        input.description,
        Number(`${input.countryCode}${input.phone}`),
        input.website ?? null,
        input.address ?? null,
        input.googleMapsId ?? null,
        input.reservation,
        adminRowKey.rowKey
      ]
    )

    return {
      data: storeId,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
