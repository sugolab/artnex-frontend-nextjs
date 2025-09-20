'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LinkTextProps {
  href: string;
  children: ReactNode;
  variant?: 'default' | 'underline' | 'hover-underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export default function LinkText({
  href,
  children,
  variant = 'default',
  size = 'md',
  className,
  external = false
}: LinkTextProps) {
  
  // 크기별 스타일
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg'
  };

  // 변형별 스타일
  const variantStyles = {
    default: 'text-black hover:text-gray-700',
    underline: 'text-black underline decoration-solid underline-offset-2 hover:text-gray-700',
    'hover-underline': 'text-black hover:text-gray-700 hover:underline decoration-solid underline-offset-2'
  };

  const baseStyles = 'font-noto-medium transition-colors duration-200 cursor-pointer';

  const linkClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}