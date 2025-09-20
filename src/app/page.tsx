'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common';
import { GNB, Footer } from '@/components/layout';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* GNB - 피그마 기준 1920×90 */}
      <GNB />

      {/* Main Content - 피그마 기준 Frame 385 (1920×990) */}
      <main className="relative w-full h-[990px] overflow-hidden">
        {/* 배경 그래디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-800" />
        
        {/* 배경 그래픽 요소 */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/assets/3a93497ae0addf99423606efaab6c33312968259.svg"
            alt="Background decoration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 flex items-center h-full px-[50px]">
          <div className="max-w-[600px]">
            <h1 className="text-[50px] leading-[57px] text-white font-poppins font-medium mb-[30px]">
              Build your<br />
              brand&apos;s world.
            </h1>
            
            <div className="text-white font-noto-medium text-lg leading-[28px] space-y-2 mb-[48px]">
              <p>아트넥스는 AI 기반 데이터 분석과</p>
              <p>전략적 브랜딩의 결합을 통해 기업의 성공을 위한</p>
              <p>최적화된 브랜딩 솔루션을 제공합니다.</p>
            </div>

            {/* CTA 버튼들 */}
            <div className="flex gap-6">
              <Link href="/report/bid/brand-identity">
                <Button 
                  size="medium"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  AI 리포트 시작하기
                </Button>
              </Link>
              
              <Link href="/register">
                <Button 
                  variant="outlined"
                  size="medium"
                  className="border-white text-white hover:bg-white/10"
                >
                  무료 체험하기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 추가 정보 섹션 */}
        <div className="absolute bottom-8 left-[50px] right-[50px] z-10">
          <div className="flex justify-between items-center text-white/80">
            <div className="flex gap-8 text-sm font-noto-medium">
              <span>✓ AI 기반 브랜드 분석</span>
              <span>✓ 전략적 브랜딩 솔루션</span>
              <span>✓ 실시간 데이터 분석</span>
            </div>
            
            <div className="text-sm font-noto-medium">
              <Link href="/contact" className="hover:text-white transition-colors">
                문의하기 →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 피그마 기준 1920×90 */}
      <Footer />
    </div>
  );
}