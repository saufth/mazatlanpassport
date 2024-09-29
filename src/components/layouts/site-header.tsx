'use client'
import NextLink from '@/components/ui/next-link'
import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CallToAction } from '@/components/call-to-action'
import { Icons } from '@/components/icons'
import Menu from '@/components/layouts/menu'
import { siteConfig } from '@/config/site'

export default function SiteHeader () {
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
      <header className='w-full h-header sticky top-0 left-0 z-40 overflow-hidden'>
        <nav
          className='h-fit relative z-10'
          aria-label={`${siteConfig.name} directory`}
        >
          <motion.div
            initial={{
              paddingTop: 'var(--site-header-gutter-y-top)',
              paddingBottom: 'var(--site-header-gutter-y-top)'
            }}
            animate={{
              paddingTop: isOnTop ? 'var(--site-header-gutter-y-top)' : 'var(--site-header-gutter-y)',
              paddingBottom: isOnTop ? 'var(--site-header-gutter-y-top)' : 'var(--site-header-gutter-y)'
            }}
            className='py-[var(--site-header-gutter-y-top)] container flex justify-between items-center relative z-10'
          >
            <motion.div
              initial={{
                height: 'var(--site-header-logo-height-top)'
              }}
              animate={{
                height: isOnTop ? 'var(--site-header-logo-height-top)' : 'var(--site-header-logo-height)'
              }}
              transition={{
                duration: 0.3
              }}
              className='w-auto h-[var(--site-header-logo-height-top)]'
            >
              <NextLink href={homeNav.href}>
                <Icons.LogotypeAlt className='w-auto h-full' />
                <span className='sr-only'>{homeNav.title}</span>
              </NextLink>
            </motion.div>
            <div className='flex items-center gap-x-spacing-4'>
              <div className='flex items-center gap-x-spacing-3'>
                <CallToAction
                  to='login'
                  onClick={closeMenu}
                  size='default'
                  variant='ghost'
                  className='hidden sm:inline-flex'
                />
                <CallToAction
                  onClick={closeMenu}
                  size='default'
                  className='hidden sm:inline-flex'
                />
              </div>
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
          </motion.div>
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: isOnTop || isMenuOpen ? 0 : 1
            }}
            transition={{
              duration: 0.3
            }}
            className='absolute inset-0 m-auto bg-[oklch(var(--primary)/0.8)] backdrop-filter backdrop-blur-md backdrop-saturate-200 opacity-0'
          >
            <div className='w-full h-full relative bg-gradient-to-r from-accent/40 via-transparent to-transparent' />
          </motion.div>
        </nav>
      </header>
      <AnimatePresence>
        {isMenuOpen && <Menu action={closeMenu} />}
      </AnimatePresence>
    </>
  )
}
