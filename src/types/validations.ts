import type { Message, Limits } from '@/types'

export interface RequiredErrorMessage {
  required_error: string
}

export interface ValidationData {
  name: string
  invalid?: boolean
  required?: boolean
  limits?: Limits
}

export type EmailSchemaFields = 'email'
export type FullNameSchemaFields = 'firstName' | 'lastName'
export type PhoneSchemaFields = 'phone'
export type SubjectSchemaFields = 'subject'
export type PasswordSchemaFields = 'password'
export type SignupSchemaFields = 'confirmPassword'
export type GenreISOSchemaFields = 'genreISO'
export type ValidationSchemaFields = EmailSchemaFields
  | FullNameSchemaFields
  | PhoneSchemaFields
  | SubjectSchemaFields
  | PasswordSchemaFields
  | SignupSchemaFields
  | GenreISOSchemaFields

export type ValidationConfig<T
  extends string
> = Record<T, ValidationData>

export interface ValidationErrorMessages {
  invalid?: Message
  limits?: Message
  required?: RequiredErrorMessage
}

export type ValidationErrorMessagesConfig = Record<string, ValidationErrorMessages>
