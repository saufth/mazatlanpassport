'use client'
import Link from 'next/link'
import Menu from '@/components/layouts/menu'
import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from 'framer-motion'
import AuthDropdown from '@/components/layouts/auth-dropdown'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { type FullNameInputs } from '@/lib/validations/full-name'

interface SiteHeaderContentProps {
  actions?: boolean
  user?: FullNameInputs | null
}

export default function SiteHeaderContent ({ actions = true, user }: SiteHeaderContentProps) {
  const { scrollYProgress } = useScroll()
  const [isOnTop, setIsOnTop] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number' && scrollYProgress.get() > 0) {
      setIsOnTop(false)
    } else {
      setIsOnTop(true)
    }
  })

  const homeNav = siteConfig.mainNav.find((navItem) => navItem.href === '/')!

  return (
    <>
      <header className='site-header w-full sticky top-0 left-0 z-40 overflow-hidden'>
        <nav
          className='container-lg h-full flex justify-between items-center relative z-10'
          aria-label={`${siteConfig.name} directory`}
        >
          <div className='w-auto h-10 md:h-11 lg:h-12 xl:h-[52px]'>
            <Link href={homeNav.href}>
              <Icons.LogotypeAlt className='w-auto h-full' />
              <span className='sr-only'>{homeNav.title}</span>
            </Link>
          </div>
          <div className='flex items-center gap-x-spacing-4'>
            <AuthDropdown user={user} actions={actions} action={closeMenu} />
            <button className='w-11 h-4 relative scale-90 sm:scale-100' onClick={toggleMenu}>
              <motion.span
                initial={{
                  top: 0,
                  left: 0
                }}
                animate={{
                  top: isMenuOpen ? 6.45 : 0,
                  left: isMenuOpen ? 4.4 : 0,
                  rotate: isMenuOpen ? 135 : 0
                }}
                transition={{
                  duration: 1,
                  type: 'spring'
                }}
                className='w-4/5 h-1 absolute bg-secondary'
              />
              <motion.span
                initial={{
                  bottom: 0,
                  right: 0
                }}
                animate={{
                  bottom: isMenuOpen ? 6.45 : 0,
                  right: isMenuOpen ? 4.4 : 0,
                  rotate: isMenuOpen ? -135 : 0
                }}
                transition={{
                  duration: 1,
                  type: 'spring'
                }}
                className='w-4/5 h-1 absolute bg-secondary'
              />
              <span className='sr-only'>Toggle menu</span>
            </button>
          </div>
        </nav>
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: isOnTop ? 0 : 1
          }}
          transition={{
            duration: 0.3
          }}
          className='absolute inset-0 m-auto bg-[oklch(var(--primary)/0.8)] backdrop-filter backdrop-blur-lg backdrop-saturate-200 opacity-0'
        >
          <div className='w-full h-full relative bg-gradient-to-r from-accent/30 via-transparent to-transparent' />
        </motion.div>
      </header>
      <AnimatePresence>
        {isMenuOpen && <Menu action={closeMenu} />}
      </AnimatePresence>
    </>
  )
}
