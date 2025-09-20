'use client';

import { cn } from '@/lib/utils';
import Logo from '@/components/common/Logo';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
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