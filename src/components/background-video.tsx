import { cn } from '@/lib/utils'

export interface BackgroundVideoProps {
  src: string
  className?: string
  videoClassName?: string
}

export function BackgroundVideo ({
  src,
  className,
  videoClassName
}: BackgroundVideoProps) {
  return (
    <div className={cn(
      'absolute inset-0 z-0 overflow-hidden',
      className
    )}
    >
      <video
        className={cn(
          'w-full h-full object-cover relative',
          videoClassName
        )}
        width={1920}
        height={1080}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList='nodownload noplaybackrate'
      >
        <source src={src} type='video/mp4' />
      </video>
      <div className='absolute inset-0 z-10 bg-gradient-radial from-primary/70 via-primary/95 to-primary backdrop-filter backdrop-saturate-200' />
      <div className='absolute inset-0 z-20 bg-gradient-to-tl from-accent/30 via-transparent to-accent/40' />
    </div>
  )
}
