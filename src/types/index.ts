import { type ReactNode } from 'react'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type NameInputs } from '@/lib/validations/common/name'
import { type PasswordInputs } from '@/lib/validations/common/password'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { type VerifyCodeInputs } from '@/lib/validations/auth'
import { Icons } from '@/components/icons'

export interface Title {
  title: string
}

export interface Description {
  description: string
}

export interface Header
  extends Title,
    Description {}

export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ImageData {
  image: ImageProps
}

export interface NavItem {
  title: string
  href: string
  active?: boolean
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface Nav {
  items: NavItem[]
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithChildren

export type SidebarNavItem = NavItemWithChildren

export interface Item
  extends Header,
    Partial<ImageData> {
  slug?: string
}

export interface Article extends Item {
  items: string[]
}

export interface ItemList {
  items: Item[]
}

export interface Section
  extends Item,
  ItemList {}

export interface Subcategory
  extends Item,
    Partial<ItemList> {}

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
  days: number
  stripePriceId: string
}

export interface PlanWithPrice extends Plan {
  price: string
}

export interface UserPlan extends Plan {
  paidInCash: boolean
  stripePaymentIntentId?: string | null
  expiresAt: string
  isSubscribed: boolean
  isCanceled: boolean
  isActive: boolean
}

export interface Status {
  status: boolean
}

export interface RowKey {
  rowKey: number
}

export interface UserStatus extends Status {
  verifiedAt?: string
  blocked: boolean
}
export interface UserKeys
  extends RowKey,
    UUIDInputs,
    PasswordInputs {}

export type VerifyCode = Pick<VerifyCodeInputs, 'code'>

export interface VerifyEmailCode
  extends VerifyCode {
    attempts: number
    createdAt: string
}

export interface VerifyEmailConfirm
  extends RowKey,
    EmailInputs,
    NameInputs {}
