import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'border-transparent bg-land-700 text-white shadow-sm',
    secondary: 'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200',
    destructive: 'border-transparent bg-rose-500 text-white shadow-sm',
    outline: 'text-slate-800 border-slate-300',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-300 bg-amber-50 text-amber-900',
    danger: 'border-rose-300 bg-rose-50 text-rose-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-land-600',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
