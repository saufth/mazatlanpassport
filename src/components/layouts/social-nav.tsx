import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/icons'
import { type MainNavProps } from '@/components/layouts/main-nav'
import { capitalize, cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import type { Nav } from '@/types'

type SocialNavIconProps = Pick<MainNavProps, 'muted'>

export const socialIcons = [
  {
    title: 'facebook',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Facebook className={cn('w-auto h-10 md:h-11 lg:h-12 fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  },
  {
    title: 'instagram',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Instagram className={cn('w-auto h-10 md:h-11 lg:h-12 fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  },
  {
    title: 'tiktok',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Tiktok className={cn('w-auto h-10 md:h-11 lg:h-12 fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  },
  {
    title: 'twitter',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Twitter className={cn('w-auto h-[30px] md:h-[33px] lg:h-[36px] fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  },
  {
    title: 'linkedin',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Linkedin className={cn('w-auto h-10 md:h-11 lg:h-12 fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  },
  {
    title: 'whatsapp',
    Icon: ({ muted }: SocialNavIconProps) => <Icons.Whatsapp className={cn('w-auto h-[30px] md:h-[33px] lg:h-[36px] fill-secondary hover:fill-accent transition-colors', muted && 'fill-secondary-foreground hover:fill-white')} />
  }
]

type SocialNavProps = Nav & MainNavProps

const SocialNav = ({ items, action, muted }: SocialNavProps) => {
  return (
    <ul className='flex gap-x-3 items-center'>
      {items.map((socialItem, key) => {
        const socialIcon = socialIcons.find((socialIcon) => socialIcon.title === socialItem.title)
        const socialTitle = capitalize(socialItem.title)

        return (
          <li key={key}>
            <Link
              href={socialItem.href}
              onClick={action}
              aria-label={`${socialTitle} - ${siteConfig.name}`}
              target='_blank'
              rel='nooponer noreferrer'
            >
              {socialIcon
                ? <socialIcon.Icon muted={muted} />
                : <ArrowRightIcon className={cn('w-7 h-7', muted && 'stroke-secondary-foreground')} />}
              <span className='sr-only'>{socialTitle}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialNav
