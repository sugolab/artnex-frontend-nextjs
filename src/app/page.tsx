'use client';

import Link from 'next/link';
import Image from 'next/image';

// 헤더
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-[63px] border-b border-[#e5e5e5]">
      <div className="max-w-[1860px] mx-auto px-[30px] h-full flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-[22px] font-semibold text-[#2a2931]">
          artnex.
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-8">
          <Link href="/brand-develop" className="text-[16px] font-medium text-[#606177] hover:text-[#2a2931]">
            브랜드 개발
          </Link>
          <Link href="/brand-manager" className="text-[16px] font-medium text-[#606177] hover:text-[#2a2931]">
            브랜드매니저
          </Link>
          <Link href="/marketing" className="text-[16px] font-medium text-[#606177] hover:text-[#2a2931]">
            마케팅
          </Link>
          <Link href="/support" className="text-[16px] font-medium text-[#606177] hover:text-[#2a2931]">
            지원사업
          </Link>
        </nav>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[16px] font-medium text-[#606177] hover:text-[#2a2931]">
            로그인
          </Link>
          <Link href="/register" className="px-6 py-2.5 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]">
            무료 시작
          </Link>
        </div>
      </div>
    </header>
  );
}

// 히어로 섹션
function HeroSection() {
  return (
    <section className="pt-[63px] relative">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 pt-[63px]">
        <div className="relative w-full h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=2048&h=600&fit=crop"
            alt="화장품 배경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40"></div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative max-w-[1460px] mx-auto px-[30px] pt-[140px] pb-[140px]">
        <div className="max-w-[500px]">
          <h1 className="text-[50px] font-bold text-[#2a2931] leading-[1.2] mb-6">
            화장품 제조의 모든 과정<br />
            한 곳에서 해결하세요
          </h1>
          <div className="flex gap-4 mt-10">
            <Link href="/register" className="px-8 py-4 bg-[#4880FF] text-white text-[18px] font-medium rounded-lg hover:bg-[#3a70ef]">
              지금 신청하기
            </Link>
            <Link href="/brand-develop" className="px-8 py-4 bg-[#4880FF] text-white text-[18px] font-medium rounded-lg hover:bg-[#3a70ef]">
              무료 사용하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 통계 섹션
function StatsSection() {
  const stats = [
    { value: '700+', label: '누적 브랜드 수' },
    { value: '60%', label: '평균 운영비용 감소' },
    { value: '420%', label: '평균 ROI 개선' },
    { value: '90%', label: '고객 만족도 유지' },
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <h2 className="text-[26px] font-bold text-[#2a2931] mb-2">
          수많은 브랜드가
        </h2>
        <p className="text-[26px] font-bold text-[#2a2931] mb-10">
          아트넥스 도입의 성과를 보여주고 있습니다.
        </p>

        <div className="flex gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 py-6 border-t border-[#e5e5e5]">
              <div className="text-[36px] font-bold text-[#2a2931] mb-2">{stat.value}</div>
              <div className="text-[14px] text-[#908f9f]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 스마트 브랜드 관리 섹션
function SmartBrandSection() {
  return (
    <section className="py-[80px] bg-[#f8f8fe]">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <h2 className="text-[26px] font-bold text-[#2a2931] mb-2">
          돈도 시간도 낭비하지 마세요
        </h2>
        <p className="text-[26px] font-bold text-[#2a2931] mb-4">
          스마트한 브랜드 관리의 시작
        </p>
        <p className="text-[16px] text-[#606177] mb-10">
          브랜드 디자인, 콘텐츠, 마케팅 데이터를 통합해 효율적으로 관리하세요. 뛰어난 솔루션이 당신을 도와줄 것입니다.
        </p>

        <div className="bg-white rounded-[16px] p-[40px] flex gap-[60px]">
          {/* 좌측: AI 챗 UI */}
          <div className="flex-1">
            <div className="bg-[#f8f8fe] rounded-[12px] p-6 mb-4">
              <p className="text-[14px] font-semibold text-[#2a2931] mb-4">브랜드·캠페인을 몇 개 운영 중이신가요?</p>
              <div className="flex items-center gap-4">
                <span className="text-[14px] text-[#908f9f]">0개</span>
                <input type="range" min="0" max="50" defaultValue="25" className="flex-1" />
                <span className="text-[14px] text-[#908f9f]">50개</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#f8f8fe] rounded-[12px] p-4">
                <p className="text-[14px] text-[#606177]">
                  내가 운영하는 브랜드의 타겟 유저는 누구인가요?
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-white rounded text-[12px] text-[#606177]">20대 여성</span>
                  <span className="px-3 py-1 bg-white rounded text-[12px] text-[#606177]">30대 남성</span>
                </div>
              </div>
              <div className="bg-[#f8f8fe] rounded-[12px] p-4">
                <p className="text-[14px] text-[#606177]">
                  매달 사용하는 마케팅 예산이 어느정도인가요?
                </p>
                <p className="text-[14px] text-[#4880FF] mt-2">월 100만원 ~ 500만원</p>
              </div>
              <div className="bg-[#f8f8fe] rounded-[12px] p-4">
                <p className="text-[14px] text-[#606177]">
                  매달 브랜드 콘텐츠 제작이 소요되는 시간은?
                </p>
                <p className="text-[14px] text-[#4880FF] mt-2">주당 10시간 / 월 40시간정도</p>
              </div>
            </div>
          </div>

          {/* 우측: 비용 비교 */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-[14px] font-semibold text-[#2a2931] mb-2">아트넥스 도입 기대 효과</p>
              <p className="text-[14px] text-[#908f9f]">아트넥스 도입 시 연간 ROI를 계산합니다</p>
            </div>

            <div className="bg-[#f8f8fe] rounded-[12px] p-6 mb-4">
              <p className="text-[16px] font-semibold text-[#2a2931] mb-4">
                평균 62%의 운영시간과 48%의<br />
                콘텐츠 제작비용이 절감됩니다.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 text-center">
                <div className="h-[120px] bg-[#E8E8E8] rounded-[8px] mb-2 flex items-end justify-center pb-4">
                  <div className="w-[60px] h-[80px] bg-[#BDBDBD] rounded"></div>
                </div>
                <p className="text-[14px] text-[#908f9f]">도입 전</p>
              </div>
              <div className="flex items-center text-[24px] text-[#908f9f]">→</div>
              <div className="flex-1 text-center">
                <div className="h-[120px] bg-[#EBF2FF] rounded-[8px] mb-2 flex items-end justify-center pb-4">
                  <div className="w-[60px] h-[50px] bg-[#4880FF] rounded"></div>
                </div>
                <p className="text-[14px] text-[#908f9f]">도입 후</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI 브랜드 섹션
function AIBrandSection() {
  return (
    <section className="py-[80px] bg-white">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <h2 className="text-[26px] font-bold text-[#2a2931] mb-2">
          AI와 함께하는
        </h2>
        <p className="text-[26px] font-bold text-[#2a2931] mb-4">
          독창적인 브랜드 만들기
        </p>
        <p className="text-[16px] text-[#606177] mb-10">
          AI에게 간단한 아이디어를 던져보세요. 빠르고 멋진 당신만의 브랜드가 탄생합니다.
        </p>

        <div className="grid grid-cols-2 gap-[40px]">
          {/* 좌측: AI 챗 UI */}
          <div className="bg-[#f8f8fe] rounded-[16px] p-[30px]">
            <div className="text-[22px] font-semibold text-[#2a2931] mb-6">artnex brand ai</div>
            
            <p className="text-[16px] text-[#908f9f] mb-4">
              원하는 브랜드를 아트넥스 AI에게 설명해보세요.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <p className="text-[16px] text-[#2a2931]">
                  여성 MZ세대를 겨냥한 네일케어 브랜드를 만들고 싶어.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-[16px] text-[#2a2931]">
                  중장년층에 먹힐 브랜드를 만들고 싶은데, 제품이 안 떠올라.
                </p>
              </div>
            </div>
          </div>

          {/* 우측: 결과 카드 */}
          <div className="bg-white rounded-[16px] border border-[#e5e5e5] p-[30px]">
            {/* 검색 바 */}
            <div className="flex gap-3 mb-6">
              <select className="px-4 py-3 bg-white border border-[#e5e5e5] rounded-lg text-[16px] text-[#606177]">
                <option>선택</option>
              </select>
              <input 
                type="text" 
                placeholder="브랜드 이름으로 검색하세요."
                className="flex-1 px-5 py-3 bg-[#f8f8fe] rounded-lg text-[16px] text-[#2a2931] placeholder-[#908f9f]"
              />
              <button className="px-6 py-3 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg">
                검색
              </button>
            </div>

            {/* 브랜드 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-[12px] border border-[#e5e5e5] overflow-hidden">
                  <div className="h-[100px] bg-gradient-to-br from-pink-100 to-purple-100"></div>
                  <div className="p-4">
                    <h3 className="text-[18px] font-semibold text-[#2a2931]">SENNOK</h3>
                    <p className="text-[14px] text-[#908f9f] mt-1">클린 뷰티 브랜드</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 푸터
function Footer() {
  return (
    <footer className="bg-[#2a2931] py-16">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="text-[22px] font-semibold text-white mb-4">artnex.</div>
            <p className="text-[16px] text-[#908f9f]">브랜드 개발의 모든 것</p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-white font-medium mb-4">서비스</h4>
              <div className="space-y-2 text-[14px] text-[#908f9f]">
                <p>브랜드 개발</p>
                <p>브랜드매니저</p>
                <p>마케팅</p>
                <p>지원사업</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">고객지원</h4>
              <div className="space-y-2 text-[14px] text-[#908f9f]">
                <p>자주 묻는 질문</p>
                <p>문의하기</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#3a3941] pt-8 text-[14px] text-[#908f9f]">
          <p>© 2026 Sugolab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <SmartBrandSection />
        <AIBrandSection />
      </main>
      <Footer />
    </div>
  );
}
