'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({
  label,
  error,
  className,
  containerClassName,
  ...props
}, ref) => {
  
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'w-5 h-5 border-2 border-gray-300 rounded bg-white checked:bg-black checked:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-200',
            'appearance-none cursor-pointer',
            error && 'border-red-500 checked:bg-red-500 checked:border-red-500',
            className
          )}
          {...props}
        />
        {/* Custom checkmark */}
        <svg
          className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {label && (
        <label className="font-noto-medium text-lg text-black cursor-pointer select-none">
          {label}
        </label>
      )}
      
      {error && (
        <span className="text-red-500 text-sm font-noto-medium ml-auto">
          {error}
        </span>
      )}
    </div>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;