import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { siteConfig } from '@/config/site'
import type {
  DocumentElementWithFullscreen,
  DocumentWithFullscreen
} from '@/types'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify (str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function absoluteUrl (path: string = '/') {
  return `${siteConfig.url}${path}`
}

export function toTitleCase (title: string) {
  return title.replace(/\w\S*/g, (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
}

export const capitalize = (text: string): string => (
  `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`
)

export function calculateYears (dateA: Date, dateB: Date) {
  let years = new Date(dateB).getFullYear() - new Date(dateA).getFullYear()
  let month = new Date(dateB).getMonth() - new Date(dateA).getMonth()
  const dateDiff = new Date(dateB).getDay() - new Date(dateA).getDay()
  if (dateDiff < 0) month -= 1
  if (month < 0) years -= 1
  return years
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

export function formatPrice (
  price: number | string,
  currency: 'usd' | 'eur' | 'mxn' = 'mxn',
  notation: 'compact' | 'engineering' | 'scientific' | 'standard' = 'standard',
  minimumFractionDigits = 0
) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits
  }).format(Number(price))
}

export function convertToSubcurrency (amount: number, factor: number = 100) {
  return Math.round(amount * factor)
}

export function requestFullScreen (element: DocumentElementWithFullscreen) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

export function isFullScreen (): boolean {
  const doc = document as DocumentWithFullscreen
  return !!(doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement)
}

export function exitFullScreen (doc: DocumentWithFullscreen) {
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  }
}

export function toogleFullScreen (): void {
  if (isFullScreen()) {
    requestFullScreen(document.documentElement)
  } else {
    exitFullScreen(document)
  }
}
