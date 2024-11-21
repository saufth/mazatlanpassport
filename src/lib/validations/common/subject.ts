import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const subjectSchema = zodObject({
  subject: zodString({ required_error: 'El Asunto es requqrido' })
    .min(4, { message: 'El Asunto debe tener de 4 a 512 caracteres' })
    .max(512, { message: 'El Asunto debe tener de 4 a 512 caracteres' })
})

export type SubjectInputs = zodInfer<typeof subjectSchema>
