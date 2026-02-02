'use client';

import { useState } from 'react';
import Link from 'next/link';

// 헤더
function Header() {
  return (
    <header className="h-[63px] flex items-center px-[30px] border-b border-[#e5e5e5] bg-white">
      <Link href="/" className="text-[22px] font-semibold text-[#2a2931]">
        artnex.
      </Link>
      <nav className="flex-1 flex items-center justify-center gap-8">
        <Link href="/brand-develop" className="text-[16px] font-medium text-[#606177]">브랜드 개발</Link>
        <Link href="/brand-manager" className="text-[16px] font-medium text-[#606177]">브랜드매니저</Link>
        <Link href="/marketing" className="text-[16px] font-medium text-[#2a2931]">마케팅</Link>
        <Link href="/support" className="text-[16px] font-medium text-[#606177]">지원사업</Link>
      </nav>
      <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
        분석하기
      </Link>
    </header>
  );
}

interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  price: string;
}

export default function MarketingPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', 'SNS 마케팅', '퍼포먼스', '콘텐츠', '인플루언서'];

  const services: Service[] = [
    { id: 1, title: '인스타그램 계정 운영', category: 'SNS 마케팅', description: '브랜드 계정 기획부터 콘텐츠 제작, 운영까지', features: ['월 20개 피드', '스토리/릴스', '댓글 관리'], price: '월 150만원~' },
    { id: 2, title: '메타 광고 운영', category: '퍼포먼스', description: 'Facebook/Instagram 광고 세팅부터 최적화까지', features: ['타겟 설계', '소재 제작', 'ROAS 최적화'], price: '월 100만원~' },
    { id: 3, title: '숏폼 콘텐츠 패키지', category: '콘텐츠', description: '릴스, 틱톡, 쇼츠에 최적화된 숏폼 영상 제작', features: ['월 8개 영상', '트렌드 기획', '자막/효과'], price: '월 200만원~' },
    { id: 4, title: '인플루언서 마케팅', category: '인플루언서', description: '브랜드에 맞는 인플루언서 매칭 및 캠페인', features: ['인플루언서 섭외', '콘텐츠 가이드', '성과 트래킹'], price: '건당 50만원~' },
  ];

  const filteredServices = services.filter(s => activeCategory === '전체' || s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f8fe]">
      <Header />

      <main className="py-[60px]">
        <div className="max-w-[1460px] mx-auto px-[30px]">
          {/* 타이틀 */}
          <div className="text-center mb-[60px]">
            <h1 className="text-[50px] font-bold text-[#2a2931] leading-[1.2] mb-4">
              브랜드를 성장시키는<br />마케팅 솔루션
            </h1>
            <p className="text-[20px] font-medium text-[#606177]">
              SNS 마케팅부터 퍼포먼스 광고까지, 최적의 마케팅 전략을 제안합니다.
            </p>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-4 gap-6 mb-[60px]">
            {[
              { value: '420%', label: '평균 ROAS' },
              { value: '300+', label: '마케팅 캠페인' },
              { value: '50M+', label: '총 도달 수' },
              { value: '98%', label: '고객 만족도' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-[16px] p-8 text-center">
                <div className="text-[36px] font-bold text-[#2a2931] mb-2">{stat.value}</div>
                <div className="text-[16px] text-[#908f9f]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-[16px] font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#2a2931] text-white'
                    : 'bg-white text-[#606177] border border-[#e5e5e5] hover:border-[#2a2931]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 서비스 그리드 */}
          <div className="grid grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-[16px] p-8 hover:shadow-lg transition-shadow">
                <span className="inline-block px-4 py-1 bg-[#f8f8fe] text-[#606177] text-[14px] font-medium rounded-full mb-4">
                  {service.category}
                </span>
                <h3 className="text-[22px] font-semibold text-[#2a2931] mb-2">{service.title}</h3>
                <p className="text-[16px] text-[#606177] mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-[16px] text-[#2a2931]">
                      <span className="w-5 h-5 bg-[#f8f8fe] rounded-full flex items-center justify-center text-[12px]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                  <span className="text-[20px] font-bold text-[#2a2931]">{service.price}</span>
                  <button className="px-6 py-3 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]">
                    상담하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
