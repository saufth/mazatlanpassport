import { CallToAction, type CallToActionProps } from '@/components/call-to-action'
import { cn } from '@/lib/utils'
import type { Title, Description } from '@/types'
import { Highlight } from './highlight'

export interface PageHeaderProps
  extends Title,
  Partial<Description>,
  Partial<Pick<CallToActionProps, 'to'>> {
  className?: string
  toAlt?: CallToActionProps['to']
}

export function PageHeader ({
  title,
  description,
  to,
  toAlt,
  className
} : PageHeaderProps) {
  return (
    <section
      className={cn(
        'bg-primary relative py-spacing-7 -mt-header-h overflow-hidden [clip-path:polygon(25%_0%,100%_0,100%_95%,0_100%,0_100%,0_0)]',
        className
      )}
    >
      <div className='container relative z-10 py-spacing-8'>
        <div className='text-center'>
          <h1 className='f-display-1 text-secondary font-bold text-balance'>
            <Highlight index={3}>
              {title}
            </Highlight>
          </h1>
          {description && (
            <p className='f-subhead-2 text-secondary font-medium text-balance mt-spacing-2 pt-spacing-4'>
              {description}
            </p>
          )}
        </div>
        {(to || toAlt) && (
          <div className='flex flex-col-reverse sm:flex-row items-center justify-center gap-spacing-4 mt-spacing-5'>
            {toAlt && <CallToAction to={toAlt} variant='ghost' size='full' />}
            {to && <CallToAction to={to} size='full' />}
          </div>
        )}
      </div>
      <div className='absolute inset-0 bg-gradient-to-tl from-accent/40 via-transparent to-accent/50 [clip-path:polygon(25%_0%,100%_0,100%_95%,0_100%,0_100%,0_0)]' />
    </section>
  )
}
