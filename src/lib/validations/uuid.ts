import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const uuidSchema = zodObject({
  id: zodString({ required_error: 'UUID requerida' })
    .uuid({ message: 'UUID no valida' })
})

export type UUIDInputs = zodInfer<typeof uuidSchema>
