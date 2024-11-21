import 'server-only'
import { Nodemailer } from '@/lib/nodemailer'
import { getErrorMessage } from '@/lib/handle-error'
import { siteName } from '@/config/site'

export async function sendVerifyEmailCode (email: string, code: number) {
  try {
    await Nodemailer.sendMail({
      from: siteName,
      to: email,
      subject: `Tu código de verificación es ${code}`,
      html: `
        <div style="max-width: 640px; margin: 0 auto; padding: 64px auto;">
          <div style="font-size: 28px; font-weight: 600; padding-bottom: 12px;">
            ${siteName}
          </div>
          <div>
            Ingresa el siguiente código de verificación cuando se te solicite:
          </div>
          <div style="font-size: 48px; font-weight: 700; padding: 16px 0;">
            ${code}
          </div>
          <div>
            Por seguridad, no compartas este código.
          </div>
        </div>
      `
    })
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}
