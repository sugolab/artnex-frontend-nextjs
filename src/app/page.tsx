'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainPage() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 배경 그래디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-800" />
      
      {/* 배경 그래픽 요소 - artnex 타이포그래피 */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/assets/3a93497ae0addf99423606efaab6c33312968259.svg"
          alt="Background decoration"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* 헤더 (GNB) */}
      <Header variant="gray" className="absolute top-0 left-0 w-full z-10" />

      {/* 히어로 섹션 */}
      <main className="relative z-10 px-[50px] pt-[140px]">
        <h1 className="text-[50px] leading-[57px] text-white font-poppins font-medium mb-[30px]">
          Build your<br />
          brand's world.
        </h1>
        
        <div className="text-white font-noto-regular text-base leading-[25px] space-y-1 max-w-[316px]">
          <p>아트넥스는 AI 기반 데이터 분석과</p>
          <p>전략적 브랜딩의 결합을 통해 기업의 성공을 위한</p>
          <p>최적화된 브랜딩 솔루션을 제공합니다.</p>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-[48px]">
          <Link 
            href="/report/bid/brand-identity"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-noto-bold text-xl rounded-full hover:bg-primary-700 transition-colors shadow-lg"
          >
            AI 리포트 시작하기
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <Footer className="absolute bottom-0 left-0 w-full z-10" />
    </div>
  );
}