import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export const StatusBadge = ({
  status,
  customLabel,
  size = 'md',
  showIcon = true,
  className,
}) => {
  let bg = '';
  let border = '';
  let text = '';
  let defaultLabel = '';
  let Icon = CheckCircle2;

  switch (status) {
    case 'matched':
    case 'verified':
      bg = 'bg-emerald-50';
      border = 'border-emerald-300';
      text = 'text-emerald-800';
      defaultLabel = ' তথ্যের মিল পাওয়া গেছে';
      Icon = CheckCircle2;
      break;

    case 'mismatch':
    case 'disputed':
      bg = 'bg-rose-50';
      border = 'border-rose-300';
      text = 'text-rose-800';
      defaultLabel = 'তথ্যে অমিল';
      Icon = AlertCircle;
      break;

    case 'needs_verification':
    case 'chain_broken':
    default:
      bg = 'bg-amber-50';
      border = 'border-amber-300';
      text = 'text-amber-800';
      defaultLabel = 'আরও যাচাই প্রয়োজন';
      Icon = AlertTriangle;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-sm px-3.5 py-1 gap-1.5 font-medium',
    lg: 'text-base px-4 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border shadow-sm transition-colors',
        bg,
        border,
        text,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      )}
      <span>{customLabel || defaultLabel}</span>
    </span>
  );
};
