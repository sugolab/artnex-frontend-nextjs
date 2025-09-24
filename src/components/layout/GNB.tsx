'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/common/Logo';
import Button from '@/components/common/Button';
import LinkText from '@/components/common/LinkText';

// Figma assets for main page
const logoImg = "/assets/fcb113690bc1e9a5524e50ae05556f9e79e79bd3.png";
const img1 = "/assets/25182345d9f88d6935136e4fc2a9343096b9fe13.svg";
const img2 = "/assets/7ad2d80383c539b4be77e5d07d54b6b4ede3d5f5.svg";
const img3 = "/assets/50cdad30be445d6a928bad413d5ec77ddac51e46.svg";
const img4 = "/assets/a666ef2b69d0ba93ebbf62de57b3a68b517c0554.svg";

interface GNBProps {
  variant?: 'black' | 'white' | 'gray' | 'main' | 'standard';
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
      case 'main':
        return 'bg-transparent';
      default:
        return 'bg-white';
    }
  };

  // 텍스트 색상 결정
  const getTextColor = () => {
    switch (variant) {
      case 'white':
      case 'gray':
      case 'main':
        return 'text-white';
      default:
        return 'text-black';
    }
  };

  const isLight = variant === 'white' || variant === 'gray' || variant === 'main';

  // Standard Figma design (exact match from Figma plugin)
  if (variant === 'standard') {
    return (
      <div className="bg-white box-border content-stretch flex items-center justify-between p-[20px] relative size-full" data-name="Color=Black, State=Default" data-node-id="17:15386">
        <div aria-hidden="true" className="absolute border-[#dddddd] border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-0" />
        <div className="content-stretch flex gap-[100px] items-center justify-start relative shrink-0" data-node-id="17:15387">
          <div className="h-[30px] relative shrink-0 w-[192px]" data-name="Logo" data-node-id="17:15388">
            <Link href="/" className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="logo-black-horizontal" data-node-id="I17:15388;17:15381" style={{ backgroundImage: `url('/assets/9d8430ed04a9064834747437e197e1349910a3d8.png')` }} />
          </div>
          <div className="content-stretch flex font-['Noto_Sans_KR:Bold',_sans-serif] font-bold gap-[50px] h-[24px] items-center justify-start leading-[0] relative shrink-0 text-[20px] text-black text-nowrap w-[325px]" data-node-id="17:15389">
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="17:15390">
              <Link href="/reports" className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[normal] text-nowrap underline whitespace-pre text-black">AI리포트</Link>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="17:15391">
              <Link href="/design" className="leading-[normal] text-nowrap whitespace-pre text-black">AI디자인</Link>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="17:15392">
              <Link href="/reports/marketing" className="leading-[normal] text-nowrap whitespace-pre text-black">AI마케팅</Link>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[30px] items-center justify-start relative shrink-0" data-node-id="17:15393">
          <div className="content-stretch flex gap-[20px] items-center justify-start relative shrink-0" data-node-id="17:15394">
            <Link href="/consulting" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[3px] py-[12px] relative rounded-[100px] shrink-0" data-name="유동적 버튼" data-node-id="17:15395">
              <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-black text-center text-nowrap uppercase" data-node-id="I17:15395;5:2206">
                <p className="leading-[normal] whitespace-pre">브랜드 컨설팅</p>
              </div>
            </Link>
            <Link href="/service" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[3px] py-[12px] relative rounded-[100px] shrink-0" data-name="유동적 버튼" data-node-id="17:15396">
              <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-black text-center text-nowrap uppercase" data-node-id="I17:15396;5:2206">
                <p className="leading-[normal] whitespace-pre">서비스 안내</p>
              </div>
            </Link>
          </div>
          <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0" data-node-id="17:15397">
            <Link href="/mypage" className="bg-white box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 w-[151px]" data-name="유동적 버튼" data-node-id="17:15398">
              <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Icon" data-node-id="17:15399">
                <div className="absolute inset-[66.67%_8.33%_4.17%_8.33%]" data-name="Vector" data-node-id="I17:15399;17:15546">
                  <div className="absolute inset-[-15.58%_-5.45%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)", "--stroke-1": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src="/assets/a12ea6e8aae1fd5abad35ae22e71d666aa659ccf.svg" />
                  </div>
                </div>
                <div className="absolute inset-[4.17%_29.17%_54.17%_29.17%]" data-name="Vector" data-node-id="I17:15399;17:15547">
                  <div className="absolute inset-[-10.909%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)", "--stroke-1": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src="/assets/9f023209628b971e3832be52bcd248bbd7866065.svg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap uppercase" data-node-id="17:15400">
                <p className="leading-[normal] whitespace-pre">MY PAGE</p>
              </div>
            </Link>
            <Link href="/login" className="bg-white box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0" data-name="유동적 버튼" data-node-id="17:15401">
              <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="relative shrink-0 size-[22px]" data-name="Icon" data-node-id="17:15402">
                <div className="absolute inset-[-0.91%]" style={{ "--fill-0": "rgba(0, 0, 0, 1)", "--fill-1": "rgba(0, 0, 0, 1)", "--stroke-0": "rgba(0, 0, 0, 1)", "--stroke-1": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                  <img alt="" className="block max-w-none size-full" src="/assets/16f4ef752759075174e81196ffe2f03cd06fa560.svg" />
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap uppercase" data-node-id="17:15403">
                <p className="leading-[normal] whitespace-pre">LOGIN</p>
              </div>
            </Link>
            <Link href="/contact" className="bg-black box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 w-[189px]" data-name="유동적 버튼" data-node-id="17:15404">
              <div aria-hidden="true" className="absolute border border-[#dddddd] border-solid inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon" data-node-id="17:15405">
                <div className="absolute inset-[12.5%]" data-name="Vector" data-node-id="I17:15405;17:15486">
                  <div className="absolute inset-[-5.56%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src="/assets/e67d076f147c7030ea78284c77df940729e5ef6b.svg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white uppercase" data-node-id="17:15406">
                <p className="leading-[normal] whitespace-pre">contact</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main page uses Figma exact design
  if (variant === 'main') {
    return (
      <nav className={cn(
        "absolute box-border content-stretch flex items-center justify-between left-0 p-[20px] top-0 w-full z-20",
        className
      )} data-name="GNB" data-testid="gnb">
        <div aria-hidden="true" className="absolute border-[#dddddd] border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-0" />
        <div className="content-stretch flex gap-[100px] items-center justify-start relative shrink-0">
          <Link href="/" className="h-[30px] relative shrink-0 w-[192px]" data-name="Logo" data-testid="logo">
            <img className="absolute w-full h-full object-cover" src={logoImg} alt="Logo" />
          </Link>
          <div className="content-stretch flex font-['Noto_Sans_KR:Bold',_sans-serif] font-bold gap-[50px] h-[24px] items-center justify-start leading-[0] relative shrink-0 text-[20px] text-nowrap text-white w-[325px]">
            <div className="flex flex-col justify-center relative shrink-0">
              <Link href="/reports" className="leading-[normal] text-nowrap whitespace-pre text-white no-underline">AI리포트</Link>
            </div>
            <div className="flex flex-col justify-center relative shrink-0">
              <Link href="/design" className="leading-[normal] text-nowrap whitespace-pre text-white no-underline">AI디자인</Link>
            </div>
            <div className="flex flex-col justify-center relative shrink-0">
              <Link href="/reports/marketing" className="leading-[normal] text-nowrap whitespace-pre text-white no-underline">AI마케팅</Link>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[30px] items-center justify-start relative shrink-0">
          <div className="content-stretch flex gap-[20px] items-center justify-start relative shrink-0">
            <Link href="/consulting" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[3px] py-[12px] relative rounded-[100px] shrink-0 no-underline">
              <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-center text-nowrap text-white uppercase">
                <p className="leading-[normal] whitespace-pre">브랜드컨설팅</p>
              </div>
            </Link>
            <Link href="/service" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[3px] py-[12px] relative rounded-[100px] shrink-0 no-underline">
              <div className="flex flex-col font-['Noto_Sans_KR:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-center text-nowrap text-white uppercase">
                <p className="leading-[normal] whitespace-pre">서비스 안내</p>
              </div>
            </Link>
          </div>
          <div className="content-stretch flex gap-[10px] items-center justify-start relative shrink-0">
            <Link href="/mypage" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 w-[151px] no-underline">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="overflow-clip relative shrink-0 size-[22px]">
                <div className="absolute inset-[66.67%_8.33%_4.17%_8.33%]">
                  <div className="absolute inset-[-15.58%_-5.45%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img1} />
                  </div>
                </div>
                <div className="absolute inset-[4.17%_29.17%_54.17%_29.17%]">
                  <div className="absolute inset-[-10.909%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white uppercase">
                <p className="leading-[normal] whitespace-pre">MY PAGE</p>
              </div>
            </Link>
            <Link href="/login" className="box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 no-underline">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="relative shrink-0 size-[22px]">
                <div className="absolute inset-[-0.91%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                  <img alt="" className="block max-w-none size-full" src={img3} />
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white uppercase">
                <p className="leading-[normal] whitespace-pre">LOGIN</p>
              </div>
            </Link>
            <Link href="/register" className="bg-gray-200 border border-gray-300 box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 no-underline">
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-text-title text-[18px] text-center text-nowrap uppercase">
                <p className="leading-[normal] whitespace-pre">회원가입</p>
              </div>
            </Link>
            <Link href="/contact" className="bg-white box-border content-stretch flex gap-[7px] h-[50px] items-center justify-center px-[30px] py-[12px] relative rounded-[100px] shrink-0 w-[189px] no-underline">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[100.5px]" />
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <div className="absolute inset-[12.5%]">
                  <div className="absolute inset-[-5.56%]" style={{ "--stroke-0": "rgba(38, 45, 51, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-['Poppins:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-text-title text-[18px] text-center text-nowrap uppercase">
                <p className="leading-[normal] whitespace-pre">contact</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

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
                href="/reports" 
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
                href="/reports/marketing" 
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
                  마이페이지
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
                  로그인
                </Button>
              </Link>
              
              <Link href="/register">
                <Button 
                  variant="outlined" 
                  size="small"
                  className={cn(
                    'flex items-center gap-2',
                    isLight ? 'border-white text-white hover:bg-white/10' : 'border-gray-300 text-black hover:bg-gray-50'
                  )}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  회원가입
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
                  문의
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
              <LinkText href="/reports" className={cn('font-bold text-xl', getTextColor())}>
                AI리포트
              </LinkText>
              <LinkText href="/design" className={cn('font-bold text-xl', getTextColor())}>
                AI디자인
              </LinkText>
              <LinkText href="/reports/marketing" className={cn('font-bold text-xl', getTextColor())}>
                AI마케팅
              </LinkText>
              <LinkText href="/consulting" className={cn('font-medium text-lg', getTextColor())}>
                브랜드컨설팅
              </LinkText>
              <LinkText href="/service" className={cn('font-medium text-lg', getTextColor())}>
                서비스 안내
              </LinkText>
              <LinkText href="/mypage" className={cn('font-medium text-lg', getTextColor())}>
                마이페이지
              </LinkText>
              <LinkText href="/login" className={cn('font-medium text-lg', getTextColor())}>
                로그인
              </LinkText>
              <LinkText href="/register" className={cn('font-medium text-lg', getTextColor())}>
                회원가입
              </LinkText>
              <LinkText href="/contact" className={cn('font-medium text-lg', getTextColor())}>
                문의
              </LinkText>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}