'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'black-horizontal' | 'white-horizontal';
  size?: 'small' | 'large';
  href?: string;
  className?: string;
}

export default function Logo({ 
  variant = 'black-horizontal', 
  size = 'small',
  href = '/',
  className 
}: LogoProps) {
  // 피그마 분석 기준 크기 매핑
  // small: 192×30 (GNB, Footer)
  // large: 256×40 (Login, 회원가입 등 화면)
  const sizeStyles = {
    small: 'w-[192px] h-[30px]',
    large: 'w-[256px] h-[40px]'
  };

  const logoSrc = variant === 'white-horizontal' 
    ? '/images/logo-white-horizontal.png' 
    : '/images/logo-black-horizontal.png';

  const LogoImage = (
    <div className={cn('relative', sizeStyles[size], className)}>
      <Image
        src={logoSrc}
        alt="ArtNex Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {LogoImage}
      </Link>
    );
  }

  return LogoImage;
}