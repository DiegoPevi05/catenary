import { cn } from '../utils/helper'
import { cva, VariantProps } from 'class-variance-authority'
import Loader2 from '~/assets/svg/common/loader.svg?react'
import { ButtonHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'inline-flex gap-x-4 justify-center items-center  border-[3px] active:scale-95 disabled:before:bg-gray-500 disabled:border-gray-500 disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-500 duration-300 rounded-lg',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-white text-white border-primary hover:text-primary-dark hover:border-primary-dark',
        secondary: 'bg-white text-primary border-white hover:border-primary hover:bg-primary hover:text-white',
        tertiary: 'bg-secondary-dark text-white border-secondary-dark hover:border-primary hover:bg-primary',
        danger: 'bg-red-500 hover:bg-red-600',
      },
      size: {
        default: 'px-8 py-2',
        sm: 'px-4 py-2',
        lg: 'px-12 sm:px-24 py-2 lg:py-3 sm:py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  rightIcon?: React.ReactNode
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  rightIcon,
  ...props
}) => {

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}>
      {isLoading ? <Loader2 className='mr-2 text-secondary h-4 w-4 animate-spin' /> : null}
      {size == "lg" ?
        <h5>{children}</h5>
        :
          size == "sm" ?
            <p>{children}</p>
          :
          <label className="font-bold">{children}</label>
      }
      {rightIcon ? <div className="transform transition-transform group-hover:translate-x-2 duration-300">{rightIcon}</div> : null}
    </button>
  )
}

export default Button


