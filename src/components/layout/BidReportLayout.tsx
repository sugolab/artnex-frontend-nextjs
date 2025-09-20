'use client';

import { ReactNode } from 'react';

interface BidReportLayoutProps {
  children: ReactNode;
  title: string;
  currentStep: number;
}

export default function BidReportLayout({ children, title, currentStep }: BidReportLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-neutral-0 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-lg sm:px-xl lg:px-xxl">
          <div className="flex justify-between items-center py-xl">
            <div className="flex items-center">
              <h1 className="text-2xl font-futura-bold text-neutral-900">artnex.</h1>
            </div>
            <div className="flex items-center space-x-lg">
              <span className="text-sm font-noto-regular text-neutral-500">Brand Identity 설정</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-lg sm:px-xl lg:px-xxl py-xxl">
        <div className="grid grid-cols-12 gap-xxl">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="bg-neutral-0 rounded-lg shadow-md border border-neutral-200 p-xl">
              <h2 className="text-lg font-futura-demi text-neutral-900 mb-lg">목차</h2>
              <nav className="space-y-sm">
                <div className={`p-md rounded-md font-noto-regular transition-colors ${currentStep === 1 ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  01. Brand Identity
                </div>
                <div className={`p-md rounded-md font-noto-regular transition-colors ${currentStep === 2 ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  02. Brand's Management
                </div>
                <div className={`p-md rounded-md font-noto-regular transition-colors ${currentStep === 3 ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  03. Brand Planning
                </div>
                <div className={`p-md rounded-md font-noto-regular transition-colors ${currentStep === 4 ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  04. Competitor Analysis
                </div>
                <div className={`p-md rounded-md font-noto-regular transition-colors ${currentStep === 5 ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  05. Brand Logo
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-6">
            <div className="bg-neutral-0 rounded-lg shadow-md border border-neutral-200 p-xxl">
              <h1 className="text-3xl font-futura-bold text-neutral-900 mb-xxl">{title}</h1>
              {children}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="bg-neutral-0 rounded-lg shadow-md border border-neutral-200 p-xl">
              <h3 className="text-lg font-futura-demi text-neutral-900 mb-lg">리포트 결과</h3>
              <div className="space-y-lg">
                <div className="p-lg bg-neutral-50 rounded-md">
                  <h4 className="font-noto-bold text-neutral-900 mb-sm">입력한 정보 확인</h4>
                  <p className="text-sm font-noto-regular text-neutral-600">
                    입력한 정보들이 여기에 실시간으로 표시됩니다.
                  </p>
                </div>
                <div className="p-lg bg-neutral-50 rounded-md">
                  <h4 className="font-noto-bold text-neutral-900 mb-sm">진행 상황</h4>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-noto-regular text-neutral-600 mt-sm">
                    {currentStep}/5 단계 완료
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}