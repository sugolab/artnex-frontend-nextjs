'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';

export default function BrandManagementPage() {
  const router = useRouter();
  
  const [perceivedQuality, setPerceivedQuality] = useState('');
  const [brandLoyalty, setBrandLoyalty] = useState('');
  const [associatedImage, setAssociatedImage] = useState('');

  const handlePrevious = () => {
    router.push('/report/bid/brand-identity');
  };

  const handleNext = () => {
    router.push('/report/bid/brand-planning');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GNB variant="standard" />
      
      <div className="flex-1 relative bg-gray-50">
        {/* LNB - Left Navigation Bar */}
        <div className="absolute left-0 top-0 w-[280px] h-full bg-white border-r border-gray-200">
          {/* Header */}
          <div className="h-[80px] flex items-center px-6 border-b border-gray-200">
            <div className="font-['Noto_Sans_KR'] font-medium text-xl text-black">
              AI리포트
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-6">
            <nav className="space-y-2">
              {/* BID Report - Active */}
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white border-2 border-gray-800 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">BID</span>
                    </div>
                    <span className="text-black underline font-['Noto_Sans_KR'] font-medium">BID Report</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-90">
                    <path d="M6 4L10 8L6 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {/* Other Reports */}
              <div className="px-4 py-3 flex items-center space-x-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="3" width="16" height="12" rx="2" stroke="#666" strokeWidth="1.5"/>
                  <circle cx="7" cy="8" r="1.5" fill="#666"/>
                  <path d="L11 11L13 9L17 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-black font-['Noto_Sans_KR']">Visual Report</span>
              </div>
              <div className="px-4 py-3 flex items-center space-x-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="16" rx="2" stroke="#666" strokeWidth="1.5"/>
                  <rect x="4" y="6" width="2" height="10" fill="#666"/>
                  <rect x="8" y="4" width="2" height="12" fill="#666"/>
                  <rect x="12" y="8" width="2" height="8" fill="#666"/>
                </svg>
                <span className="text-black font-['Noto_Sans_KR']">Marketing Report</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="ml-[280px] mr-[320px] min-h-full">
          {/* Process Indicator */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-400 font-['Noto_Sans_KR']">01. Brand Identity</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-black font-['Noto_Sans_KR'] font-medium">02. Brand's Management</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-400 font-['Noto_Sans_KR']">03. Brand Planning</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-400 font-['Noto_Sans_KR']">04. Competitor Analysis</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-400 font-['Noto_Sans_KR']">05. Brand Logo</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* 지각된 품질 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-['Noto_Sans_KR'] font-medium text-black">지각된 품질</h3>
                  <span className="text-red-500">*</span>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{perceivedQuality.length}/500</span>
              </div>
              <textarea
                value={perceivedQuality}
                onChange={(e) => setPerceivedQuality(e.target.value)}
                maxLength={500}
                placeholder="Perceived Quality"
                className="w-full h-[300px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-['Noto_Sans_KR'] text-sm"
              />
            </div>

            {/* 브랜드 로열티 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-['Noto_Sans_KR'] font-medium text-black">브랜드 로열티</h3>
                  <span className="text-red-500">*</span>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{brandLoyalty.length}/500</span>
              </div>
              <textarea
                value={brandLoyalty}
                onChange={(e) => setBrandLoyalty(e.target.value)}
                maxLength={500}
                placeholder="Brand Loyalty"
                className="w-full h-[300px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-['Noto_Sans_KR'] text-sm"
              />
            </div>

            {/* 연상 이미지 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-['Noto_Sans_KR'] font-medium text-black">연상 이미지</h3>
                  <span className="text-red-500">*</span>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{associatedImage.length}/500</span>
              </div>
              <textarea
                value={associatedImage}
                onChange={(e) => setAssociatedImage(e.target.value)}
                maxLength={500}
                placeholder="Associated Image"
                className="w-full h-[300px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-['Noto_Sans_KR'] text-sm"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handlePrevious}
                className="flex-1 bg-gray-800 text-white py-4 rounded-lg font-['Noto_Sans_KR'] font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 6L8 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>이전</span>
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-gray-800 text-white py-4 rounded-lg font-['Noto_Sans_KR'] font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
              >
                <span>다음</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Managing Guide Sidebar */}
        <div className="absolute right-0 top-0 w-[320px] h-full bg-white border-l border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#666" strokeWidth="1.5"/>
                <path d="M10 6V10L14 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h4 className="text-lg font-['Noto_Sans_KR'] font-medium text-black">Managing Guide</h4>
            </div>
            <div className="h-px bg-gray-200 mb-6"></div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-['Noto_Sans_KR'] font-bold text-black mb-3">브랜드 매니징은 무엇인가요?</h5>
              <p className="text-sm text-gray-600 font-['Noto_Sans_KR'] leading-relaxed mb-4">
                브랜드 매니징은 브랜드의 가치를 창출하고 유지하기 위한 전략적 활동입니다.
                <br /><br />
                시장에서의 경쟁력을 강화하는 것을 목표로 브랜드의 인지도, 이미지, 충성도 등 브랜드 자산을 관리하여 
                브랜드의 정체성을 명확히 하고 일관된 메시지를 전달하며, 소비자와의 긍정적인 관계를 관리하는 일입니다.
              </p>
              
              {/* Brand Management Diagram */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-full h-40 bg-white rounded border flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 16L16 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-xs">Brand Management Process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}