import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex rounded-full items-center justify-center items-center ring-0 ring-transparent',
    'hover:scale-105 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent'
  ),
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground border-secondary',
        destructive: 'bg-destructive/95 text-destructive-foreground',
        outline: 'border border-primary text-primary text-primary',
        secondary: 'bg-secondary/90 text-secondary-foreground',
        ghost: 'bg-white border-secondary',
        link: 'hover:underline'
      },
      size: {
        default: 'h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm tracking-wide font-medium border-2',
        xs: 'text-xs lg:text-sm border',
        sm: 'px-1 text-sm lg:text-base border',
        lg: 'w-fit h-11 sm:h-12 xl:h-14 px-6 sm:px-8 text-lg sm:text-xl xl:text-2xl font-medium border-[3px]',
        full: 'w-full max-w-96 h-11 sm:h-12 xl:h-14 px-6 sm:px-8 text-lg sm:text-xl xl:text-2xl font-medium border-[3px]',
        icon: 'h-7 lg:h-[33px] w-7 lg:w-[33px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export {
  Button,
  buttonVariants,
  type ButtonVariantProps,
  type ButtonProps
}
