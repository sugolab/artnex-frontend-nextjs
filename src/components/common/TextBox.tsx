'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  containerClassName?: string;
}

const TextBox = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextBoxProps>(({
  label,
  error,
  multiline = false,
  rows = 3,
  className,
  containerClassName,
  ...props
}, ref) => {

  // 피그마 분석 기준 표준 크기: 500×50
  const baseStyles = 'w-[500px] h-[50px] px-4 border border-gray-300 rounded font-noto-medium text-lg transition-colors duration-200 focus:outline-none focus:border-black';
  
  // 멀티라인일 때는 높이 조정
  const multilineStyles = multiline ? 'h-auto py-3 resize-none' : '';
  
  // 에러 상태 스타일
  const errorStyles = error ? 'border-red-500 focus:border-red-500' : '';

  const inputStyles = cn(
    baseStyles,
    multilineStyles,
    errorStyles,
    className
  );

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={cn('flex flex-col gap-2', containerClassName)}>
      {label && (
        <label className="font-noto-medium text-lg text-black">
          {label}
        </label>
      )}
      
      <InputComponent
        ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
        className={inputStyles}
        {...(multiline ? { rows } : {})}
        {...props}
      />
      
      {error && (
        <span className="text-red-500 text-sm font-noto-medium">
          {error}
        </span>
      )}
    </div>
  );
});

TextBox.displayName = 'TextBox';

export default TextBox;