'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: "black-horizontal" | "white-horizontal";
}

function Logo({ variant = "black-horizontal" }: LogoProps) {
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

interface HeaderProps {
  variant?: "black" | "white" | "gray";
  className?: string;
}

export default function Header({ variant = "black", className = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 배경 스타일 결정
  const getBackgroundStyle = () => {
    switch (variant) {
      case "white":
        return "bg-white";
      case "gray":
        return "bg-black/93 backdrop-blur-sm";
      default:
        return "bg-white";
    }
  };

  // 텍스트 색상 결정
  const getTextColor = () => {
    switch (variant) {
      case "white":
        return "text-white";
      case "gray":
        return "text-white";
      default:
        return "text-black";
    }
  };

  // 버튼 스타일 결정
  const getButtonStyle = (type: 'primary' | 'secondary' | 'outlined') => {
    const baseClasses = "px-[30px] py-3 rounded-full font-poppins font-medium text-lg transition-all duration-200 flex items-center gap-[7px]";
    
    if (variant === "white" || variant === "gray") {
      switch (type) {
        case 'primary':
          return `${baseClasses} bg-white text-black border border-white hover:bg-gray-100`;
        case 'secondary':
          return `${baseClasses} bg-black text-white border border-white hover:bg-gray-900`;
        case 'outlined':
          return `${baseClasses} bg-transparent text-white border border-white hover:bg-white/10`;
      }
    } else {
      switch (type) {
        case 'primary':
          return `${baseClasses} bg-black text-white border border-black hover:bg-gray-900`;
        case 'secondary':
          return `${baseClasses} bg-white text-black border border-gray-300 hover:bg-gray-50`;
        case 'outlined':
          return `${baseClasses} bg-transparent text-black border border-gray-300 hover:bg-gray-50`;
      }
    }
  };

  const isLight = variant === "white" || variant === "gray";

  return (
    <header className={`relative ${getBackgroundStyle()} border-b border-neutral-300/20 ${className}`}>
      {/* 하단 테두리 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-300/20 pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-5">
        <div className="flex items-center justify-between py-5">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center gap-[100px]">
            <Logo variant={isLight ? "white-horizontal" : "black-horizontal"} />
            
            <nav className="hidden lg:flex items-center gap-[50px] font-noto-bold text-xl">
              <div className={`${getTextColor()}`}>
                <span className="underline decoration-solid underline-offset-2">AI리포트</span>
              </div>
              <div className={`${getTextColor()}`}>
                AI디자인
              </div>
              <div className={`${getTextColor()}`}>
                AI마케팅
              </div>
            </nav>
          </div>

          {/* 오른쪽: 버튼들 */}
          <div className="flex items-center gap-[30px]">
            {/* 서비스 버튼들 */}
            <div className="hidden lg:flex items-center gap-5">
              <button className={`px-1 py-3 font-noto-medium text-lg ${getTextColor()} hover:opacity-80`}>
                브랜드 컨설팅
              </button>
              <button className={`px-1 py-3 font-noto-medium text-lg ${getTextColor()} hover:opacity-80`}>
                서비스 안내
              </button>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center gap-[10px]">
              <button className={getButtonStyle('outlined')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                MY PAGE
              </button>
              
              <Link href="/login" className={getButtonStyle('outlined')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                LOGIN
              </Link>
              
              <Link href="/contact" className={getButtonStyle('primary')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                contact
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button 
              className={`lg:hidden p-2 ${getTextColor()}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              <div className={`font-bold text-xl ${getTextColor()}`}>AI리포트</div>
              <div className={`font-bold text-xl ${getTextColor()}`}>AI디자인</div>
              <div className={`font-bold text-xl ${getTextColor()}`}>AI마케팅</div>
              <div className={`font-medium text-lg ${getTextColor()}`}>브랜드컨설팅</div>
              <div className={`font-medium text-lg ${getTextColor()}`}>서비스 안내</div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}