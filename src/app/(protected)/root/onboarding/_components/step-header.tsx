import { motion } from 'framer-motion'

interface StepHeaderProps {
  title: string
  description?: string
}

export function StepHeader ({ title, description }: StepHeaderProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 250 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.4, type: 'spring' }
        }
      }}
      className='w-full space-y-1.5'
    >
      <h1 className='text-pretty text-2xl font-bold transition-colors sm:text-3xl'>
        {title}
      </h1>
      {description
        ? (
          <p className='text-pretty text-sm text-muted-foreground transition-colors sm:text-base'>
            Puedes actualizar los datos del administrador en otro momento
          </p>
          )
        : null}
    </motion.div>
  )
}
