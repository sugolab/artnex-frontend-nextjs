'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/common/Logo';
import Button from '@/components/common/Button';
import LinkText from '@/components/common/LinkText';

interface GNBProps {
  variant?: 'black' | 'white' | 'gray';
  className?: string;
}

export default function GNB({ variant = 'black', className = '' }: GNBProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 배경 스타일 결정
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-black/93 backdrop-blur-sm';
      default:
        return 'bg-white';
    }
  };

  // 텍스트 색상 결정
  const getTextColor = () => {
    switch (variant) {
      case 'white':
      case 'gray':
        return 'text-white';
      default:
        return 'text-black';
    }
  };

  const isLight = variant === 'white' || variant === 'gray';

  return (
    <header className={cn(
      'relative w-[1920px] h-[90px] border-b border-neutral-300/20',
      getBackgroundStyle(),
      className
    )}>
      {/* 하단 테두리 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-300/20 pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-5">
        <div className="flex items-center justify-between h-[90px]">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center gap-[100px]">
            <Logo 
              variant={isLight ? 'white-horizontal' : 'black-horizontal'} 
              size="small"
            />
            
            <nav className="hidden lg:flex items-center gap-[50px] font-noto-bold text-xl">
              <LinkText 
                href="/report" 
                variant="underline" 
                className={getTextColor()}
              >
                AI리포트
              </LinkText>
              <LinkText 
                href="/design" 
                className={getTextColor()}
              >
                AI디자인
              </LinkText>
              <LinkText 
                href="/marketing" 
                className={getTextColor()}
              >
                AI마케팅
              </LinkText>
            </nav>
          </div>

          {/* 오른쪽: 버튼들 */}
          <div className="flex items-center gap-[30px]">
            {/* 서비스 버튼들 */}
            <div className="hidden lg:flex items-center gap-5">
              <LinkText 
                href="/consulting" 
                size="lg"
                className={cn('px-1 py-3 hover:opacity-80', getTextColor())}
              >
                브랜드 컨설팅
              </LinkText>
              <LinkText 
                href="/service" 
                size="lg"
                className={cn('px-1 py-3 hover:opacity-80', getTextColor())}
              >
                서비스 안내
              </LinkText>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center gap-[10px]">
              <Link href="/mypage">
                <Button 
                  variant="outlined" 
                  size="small"
                  className={cn(
                    'flex items-center gap-2',
                    isLight ? 'border-white text-white hover:bg-white/10' : 'border-gray-300 text-black hover:bg-gray-50'
                  )}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  MY PAGE
                </Button>
              </Link>
              
              <Link href="/login">
                <Button 
                  variant="outlined" 
                  size="small"
                  className={cn(
                    'flex items-center gap-2',
                    isLight ? 'border-white text-white hover:bg-white/10' : 'border-gray-300 text-black hover:bg-gray-50'
                  )}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  LOGIN
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button 
                  variant={isLight ? 'primary' : 'primary'} 
                  size="small"
                  className={cn(
                    'flex items-center gap-2',
                    isLight ? 'bg-white text-black border-white hover:bg-gray-100' : ''
                  )}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  contact
                </Button>
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button 
              className={cn('lg:hidden p-2', getTextColor())}
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
              <LinkText href="/report" className={cn('font-bold text-xl', getTextColor())}>
                AI리포트
              </LinkText>
              <LinkText href="/design" className={cn('font-bold text-xl', getTextColor())}>
                AI디자인
              </LinkText>
              <LinkText href="/marketing" className={cn('font-bold text-xl', getTextColor())}>
                AI마케팅
              </LinkText>
              <LinkText href="/consulting" className={cn('font-medium text-lg', getTextColor())}>
                브랜드컨설팅
              </LinkText>
              <LinkText href="/service" className={cn('font-medium text-lg', getTextColor())}>
                서비스 안내
              </LinkText>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}