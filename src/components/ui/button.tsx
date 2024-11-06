import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex rounded-2xl items-center justify-center items-center ring-0 ring-transparent',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent'
  ),
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive/95 text-destructive-foreground',
        outline: 'border border-primary text-primary text-primary',
        secondary: 'bg-secondary text-white',
        ghost: 'text-secondary bg-white',
        link: 'hover:underline hover:scale-100'
      },
      size: {
        default: 'py-spacing-2 px-spacing-4 f-body-2 leading-none font-bold',
        xs: 'text-xs lg:text-sm',
        sm: 'px-2 py-0.5 text-sm lg:text-base',
        lg: 'w-fit px-spacing-5 py-spacing-3 f-subhead-3 font-bold',
        full: 'w-full sm:w-fit px-spacing-5 py-spacing-3 f-subhead-3 font-bold',
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
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
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
  type ButtonProps,
  type ButtonVariantProps
}
