'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';

// Import all assets from Figma
const backgroundImg = "/631e503d52e01f41cf2fa58492a4f07cf6729dcf.svg";

interface ReportType {
  id: string;
  title: string;
  description: string[];
  route: string;
  variant: 'primary' | 'secondary';
  available: boolean;
}

export default function AIReportsLanding() {
  const router = useRouter();

  const reportTypes: ReportType[] = [
    {
      id: 'bid',
      title: 'BID Report',
      description: [
        'BID리포트는 고객에게 더욱 사랑받는 브랜드를 만들기 위해',
        '우리 브랜드만의 타겟을 도출하고 그에 맞는 아이덴티티 전략을 수립합니다.'
      ],
      route: '/report/bid/brand-identity',
      variant: 'primary',
      available: true
    },
    {
      id: 'visual',
      title: 'Visual Report',
      description: [
        '브랜드의 타겟고객에 맞는 톤앤매너를 진단하고 이미지트렌드를 기반하여',
        '타겟고객의 선호를 강력하게 이끌어 낼 수 있는 브랜드 비주얼을 가이드합니다.'
      ],
      route: '/reports/visual',
      variant: 'secondary',
      available: true
    },
    {
      id: 'marketing',
      title: 'Marketing Report',
      description: [
        '타겟시장과 고객에 대한 키워드 분석을 기반으로 소비트렌드와',
        '마케팅 채널에 맞는 단계적 플랜으로 충성고객을 확보하는 전략을 수립합니다.'
      ],
      route: '/reports/marketing',
      variant: 'secondary',
      available: true
    }
  ];

  const handleStartReport = (reportId: string) => {
    const report = reportTypes.find(r => r.id === reportId);
    if (report && report.available) {
      router.push(report.route);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" data-name="AI리포트 > BID Report > Landing">
      {/* GNB - Use existing component */}
      <GNB variant="standard" />
      
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Background */}
        <div className="absolute h-[899px] left-0 overflow-clip top-0 w-[1920px]">
          <div className="absolute h-[962.087px] left-[4px] top-[-35.31px] w-[1923px]">
            <div className="absolute bottom-0 left-[-0.1%] right-[-0.08%] top-0">
              <img alt="Background" className="block max-w-none size-full" src={backgroundImg} />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="absolute flex flex-col font-['Poppins:Medium',_sans-serif] justify-end leading-[0] left-[960.5px] not-italic text-[50px] text-black text-center text-nowrap top-[184px] translate-x-[-50%] translate-y-[-100%]">
          <p className="leading-[58px] whitespace-pre">create our brand&apos;s ABO</p>
        </div>
        
        <div className="absolute font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[29px] left-[960px] text-text-title text-[20px] text-center text-nowrap top-[204px] translate-x-[-50%] whitespace-pre">
          <p className="mb-0">우리 브랜드만의 전략이 필요하니까!</p>
          <p>당신만의 AI 매니저를 만드세요.</p>
        </div>

        {/* BID Report Button */}
        <button 
          onClick={() => handleStartReport('bid')}
          className="absolute bg-black h-[140px] left-1/2 top-[312px] translate-x-[-50%] w-[750px] hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
          
          {/* Arrow Icon */}
          <div className="absolute h-[23px] left-[693px] top-[59px] w-[27px] flex items-center justify-center">
            <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2612 1.09519L24.5414 11.2051L14.2612 21.315" stroke="white" strokeWidth="2"/>
              <rect x="2.25" y="9.85693" width="22.5" height="2.19048" fill="white"/>
            </svg>
          </div>
          
          {/* Title */}
          <div className="absolute flex flex-col font-['Poppins:Medium',_sans-serif] justify-end leading-[0] left-[30px] not-italic text-[24px] text-nowrap text-white top-[59px] translate-y-[-100%]">
            <p className="leading-[normal] whitespace-pre">BID Report</p>
          </div>
          
          {/* Description */}
          <div className="absolute font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[27px] left-[30px] text-[16px] text-nowrap text-white top-[64px] whitespace-pre">
          <p>
            BID리포트는 고객에게 더욱 사랑받는 브랜드를 만들기 위해
            우리 브랜드만의 타겟을 도출하고 그에 맞는 아이덴티티 전략을 수립합니다.
          </p>
          </div>
        </button>

        {/* Visual Report Button */}
        <button 
          onClick={() => handleStartReport('visual')}
          className="absolute bg-white h-[140px] left-1/2 top-[472px] translate-x-[-50%] w-[750px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
          
          {/* Arrow Icon */}
          <div className="absolute h-[23px] left-[693px] top-[59px] w-[27px] flex items-center justify-center">
            <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2612 1.09519L24.5414 11.2051L14.2612 21.315" stroke="black" strokeWidth="2"/>
              <rect x="2.25" y="9.85693" width="22.5" height="2.19048" fill="black"/>
            </svg>
          </div>
          
          {/* Title */}
          <div className="absolute flex flex-col font-['Poppins:Medium',_sans-serif] justify-end leading-[0] left-[30px] not-italic text-[24px] text-black text-nowrap top-[59px] translate-y-[-100%]">
            <p className="leading-[normal] whitespace-pre">Visual Report</p>
          </div>
          
          {/* Description */}
          <div className="absolute font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[0] left-[30px] text-text-title text-[16px] text-nowrap top-[64px]">
            <p className="leading-[27px] whitespace-pre">
              브랜드의 타겟고객에 맞는 톤앤매너를 진단하고 이미지트렌드를 기반하여
              <br aria-hidden="true" />
              타겟고객의 선호를 강력하게 이끌어 낼 수 있는 브랜드 비주얼을 가이드합니다.
            </p>
          </div>
        </button>

        {/* Marketing Report Button */}
        <button 
          onClick={() => handleStartReport('marketing')}
          className="absolute bg-white h-[140px] left-1/2 top-[632px] translate-x-[-50%] w-[750px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div aria-hidden="true" className="absolute border border-black border-solid inset-[-0.5px] pointer-events-none" />
          
          {/* Arrow Icon */}
          <div className="absolute h-[23px] left-[693px] overflow-clip top-[59px] w-[27px]">
          <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2612 1.09519L24.5414 11.2051L14.2612 21.315" stroke="black" strokeWidth="2"/>
              <rect x="2.25" y="9.85693" width="22.5" height="2.19048" fill="black"/>
            </svg>
          </div>
          
          {/* Title */}
          <div className="absolute flex flex-col font-['Poppins:Medium',_sans-serif] justify-end leading-[0] left-[30px] not-italic text-[24px] text-black text-nowrap top-[59px] translate-y-[-100%]">
            <p className="leading-[normal] whitespace-pre">Marketing Report</p>
          </div>
          
          {/* Description */}
          <div className="absolute font-['Noto_Sans_KR:Regular',_sans-serif] font-normal leading-[27px] left-[30px] text-text-title text-[16px] text-nowrap top-[64px] whitespace-pre">
          <p className="leading-[27px] whitespace-pre">
            타겟시장과 고객에 대한 키워드 분석을 기반으로 소비트렌드와
            <br aria-hidden="true" />
            마케팅 채널에 맞는 단계적 플랜으로 충성고객을 확보하는 전략을 수립합니다.</p>
          </div>
        </button>
      </div>
      
      {/* Footer - Use existing component */}
      <Footer />
    </div>
  );
}