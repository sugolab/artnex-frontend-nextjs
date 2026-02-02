'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 헤더
function Header() {
  return (
    <header className="h-[63px] flex items-center px-[30px] border-b border-[#e5e5e5] bg-white">
      <Link href="/" className="text-[22px] font-semibold text-[#2a2931]">
        artnex.
      </Link>
      <span className="ml-4 text-[18px] font-medium text-[#2a2931]">프리랜서 찾기</span>
      <div className="flex-1"></div>
      <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
        분석하기
      </Link>
    </header>
  );
}

interface Manager {
  id: number;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export default function BrandManagerPage() {
  const [activeTab, setActiveTab] = useState<'freelancer' | 'project'>('freelancer');
  const [searchQuery, setSearchQuery] = useState('');

  const managers: Manager[] = [
    { id: 1, name: '김브랜드', title: '브랜드 전략 컨설턴트', category: '브랜딩', rating: 4.9, reviews: 127, tags: ['브랜드전략', '네이밍'] },
    { id: 2, name: '이마케팅', title: '퍼포먼스 마케터', category: '마케팅', rating: 4.8, reviews: 89, tags: ['퍼포먼스', 'SNS광고'] },
    { id: 3, name: '박디자인', title: 'BI/CI 디자이너', category: '디자인', rating: 5.0, reviews: 56, tags: ['로고', 'BI설계'] },
    { id: 4, name: '최콘텐츠', title: 'SNS 콘텐츠 크리에이터', category: 'SNS', rating: 4.7, reviews: 203, tags: ['인스타', '릴스'] },
    { id: 5, name: '정영상', title: '영상 프로듀서', category: '영상', rating: 4.9, reviews: 78, tags: ['브랜드필름', '광고영상'] },
    { id: 6, name: '한전략', title: '브랜드 마케팅 PM', category: '마케팅', rating: 4.8, reviews: 145, tags: ['전략기획', '캠페인'] },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8fe]">
      <Header />

      <main className="py-[40px]">
        <div className="max-w-[1460px] mx-auto px-[30px]">
          {/* 탭 */}
          <div className="flex gap-8 mb-8 border-b border-[#e5e5e5]">
            <button
              onClick={() => setActiveTab('freelancer')}
              className={`pb-4 text-[18px] font-medium border-b-2 transition-colors ${
                activeTab === 'freelancer' 
                  ? 'text-[#2a2931] border-[#2a2931]' 
                  : 'text-[#908f9f] border-transparent'
              }`}
            >
              프리랜서 찾기
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`pb-4 text-[18px] font-medium border-b-2 transition-colors ${
                activeTab === 'project' 
                  ? 'text-[#2a2931] border-[#2a2931]' 
                  : 'text-[#908f9f] border-transparent'
              }`}
            >
              프로젝트 찾기
            </button>
          </div>

          {/* 검색 */}
          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프리랜서명으로 검색"
              className="flex-1 px-5 py-4 bg-white border border-[#e5e5e5] rounded-lg text-[18px] font-medium text-[#2a2931] placeholder-[#908f9f] focus:outline-none focus:border-[#2a2931]"
            />
            <button className="px-8 py-4 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg hover:bg-[#3a3941]">
              검색
            </button>
          </div>

          {/* 매니저 그리드 */}
          <div className="grid grid-cols-3 gap-6">
            {managers.map((manager) => (
              <div key={manager.id} className="bg-white rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
                {/* 이미지 */}
                <div className="h-[180px] bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <Image
                    src={`https://images.unsplash.com/photo-156025009${manager.id}7-0b93528c311a?w=400&h=200&fit=crop`}
                    alt={manager.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 정보 */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[14px] font-medium text-[#908f9f]">{manager.category}</span>
                    <span className="text-[14px] text-[#908f9f]">·</span>
                    <span className="text-[14px] text-[#908f9f]">★ {manager.rating} ({manager.reviews})</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#2a2931] mb-1">{manager.name}</h3>
                  <p className="text-[16px] text-[#606177] mb-4">{manager.title}</p>
                  
                  <div className="flex gap-2 mb-4">
                    {manager.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#f8f8fe] text-[#606177] text-[14px] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full py-3 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]">
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
