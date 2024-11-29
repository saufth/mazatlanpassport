'use client'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function Intro () {
  const router = useRouter()
  const showText = useDebounce(true, 800)

  return (
    <motion.div
      className='flex size-full flex-col items-center justify-center'
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: 'spring' }}
    >
      {showText && (
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial='hidden'
          animate='show'
          className='mx-5 flex flex-col items-center space-y-2.5 text-center sm:mx-auto'
        >
          <motion.h1
            className='text-balance text-4xl font-bold transition-colors sm:text-5xl'
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: 'spring' }
              }
            }}
          >
            Bienvenido a {siteConfig.name}
          </motion.h1>
          <motion.p
            className='max-w-md text-muted-foreground transition-colors sm:text-lg'
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: 'spring' }
              }
            }}
          >
            Comienza creando un nuevo administrador para agregar las primeras tiendas.
          </motion.p>
          <motion.div
            className='pt-4'
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, type: 'spring' }
              }
            }}
          >
            <Button onClick={() => router.push('/root/onboarding?step=create')}>
              Comenzar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
