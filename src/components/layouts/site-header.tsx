'use client'
import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { CallToAction } from '@/components/call-to-action'
import { Icons } from '@/components/icons'
import Menu from '@/components/layouts/menu'
import NextLink from '@/components/ui/next-link'
import { siteConfig } from '@/config/site'

export default function SiteHeader () {
  const { scrollYProgress } = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - scrollYProgress.getPrevious()!

      if (scrollYProgress.get() < 0.01) {
        setVisible(true)
      } else {
        direction < 0
          ? setVisible(true)
          : setVisible(false)
      }
    }
  })

  return (
    <>
      <motion.header
        initial={{
          y: 0
        }}
        animate={{
          y: visible || isMenuOpen ? 0 : -100
        }}
        transition={{
          duration: 0.5
        }}
        className='w-full sticky top-0 left-0 z-40 border-b border-border bg-background/90 backdrop-filter backdrop-blur backdrop-saturate-200'
      >
        <nav aria-label={`${siteConfig.name} directory`}>
          <div className='container relative z-10'>
            <div className='w-full h-header flex justify-between items-center'>
              <div className='h-8 sm:h-14'>
                <NextLink href='/' onClick={closeMenu}>
                  <Icons.Logomark className='w-auto h-full' />
                  <span className='sr-only'>{siteConfig.name} home</span>
                </NextLink>
              </div>
              <div className='flex items-center gap-x-spacing-4'>
                <div className='flex items-center gap-x-spacing-3'>
                  <CallToAction onClick={closeMenu} size='default' to='login' variant='ghost' className='hidden sm:inline-flex' />
                  <CallToAction onClick={closeMenu} size='default' className='hidden sm:inline-flex' />
                </div>
                <button className='w-9 h-2.5 relative scale-90 sm:scale-100' onClick={toggleMenu}>
                  <motion.span
                    initial={{
                      top: 0,
                      left: 0
                    }}
                    animate={{
                      top: isMenuOpen ? 3.8 : 0,
                      left: isMenuOpen ? 3.6 : 0,
                      rotate: isMenuOpen ? 45 : 0
                    }}
                    transition={{
                      duration: 1,
                      type: 'spring'
                    }}
                    className='w-4/5 h-0.5 absolute bg-foreground'
                  />
                  <motion.span
                    initial={{
                      bottom: 0,
                      right: 0
                    }}
                    animate={{
                      bottom: isMenuOpen ? 3.8 : 0,
                      right: isMenuOpen ? 3.6 : 0,
                      rotate: isMenuOpen ? -45 : 0
                    }}
                    transition={{
                      duration: 1,
                      type: 'spring'
                    }}
                    className='w-4/5 h-0.5 absolute bg-foreground'
                  />
                  <span className='sr-only'>Toggle menu</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && <Menu action={closeMenu} />}
      </AnimatePresence>
    </>
  )
}
