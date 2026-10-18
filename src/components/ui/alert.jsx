import React from 'react';
import { cn } from '../../utils/cn';

export const Alert = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-white text-slate-800 border-slate-200',
    destructive: 'border-rose-300 bg-rose-50/80 text-rose-950',
    warning: 'border-amber-300 bg-amber-50/80 text-amber-950',
    success: 'border-emerald-300 bg-emerald-50/80 text-emerald-950',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn('relative w-full rounded-2xl border p-4 text-sm', variants[variant], className)}
      {...props}
    />
  );
});
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold leading-none tracking-tight flex items-center gap-2', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs sm:text-sm leading-relaxed opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
