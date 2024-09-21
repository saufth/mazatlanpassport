import {
  number as ZodNumber,
  object as zodObject,
  type infer as zodInfer
} from 'zod'
import { createValidationErrorMessages } from '@/lib/utils'
import { GENRE } from '@/config/app'
import type { GenreISOSchemaFields, ValidationConfig } from '@/types/validations'

const validationConfig: ValidationConfig<GenreISOSchemaFields> = {
  genreISO: {
    name: 'Genero',
    required: true
  }
}

const validationErrorMessages = createValidationErrorMessages(validationConfig)

export const genreISOSchema = zodObject({
  genreISO: ZodNumber(validationErrorMessages.genreISO.required!)
    .refine((genreISO) => !GENRE.find(genreItem => genreISO === genreItem.iso),
      validationErrorMessages.genreISO.invalid
    )
})

export type GenreISOInputs = zodInfer<typeof genreISOSchema>
