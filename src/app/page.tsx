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
        <div className="relative w-full h-[872px]">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2048&h=872&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white"></div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative max-w-[1460px] mx-auto px-[30px] pt-[120px] pb-[80px]">
        <div className="max-w-[600px]">
          <h1 className="text-[50px] font-bold text-[#2a2931] leading-[1.2] mb-6">
            AI와 함께하는<br />
            독창적인 브랜드 만들기
          </h1>
          <p className="text-[20px] font-medium text-[#2a2931] mb-10">
            AI에게 간단한 아이디어를 던져보세요. 빠르고 멋진 당신만의 브랜드가 탄생합니다.
          </p>
          <div className="flex gap-4">
            <Link href="/brand-develop" className="px-8 py-4 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg hover:bg-[#3a3941]">
              브랜드 개발 시작
            </Link>
            <Link href="/brand-manager" className="px-8 py-4 border border-[#2a2931] text-[#2a2931] text-[18px] font-medium rounded-lg hover:bg-[#f8f8fe]">
              브랜드매니저 찾기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI 브랜드 데모 섹션
function AIBrandDemoSection() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <div className="grid grid-cols-2 gap-[60px] items-start">
          {/* 좌측: AI 챗 UI */}
          <div className="bg-[#f8f8fe] rounded-[20px] p-[40px]">
            <div className="bg-white rounded-[16px] p-[30px] shadow-sm">
              <div className="text-[26px] font-semibold text-[#2a2931] mb-6">artnex brand ai</div>
              
              <p className="text-[18px] font-medium text-[#908f9f] mb-4">
                원하는 브랜드를 아트넥스 AI에게 설명해보세요.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="bg-[#f8f8fe] rounded-lg p-4">
                  <p className="text-[18px] font-medium text-[#2a2931]">
                    여성 MZ세대를 겨냥한 네일케어 브랜드를 만들고 싶어.
                  </p>
                </div>
                <div className="bg-[#f8f8fe] rounded-lg p-4">
                  <p className="text-[18px] font-medium text-[#2a2931]">
                    중장년층에 먹힐 브랜드를 만들고 싶은데, 제품이 안 떠올라.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 결과 카드 */}
          <div className="bg-white rounded-[20px] border border-[#e5e5e5] p-[30px]">
            {/* 검색 바 */}
            <div className="flex gap-3 mb-8">
              <select className="px-4 py-3 bg-white border border-[#e5e5e5] rounded-lg text-[18px] font-medium text-[#606177]">
                <option>선택</option>
              </select>
              <input 
                type="text" 
                placeholder="브랜드 이름으로 검색하세요."
                className="flex-1 px-5 py-3 bg-[#f8f8fe] rounded-lg text-[18px] font-medium text-[#2a2931] placeholder-[#908f9f]"
              />
              <button className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
                검색
              </button>
            </div>

            {/* 브랜드 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-[12px] border border-[#e5e5e5] overflow-hidden">
                  <div className="h-[140px] bg-gradient-to-br from-pink-100 to-purple-100"></div>
                  <div className="p-4">
                    <h3 className="text-[22px] font-semibold text-[#2a2931]">SENNOK</h3>
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

// 스마트 브랜드 관리 섹션
function SmartBrandSection() {
  return (
    <section className="py-[120px] bg-white">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <div className="text-center mb-[60px]">
          <h2 className="text-[50px] font-bold text-[#000000] leading-[1.2] mb-4">
            돈도 시간도 낭비하지 마세요<br />
            스마트한 브랜드 관리의 시작
          </h2>
          <p className="text-[20px] font-medium text-[#000000]">
            브랜드 디자인, 콘텐츠, 마케팅 데이터를 하나로 통합해서 관리하세요.
          </p>
        </div>

        <div className="bg-white rounded-[20px] border border-[#e5e5e5] p-[60px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[20px] font-semibold text-[#2a2931] mb-2">
                브랜드·캠페인을 몇 개 운영 중이신가요?
              </p>
              <div className="flex items-center gap-2 text-[16px] text-[#606177]">
                <span>0개</span>
                <input type="range" min="0" max="50" className="w-[200px]" />
                <span>50개</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* 도입 전 */}
            <div className="text-center">
              <p className="text-[24px] font-medium text-[#2a2931] mb-4">도입 전</p>
              <div className="bg-[#f8f8fe] rounded-xl p-6">
                <p className="text-[18px] text-[#908f9f]">총 운영비용</p>
                <p className="text-[28px] font-bold text-[#2a2931]">4,560,000원</p>
              </div>
            </div>
            
            {/* 도입 후 */}
            <div className="text-center">
              <p className="text-[24px] font-medium text-[#2a2931] mb-4">도입 후</p>
              <div className="bg-[#f8f8fe] rounded-xl p-6">
                <p className="text-[18px] text-[#908f9f]">총 운영비용</p>
                <p className="text-[28px] font-bold text-[#2a2931]">1,260,000원</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[28px] font-bold text-[#2a2931]">
              평균 62%의 운영시간과 48%의 콘텐츠 제작비용이 절감됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 서비스 카드 섹션
function ServicesSection() {
  const services = [
    { title: '브랜딩', desc: 'AI 브랜드 생성', link: '/brand-develop' },
    { title: '마케팅', desc: '마케팅 전략 수립', link: '/marketing' },
    { title: '지원사업', desc: '정부지원 연결', link: '/support' },
    { title: '매니저', desc: '전문가 매칭', link: '/brand-manager' },
  ];

  return (
    <section className="py-[120px] bg-[#f8f8fe]">
      <div className="max-w-[1460px] mx-auto px-[30px]">
        <h2 className="text-[50px] font-bold text-[#2a2931] leading-[1.2] mb-[60px]">
          브랜드 성장의 모든 것
        </h2>
        
        <div className="grid grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.link}
              className="bg-white rounded-[16px] p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#f8f8fe] rounded-xl mb-6"></div>
              <h3 className="text-[22px] font-semibold text-[#2a2931] mb-2">{service.title}</h3>
              <p className="text-[16px] text-[#908f9f]">{service.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[16px] font-medium text-[#2a2931]">
                자세히 보기 <span>→</span>
              </div>
            </Link>
          ))}
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
        <AIBrandDemoSection />
        <SmartBrandSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
