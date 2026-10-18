import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-land-600 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      default: 'bg-land-700 text-white hover:bg-land-800 shadow-md shadow-land-800/10 active:scale-[0.98]',
      destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md active:scale-[0.98]',
      outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900',
      secondary: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300',
      ghost: 'hover:bg-slate-100 text-slate-700',
      link: 'text-land-700 underline-offset-4 hover:underline p-0 h-auto',
      gold: 'bg-gov-gold hover:bg-amber-500 text-slate-950 shadow-md active:scale-[0.98]',
    };

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-8 rounded-lg px-3 text-xs',
      lg: 'h-12 rounded-2xl px-6 text-base',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
