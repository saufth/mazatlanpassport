import 'server-only'
import { unstable_cache as cache } from 'next/cache'
import { RowKey } from '@/types'
import { db } from '@/db'
import { StoreInputs } from '../validations/store'
import { getErrorMessage } from '../handle-error'

export async function getStoresByAdminId (input: { adminId: string }) {
  return await cache(
    async () => {
      try {
        const [adminRowKey] = await db.query<RowKey[]>(
          'SELECT row_key AS rowKey FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
          [input.adminId]
        )

        if (!adminRowKey) {
          throw new Error('Hubo un problema al buscar datos del administrador, intentalo de nuevo más tarde')
        }

        const stores = await db.query<StoreInputs[]>(
          'SELECT BIN_TO_UUID(id, TRUE) AS id, name, slogan, description, phone, website, address, google_maps_id AS googleMapsId, image_profile AS imageProfile, image_cover AS imageCover, facebook_id AS facebookId, instagram_id AS instagramId, twitter_id AS twitterId, tiktok_id AS tiktokId, reservation FROM stores WHERE admin_row_key = ? AND status = 1 ORDER BY created_at DESC;',
          [adminRowKey.rowKey]
        )

        if (!stores) {
          throw new Error('Hubo un problema al buscar datos del establecimiento, intentalo de nuevo más tarde')
        }

        return stores
      } catch {
        return null
      }
    },
    [`stores-${input.adminId}`],
    {
      revalidate: 900,
      tags: [`stores-${input.adminId}`]
    }
  )()
}

export async function getLastStoreIdByAdminId (input: { adminId: string }) {
  try {
    const [adminRowKey] = await db.query<RowKey[]>(
      'SELECT row_key AS rowKey FROM admins WHERE id = UUID_TO_BIN(?, TRUE);',
      [input.adminId]
    )

    if (!adminRowKey) {
      throw new Error('Hubo un problema al buscar datos del administrador, intentalo de nuevo más tarde')
    }

    const [storeId] = await db.query<Array<{ storeId: string }>>(
      'SELECT BIN_TO_UUID(id, TRUE) AS storeId FROM stores WHERE admin_row_key = ? AND status = 1 ORDER BY created_at DESC;',
      [adminRowKey.rowKey]
    )

    return {
      data: storeId ?? null,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err)
    }
  }
}
