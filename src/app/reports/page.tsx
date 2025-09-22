'use client';

import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';

export default function ReportsLandingPage() {
  const router = useRouter();

  const reportTypes = [
    {
      id: 'bid',
      title: 'BID Report',
      subtitle: 'BID리포트는 브랜딩에서 가장 기본이 되는 브랜드의 방향성 / 위치',
      description: '설정 과정으로써나의 브랜드의 중심값이 무엇인지 정확하게 표현해 주는 툴입니다.',
      route: '/report/bid/brand-identity',
      available: true,
      isMain: true
    },
    {
      id: 'visual',
      title: 'Visual Report',
      subtitle: '브랜드의 비주얼적인 방향을 제시해주며 브랜딩의 아이덴티티의 핵심이 되는',
      description: '비주얼적인 요소를 전혀전과 사용법에 맞는 색상을 비주얼을 가이드해드립니다.',
      route: '/reports/visual',
      available: true,
      isMain: false
    },
    {
      id: 'marketing',
      title: 'Marketing Report',
      subtitle: '마케팅은 과학적 연구 차원을 넘어 이론적 요실을 통한의',
      description: '실질적 적용의 눈으로 타겟과 플랫폼 정의를 통해 확실한 실행을 도전하겠습니다.',
      route: '/reports/marketing',
      available: true,
      isMain: false
    }
  ];

  const handleStartReport = (reportId: string) => {
    const report = reportTypes.find(r => r.id === reportId);
    if (report && report.available) {
      router.push(report.route);
    }
  };

  return (
    <div className="bg-white" style={{ width: '1920px', height: '1080px', margin: '0 auto' }}>
      {/* GNB - 1920×90 - Standard Figma design */}
      <div style={{ height: '90px' }}>
        <GNB variant="standard" />
      </div>

      {/* Main Content Area with Figma Background - 1920×899 */}
      <main className="relative size-full" style={{ width: '1920px', height: '899px' }}>
        <div className="absolute h-[962.087px] left-[4px] top-[-35.31px] w-[1923px]">
          <div className="absolute bottom-0 left-[-0.1%] right-[-0.08%] top-0">
            <img alt="" className="block max-w-none size-full" src="/assets/contents-bg.svg" />
          </div>
        </div>
 
        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-black mb-4">
              create our brand's ABO
            </h1>
            <p className="text-lg text-gray-600">
              우리 브랜드만의 언어와 원칙,색인과<br />
              슬선적인 AI 패러다임 안드차곤.
            </p>
          </div>

          {/* Report Buttons */}
          <div className="flex flex-col gap-4" style={{ width: '600px' }}>
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => handleStartReport(report.id)}
                className={`group p-6 rounded-lg transition-all duration-300 cursor-pointer text-left ${
                  report.isMain
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-white border border-gray-300 text-black hover:border-gray-400 hover:shadow-md'
                }`}
                style={{ height: '120px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      report.isMain ? 'text-white' : 'text-black'
                    }`}>
                      {report.title}
                    </h3>
                    <p className={`text-sm mb-1 ${
                      report.isMain ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {report.subtitle}
                    </p>
                    <p className={`text-xs ${
                      report.isMain ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {report.description}
                    </p>
                  </div>
                  <div className={`ml-4 ${
                    report.isMain ? 'text-white' : 'text-black'
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - 1920×90 */}
      <Footer />
    </div>
  );
}