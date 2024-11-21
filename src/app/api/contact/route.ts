import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { ZodError } from 'zod'
import { contactSchema } from '@/lib/validations/contact'
import { siteName } from '@/config/site'

export async function POST (req: Request) {
  const emailFromAddress = process.env.EMAIL_FROM_ADDRESS as string
  const emailFromPassword = process.env.EMAIL_FROM_PASSWORD as string
  const appDomain = process.env.APP_DOMAIN as string

  try {
    const requestBody = await req.json()
    const validatedRequestBody = contactSchema.parse(requestBody)

    const transporter = nodemailer.createTransport({
      name: `www.${appDomain}`,
      host: `mail.${appDomain}`,
      port: 465,
      secure: true,
      auth: {
        user: emailFromAddress,
        pass: emailFromPassword
      }
    })

    await transporter.sendMail({
      from: `${siteName} ${emailFromAddress}`,
      to: emailFromAddress,
      subject: 'Nuevo mensaje desde formulario web',
      html: `
        <p><b>Nombre(s):</b> ${validatedRequestBody.firstName}</p>
        <p><b>Apellido(s):</b> ${validatedRequestBody.lastName}</p>
        <p><b>Correo electrónico:</b> ${validatedRequestBody.email}</p>
        <p><b>Teléfono:</b> ${validatedRequestBody.phone}</p>
        <p><b>Asunto:</b> ${validatedRequestBody.subject}</p>
      `
    })

    await transporter.sendMail({
      from: `${siteName} ${emailFromAddress}`,
      to: validatedRequestBody.email,
      subject: `${validatedRequestBody.firstName}, hemos recibido tu mensaje en ${siteName}`,
      html: `
          <h1><b>¡Gracias por contactarnos!</b></h1>
          <p>Un miembro de nuestro equipo se comunicará contigo.</p>
        `
    })

    return NextResponse.json(
      'Hemos recibido tu mensaje. Un miembro de nuestro equipo se comunicará contigo.'
    )
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json('Something went wrong', { status: 422 })
    }

    if (err instanceof Error) {
      return NextResponse.json('Something went wrong', { status: 500 })
    }

    return NextResponse.json('Something went wrong', { status: 500 })
  }
}
