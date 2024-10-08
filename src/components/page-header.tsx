import Image from 'next/image'
import { CallToAction, type CallToActionProps } from '@/components/call-to-action'
import { Highlight } from '@/components/highlight'
import { cn } from '@/lib/utils'
import type { Title, Description } from '@/types'

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
        'bg-primary relative z-10 pt-spacing-7 pb-spacing-9 remove-site-header-spacing overflow-hidden [clip-path:polygon(25%_0%,100%_0,100%_95%,0_100%,0_100%,0_0)]',
        className
      )}
    >
      <div className='container relative z-10 pt-spacing-8 pb-spacing-9'>
        <div className='text-center'>
          <h1 className='f-display-1 text-secondary font-black text-balance'>
            <Highlight index={3}>
              {title}
            </Highlight>
          </h1>
          {description && (
            <p className='f-subhead-1 text-secondary font-medium text-balance mt-spacing-4'>
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
      <div className='absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/0 to-accent/0 [clip-path:polygon(25%_0%,100%_0,100%_95%,0_100%,0_100%,0_0)]' />
      <div className='absolute inset-0 bg-gradient-to-tl from-accent/0 via-accent/0 to-accent/40 [clip-path:polygon(25%_0%,100%_0,100%_95%,0_100%,0_100%,0_0)]' />
      <Image
        src='/assets/ballon-sunglasses-watermelon-umbrella-palmleaf-beach.webp'
        alt=''
        className='w-3/5 xs:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/3 3xl:w-[28%] my-auto absolute -bottom-[1%] xs:-bottom-[4%] -left-[6%] md:-left-[4%]'
        width={1920}
        height={2113}
        priority
      />
      <Image
        src='/assets/donut-sandals-starfish-palmleaft-beach.webp'
        alt=''
        className='w-3/5 xs:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/3 3xl:w-[28%] my-auto absolute bottom-[3%] -right-[12%] xs:-right-[10%] md:-right-[8%] lg:-right-[6%]'
        width={1920}
        height={1941}
        priority
      />
    </section>
  )
}
