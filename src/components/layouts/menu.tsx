'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import MainNav, { type MainNavProps } from '@/components/layouts/main-nav'
import { cn } from '@/lib/utils'

export default function Menu ({ action, muted }: MainNavProps) {
  useEffect(() => {
    const documentBody = document.body
    const documentWidth = document.documentElement.clientWidth
    const windowWidth = window.innerWidth
    const scrollBarWidth = windowWidth - documentWidth
    documentBody.style.overflow = 'hidden'
    documentBody.style.scrollBehavior = 'touch'
    documentBody.style.paddingRight = `${scrollBarWidth}px`
    documentBody.ontouchstart = (e) => {
      e.preventDefault()
    }
    return () => {
      documentBody.style.overflow = 'auto'
      documentBody.style.scrollBehavior = 'auto'
      documentBody.style.paddingRight = '0px'
    }
  }, [])

  return (
    <motion.div
      initial={{ height: '0px' }}
      animate={{ height: '100dvh' }}
      exit={{ height: '0px' }}
      transition={{
        duration: 0.5,
        type: 'spring'
      }}
      className={cn(
        'w-screen bg-primary fixed flex flex-col justify-between top-0 left-0 z-30 overflow-x-hidden overflow-y-auto',
        muted && 'bg-secondary'
      )}
    >
      <div className='container mt-spacing-8 md:mt-spacing-9 pb-gutter'>
        <MainNav action={action} muted={muted} />
      </div>
    </motion.div>
  )
}
