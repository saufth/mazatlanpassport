import { type PropsWithChildren } from 'react'
import { CallToAction, type CallToActionProps } from '@/components/call-to-action'
import { BackgroundVideo, type BackgroundVideoProps } from '@/components/background-video'
import { cn } from '@/lib/utils'
import type { Title, Description } from '@/types'
import Image from 'next/image'

export interface HeroProps
  extends Title,
  Partial<Description>,
  PropsWithChildren,
  Partial<Pick<CallToActionProps, 'to'>>,
  Partial<BackgroundVideoProps> {
  className?: string
}

export const Hero = ({ title, description, to, src, children, className }: HeroProps) => {
  return (
    <section
      className={cn(
        'screen-container relative overflow-hidden -mt-header-h',
        className
      )}
    >
      <div className='container h-full flex flex-col justify-center relative z-10 pt-spacing-6'>
        <div className='cols-container'>
          <div className='w-6-cols md:w-5-cols lg:w-7-cols h-full flex flex-col justify-center'>
            <div className='max-w-md sm:max-w-2xl lg:max-w-3xl'>
              <h1 className='f-display-2 text-secondary text-balance'>
                {title}
              </h1>
              {description && (
                <p className='f-subhead-3 text-balance text-secondary mt-spacing-4'>
                  {description}
                </p>
              )}
            </div>
            {to && (
              <div className='flex flex-col sm:flex-row items-center gap-spacing-3 mt-spacing-5'>
                <CallToAction to={to} size='full' icon />
                <CallToAction to='login' variant='ghost' size='full' />
              </div>
            )}
          </div>
          <div className='hidden md:w-3-cols lg:w-5-cols h-full md:flex flex-col justify-center'>
            <Image
              src='/images/mzcards.webp'
              alt='Tarjetas exclusivas'
              width={790}
              height={680}
              priority
              className='w-1/2 md:w-full'
            />
          </div>
        </div>
        {children}
      </div>
      {src && <BackgroundVideo src={src} />}
    </section>
  )
}
