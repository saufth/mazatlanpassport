import { siteConfig } from '@/config/site'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize (text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`
}

export function absoluteUrl (path: string = '/') {
  return `${siteConfig.url}${path}`
}

export function formatPhoneNumber (phoneNumber: string | number) {
  const cleanedNumber = String(phoneNumber).replace(/\D/g, '')

  if (cleanedNumber.length < 10 || cleanedNumber.length > 14) {
    return cleanedNumber
  } else if (cleanedNumber.length === 10) {
    const numberSections = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
    return numberSections ? `(${numberSections[1]}) ${numberSections[2]}-${numberSections[3]}` : cleanedNumber
  }

  const dialCode = cleanedNumber.slice(0, cleanedNumber.length - 10)
  const number = cleanedNumber.slice(-10)
  const numberSections = number.match(/^(\d{3})(\d{3})(\d{4})$/)

  return numberSections ? `+${dialCode} (${numberSections[1]}) ${numberSections[2]}-${numberSections[3]}` : cleanedNumber
}

export function createWhatsappUrl (phoneNumber: string, message?: string) {
  return `https://wa.me/${phoneNumber}${message ? `?text=${message.replaceAll(' ', '+')}` : ''}`
}

export function range (start: number, end: number, step: number = 1) {
  return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + (i * step))
}

export function formatPrice (
  price: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: opts.currency ?? 'MXN',
    notation: opts.notation ?? 'compact',
    ...opts
  }).format(Number(price))
}

export function convertToSubcurrency (amount: number, factor: number = 100) {
  return Math.round(amount * factor)
}

export function randomNumber (min: number, max: number) {
  return Math.floor(Math.random() * (min - max + 1)) + max
}

export function createVerifyCode () {
  return randomNumber(100000, 999999)
}

export function calculateYears (dateA: Date, dateB?: Date) {
  dateB = dateB || new Date()
  let years = new Date(dateB).getFullYear() - new Date(dateA).getFullYear()
  let month = new Date(dateB).getMonth() - new Date(dateA).getMonth()
  const dateDifference = new Date(dateB).getDay() - new Date(dateA).getDay()
  if (dateDifference < 0) month -= 1
  if (month < 0) years -= 1
  return years
}

export function calculateMinutes (dateA: Date, dateB?: Date) {
  return ((dateB || new Date()).getTime() - dateA.getTime()) / 60000
}
