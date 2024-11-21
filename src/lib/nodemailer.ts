import 'server-only'
import { createTransport } from 'nodemailer'

export const Nodemailer = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM_ADDRESS as string,
    pass: process.env.EMAIL_FROM_PASSWORD as string
  }
})
