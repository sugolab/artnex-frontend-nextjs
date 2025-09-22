'use client';

import { cn } from '@/lib/utils';
import Logo from '@/components/common/Logo';

// Figma assets for main page
const logoImg = "/assets/fcb113690bc1e9a5524e50ae05556f9e79e79bd3.png";

interface FooterProps {
  variant?: 'default' | 'main';
  className?: string;
}

export default function Footer({ variant = 'default', className = "" }: FooterProps) {
  // Main page uses Figma exact design
  if (variant === 'main') {
    return (
      <footer className={cn(
        "absolute bg-black bottom-0 h-[90px] left-0 overflow-clip w-full z-10",
        className
      )} data-name="Footer" data-testid="footer">
        <div className="absolute h-[30px] left-[20px] top-[30px] w-[192px]" data-name="Logo">
          <div className="absolute bg-center bg-cover bg-no-repeat inset-0" style={{ backgroundImage: `url('${logoImg}')` }} />
        </div>
        <div className="absolute content-stretch flex font-['Noto_Sans_KR:Medium',_sans-serif] font-medium gap-[24px] items-center justify-start leading-[0] right-[20px] text-[20px] text-nowrap text-white top-[30px]">
          <div className="relative shrink-0">
            <p className="leading-[30px] text-nowrap whitespace-pre">T. 02-6417-3714</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[30px] text-nowrap whitespace-pre">|</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[30px] text-nowrap whitespace-pre">F. 070-4024-0271</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[30px] text-nowrap whitespace-pre">|</p>
          </div>
          <div className="relative shrink-0">
            <p className="leading-[30px] text-nowrap whitespace-pre">E. edu@sugolab.kr</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('bg-black w-[1920px] h-[90px]', className)}>
      <div className="max-w-[1920px] mx-auto h-full px-5 flex items-center justify-between">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center">
          <Logo variant="white-horizontal" size="small" />
        </div>

        {/* 오른쪽: 연락처 정보 */}
        <div className="flex items-center gap-6 font-noto-medium text-xl text-white">
          <span>T. 02-6417-3714</span>
          <span>|</span>
          <span>F. 070-4024-0271</span>
          <span>|</span>
          <span>E. edu@sugolab.kr</span>
        </div>
      </div>
    </footer>
  );
}