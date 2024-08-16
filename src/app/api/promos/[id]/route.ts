import { NextResponse } from 'next/server'

export function GET () {
  return NextResponse.json('Obteneiendo promoción..')
}

export function DELETE () {
  return NextResponse.json('Eleminando promoción..')
}

export async function PUT () {
  return NextResponse.json('Actualizando promoción..')
}
