import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Author } from '@/types'

export interface LinkAuthorProps extends Author {
  className?: string
}

export const LinkAuthor = ({ name, description, url, className }: LinkAuthorProps) => {
  const href = typeof url === 'string' ? url : url.href

  return (
    <Link
      href={href}
      target='_blank'
      title={description}
      rel='nooponer noreferrer'
      className={cn('border-b hover:border-primary', className)}
    >
      <b>
        {name}
      </b>
    </Link>
  )
}
