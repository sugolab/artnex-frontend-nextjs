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
        <Link href="/marketing" className="text-[16px] font-medium text-[#606177]">마케팅</Link>
        <Link href="/support" className="text-[16px] font-medium text-[#2a2931]">지원사업</Link>
      </nav>
      <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
        분석하기
      </Link>
    </header>
  );
}

interface Program {
  id: number;
  title: string;
  organization: string;
  category: string;
  amount: string;
  deadline: string;
  status: 'open' | 'upcoming' | 'closed';
  description: string;
}

export default function SupportPage() {
  const [category, setCategory] = useState('전체');
  const [status, setStatus] = useState('전체');

  const categories = ['전체', '창업지원', '마케팅', 'R&D', '수출', '인력'];
  const statuses = ['전체', '접수중', '접수예정'];

  const programs: Program[] = [
    { id: 1, title: '2026년 소상공인 온라인 판로지원사업', organization: '소상공인시장진흥공단', category: '마케팅', amount: '최대 500만원', deadline: '2026.03.15', status: 'open', description: '온라인 판로 개척을 위한 마케팅 비용 지원' },
    { id: 2, title: '창업성장기술개발사업 (디딤돌)', organization: '중소벤처기업부', category: 'R&D', amount: '최대 1억원', deadline: '2026.02.28', status: 'open', description: 'R&D 및 사업화 자금 지원' },
    { id: 3, title: '청년창업사관학교 15기', organization: '중소벤처기업진흥공단', category: '창업지원', amount: '최대 1억원', deadline: '2026.04.01', status: 'upcoming', description: '창업교육, 멘토링, 사업화 자금 통합 지원' },
    { id: 4, title: '수출바우처사업', organization: 'KOTRA', category: '수출', amount: '최대 3,000만원', deadline: '2026.03.31', status: 'open', description: '해외마케팅, 물류, 특허 등 수출 서비스 바우처' },
    { id: 5, title: '고용창출장려금', organization: '고용노동부', category: '인력', amount: '월 80만원/인', deadline: '상시', status: 'open', description: '신규 인력 채용 시 인건비 지원' },
  ];

  const filteredPrograms = programs.filter(p => {
    const matchCategory = category === '전체' || p.category === category;
    const matchStatus = status === '전체' || 
      (status === '접수중' && p.status === 'open') ||
      (status === '접수예정' && p.status === 'upcoming');
    return matchCategory && matchStatus;
  });

  const statusColors = {
    open: 'bg-green-100 text-green-700',
    upcoming: 'bg-blue-100 text-blue-700',
    closed: 'bg-gray-100 text-gray-500',
  };
  const statusLabels = { open: '접수중', upcoming: '접수예정', closed: '마감' };

  return (
    <div className="min-h-screen bg-[#f8f8fe]">
      <Header />

      <main className="py-[60px]">
        <div className="max-w-[1460px] mx-auto px-[30px]">
          {/* 타이틀 */}
          <div className="text-center mb-[40px]">
            <h1 className="text-[50px] font-bold text-[#2a2931] leading-[1.2] mb-4">
              지원사업 찾기
            </h1>
            <p className="text-[20px] font-medium text-[#606177]">
              브랜드 성장에 필요한 정부지원사업을 찾아보세요.
            </p>
          </div>

          {/* AI 추천 배너 */}
          <div className="bg-[#2a2931] rounded-[16px] p-8 mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-[26px] font-bold text-white mb-2">내 브랜드에 맞는 지원사업 찾기</h2>
              <p className="text-[18px] text-[#908f9f]">브랜드 정보를 입력하면 AI가 적합한 지원사업을 추천해드립니다.</p>
            </div>
            <Link href="/brand-develop" className="px-8 py-4 bg-white text-[#2a2931] text-[18px] font-semibold rounded-lg hover:bg-gray-100">
              AI 추천받기
            </Link>
          </div>

          {/* 필터 */}
          <div className="bg-white rounded-[16px] p-6 mb-8">
            <div className="flex gap-8">
              <div className="flex-1">
                <label className="text-[16px] font-semibold text-[#2a2931] mb-3 block">카테고리</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-5 py-2 rounded-full text-[15px] font-medium transition-colors ${
                        category === cat
                          ? 'bg-[#2a2931] text-white'
                          : 'bg-[#f8f8fe] text-[#606177] hover:bg-[#e5e5e5]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[16px] font-semibold text-[#2a2931] mb-3 block">접수상태</label>
                <div className="flex gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-5 py-2 rounded-full text-[15px] font-medium transition-colors ${
                        status === s
                          ? 'bg-[#2a2931] text-white'
                          : 'bg-[#f8f8fe] text-[#606177] hover:bg-[#e5e5e5]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 지원사업 목록 */}
          <div className="grid grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-[16px] p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[14px] font-medium ${statusColors[program.status]}`}>
                    {statusLabels[program.status]}
                  </span>
                  <span className="text-[14px] text-[#908f9f]">{program.category}</span>
                </div>
                
                <h3 className="text-[20px] font-semibold text-[#2a2931] mb-2">{program.title}</h3>
                <p className="text-[16px] text-[#606177] mb-2">{program.organization}</p>
                <p className="text-[16px] text-[#908f9f] mb-4">{program.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                  <div>
                    <p className="text-[14px] text-[#908f9f]">지원금액</p>
                    <p className="text-[18px] font-bold text-[#2a2931]">{program.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] text-[#908f9f]">마감일</p>
                    <p className="text-[18px] font-semibold text-[#2a2931]">{program.deadline}</p>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-3 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]">
                  자세히 보기
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
