// import nodemailer from 'nodemailer'
// import { z } from 'zod'
// import { mysqlPool } from '@/lib/mysql'
// import { signupSchema } from '@/lib/validations/signup'
// import { siteConfig, contactConfig, domain } from '@/config/site'

// // export const runtime = 'edge'

// export async function POST (req: Request) {
//   try {
//     const input = signupSchema.parse(await req.json())

//     const transporter = nodemailer.createTransport({
//       name: `www.${domain}`,
//       host: `mail.${domain}`,
//       port: 465,
//       secure: true,
//       auth: {
//         user: contactConfig.email,
//         pass: String(process.env.EMIAL_CONTACT)
//       }
//     })

//     await transporter.sendMail({
//       from: `${siteConfig.name} ${contactConfig.email}`,
//       to: contactConfig.email,
//       subject: 'Nuevo mensaje desde formulario web',
//       html: `
//         <p><b>Nombre(s):</b> ${input.firstName}</p>
//         <p><b>Apellido(s):</b> ${input.lastName}</p>
//         <p><b>Correo electrónico:</b> ${input.email}</p>
//         <p><b>Teléfono:</b> ${input.phone}</p>
//         <p><b>Asunto:</b> ${input.subject}</p>
//       `
//     })

//     await transporter.sendMail({
//       from: `${siteConfig.name} ${contactConfig.email}`,
//       to: input.email,
//       subject: `${input.firstName}, hemos recibido tu mensaje en ${siteConfig.name}`,
//       html: `
//           <h1><b>¡Gracias por contactarnos!</b></h1>
//           <p>Un miembro de nuestro equipo se comunicará contigo en breve.</p>
//         `
//     })

//     return new Response(null, { status: 200 })
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return new Response('Something went wrong', { status: 422 })
//     }

//     if (err instanceof Error) {
//       return new Response('Something went wrong', { status: 500 })
//     }

//     return new Response('Something went wrong', { status: 500 })
//   }
// }
