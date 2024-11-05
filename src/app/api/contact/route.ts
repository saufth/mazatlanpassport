import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { ZodError } from 'zod'
import { contactSchema } from '@/lib/validations/contact'
import { siteConfig, contactConfig } from '@/config/site'

export async function POST (req: Request) {
  try {
    const domain = String(process.env.APP_DOMAIN)
    const requestBody = await req.json()
    const validatedRequestBody = contactSchema.parse(requestBody)

    const transporter = nodemailer.createTransport({
      name: `www.${domain}`,
      host: `mail.${domain}`,
      port: 465,
      secure: true,
      auth: {
        user: contactConfig.email,
        pass: String(process.env.APP_EMAIL_PASSWORD)
      }
    })

    await transporter.sendMail({
      from: `${siteConfig.name} ${contactConfig.email}`,
      to: contactConfig.email,
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
      from: `${siteConfig.name} ${contactConfig.email}`,
      to: validatedRequestBody.email,
      subject: `${validatedRequestBody.firstName}, hemos recibido tu mensaje en ${siteConfig.name}`,
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
