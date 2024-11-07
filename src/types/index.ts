import { type ReactNode } from 'react'
import { roles } from '@/lib/constants'
import { type Author as NextAuthor } from 'next/dist/lib/metadata/types/metadata-types'

export interface Title {
  title: string
}

export interface Description {
  description: string
}

export type Header = Title & Description

export type Author = Required<NextAuthor> & Description

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ImageData {
  image: ImageProps
}

export interface NavItem extends Title {
  href: string
}

export interface Nav {
  items: NavItem[]
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithChildren

export interface Item extends Header, Partial<ImageData> {
  slug?: string
}

export interface Article extends Item {
  items: string[]
}

export interface Section extends Item {
  items: Item[]
}

export type Subcategory = Item & Partial<Pick<Section, 'items'>>

export interface Category extends Item {
  items: Subcategory[]
}

export interface CardStackItem {
  name: string
  designation: string
  content: ReactNode
  image: ImageProps
}

export interface NavItemExternal extends Partial<ImageData> {
  name: string,
  url: URL | string
}

export interface Plan {
  id: 'week' | 'month'
  title: string
  description: string
  stripePriceId: string
}

export interface PlanWithPrice extends Plan {
  price: string
}

export type Roles = keyof typeof roles
