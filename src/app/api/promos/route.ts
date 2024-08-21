import { NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'
import { type RowDataPacket } from 'mysql2'

export async function GET () {
  const result: RowDataPacket = await pool.query('select CURRENT_TIMESTAMP')
  return NextResponse.json({ message: result[0].CURRENT_TIMESTAMP })
}

export async function POST (request: Request) {
  const data = await request.json()
  console.log(data)
  return NextResponse.json('Creando promoción..')
}