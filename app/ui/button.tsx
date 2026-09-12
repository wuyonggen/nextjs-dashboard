import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary',
        secondary:
          'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400',
        outline:
          'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
        destructive:
          'bg-red-500 text-white hover:bg-red-400 active:bg-red-600 focus-visible:ring-red-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

// React 19: ref is a regular prop
export function Button({
  children,
  className,
  variant,
  size,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}
