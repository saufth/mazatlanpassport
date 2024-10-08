import React from 'react'
import { cn } from '@/lib/utils'
import { Item } from '@/types'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    as?: 'div' | 'section' | 'article'
  }
>(({ className, as: Comp = 'div', ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      'bg-card border text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full p-2 flex flex-col space-y-spacing-1', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

type CardProps = React.ComponentProps<typeof Card>

interface CardDataProps extends CardProps {
  item: Item
}

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg line-clamp-1', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

type CardTitleProps = React.ComponentProps<typeof CardTitle>

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-muted-foreground line-clamp-2', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

type CardDescriptionProps = React.ComponentProps<typeof CardDescription>

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full', className)} {...props} />
))
CardContent.displayName = 'CardContent'

type CardContentProps = React.ComponentProps<typeof CardContent>

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

type CardFooterProps = React.ComponentProps<typeof CardFooter>

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
  type CardDataProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps
}
