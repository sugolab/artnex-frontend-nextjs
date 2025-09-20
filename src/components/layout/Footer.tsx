'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: "black-horizontal" | "white-horizontal";
}

function Logo({ variant = "white-horizontal" }: LogoProps) {
  const logoSrc = variant === "white-horizontal" 
    ? "/images/logo-white-horizontal.png" 
    : "/images/logo-black-horizontal.png";
  
  return (
    <div className="relative w-48 h-8">
      <Image
        src={logoSrc}
        alt="ArtNex Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-black h-[90px] ${className}`}>
      <div className="max-w-[1920px] mx-auto h-full px-5 flex items-center justify-between">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center">
          <Logo variant="white-horizontal" />
        </div>

        {/* 오른쪽: 연락처 정보 */}
        <div className="flex items-center gap-6 font-noto-medium text-xl text-white">
          <span>T. 02-6417-3714</span>
          <span>|</span>
          <span>F. 070-4024-0271</span>
          <span>|</span>
          <span>edu@sugolab.kr</span>
        </div>
      </div>
    </footer>
  );
}