'use client';

import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  loading = false,
  disabled,
  ...props
}, ref) => {
  
  // 피그마 분석 기준 크기 매핑
  const sizeStyles = {
    small: 'w-[245px] h-[55px]',    // 245×55 (Join 화면 버튼)
    medium: 'w-[500px] h-[50px]',   // 500×50 (표준 버튼)
    large: 'w-[750px] h-[140px]'    // 750×140 (Landing 화면 큰 버튼)
  };

  // 텍스트 크기 매핑
  const textSizeStyles = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-2xl'
  };

  // 변형별 스타일
  const variantStyles = {
    primary: 'bg-black text-white border border-black hover:bg-gray-900 active:bg-gray-800',
    secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-50 active:bg-gray-100',
    outlined: 'bg-transparent text-black border border-gray-300 hover:bg-gray-50 active:bg-gray-100'
  };

  const baseStyles = 'inline-flex items-center justify-center font-noto-medium rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        textSizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;