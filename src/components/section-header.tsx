import { cn } from '@/lib/utils'
import { Header } from '@/types'

interface SectionHeaderProps extends Header {
  className?: string
}

export const SectionHeader = ({ title, description, className } : SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-spacing-3',
        className
      )}
    >
      <h2 className='f-body-1 uppercase text-ring font-medium text-balance leading-none tracking-wider'>
        {title}
      </h2>
      <p className='f-display-3 font-medium text-balance'>
        {description}
      </p>
    </div>
  )
}
