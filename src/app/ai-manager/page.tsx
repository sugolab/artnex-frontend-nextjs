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
      <span className="ml-4 text-[18px] font-medium text-[#2a2931]">AI 매니저</span>
      <div className="flex-1"></div>
      <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
        분석하기
      </Link>
    </header>
  );
}

type TabType = 'summary' | 'quiz' | 'concept' | 'memo' | 'ai-tutor';

interface BrandData {
  name: string;
  slogan: string;
  description: string;
  tags: string[];
  details: { label: string; value: string }[];
}

export default function AIManagerPage() {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: '안녕하세요! SENNOK 브랜드의 AI 튜터입니다. 브랜드에 대해 궁금한 점을 물어보세요.' }
  ]);
  const [memo, setMemo] = useState('');

  const brand: BrandData = {
    name: 'SENNOK',
    slogan: 'Pure Balance, Subtle Glow',
    description: '피부 상태와 생활 패턴을 분석해 맞춤 솔루션을 제안합니다. 자연의 순수함과 디자인의 감도가 조화된 "오가닉 감성 뷰티"를 지향합니다.',
    tags: ['자연주의', '미니멀', '감도높은'],
    details: [
      { label: '카테고리', value: '스킨케어 / 뷰티' },
      { label: '타겟 고객', value: '환경을 생각하는 2030 여성' },
      { label: '가격대', value: '중고가 (3-7만원대)' },
      { label: '판매 채널', value: '자사몰, 무신사 뷰티' },
    ],
  };

  const tabs = [
    { id: 'summary', label: '요약' },
    { id: 'quiz', label: '퀴즈' },
    { id: 'concept', label: '개념' },
    { id: 'memo', label: '메모' },
    { id: 'ai-tutor', label: 'AI 튜터' },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', content: chatInput }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'ai',
        content: `"${chatInput}"에 대한 답변입니다.\n\nSENNOK은 클린뷰티를 지향하는 스킨케어 브랜드로, 자연 유래 성분을 사용하면서도 세련된 디자인을 추구합니다.`
      }]);
    }, 1000);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#f8f8fe]">
      <Header />

      <main className="py-[40px]">
        <div className="max-w-[1460px] mx-auto px-[30px]">
          <div className="flex gap-8">
            {/* 좌측: 브랜드 카드 */}
            <div className="w-[320px] flex-shrink-0">
              <div className="bg-white rounded-[16px] overflow-hidden sticky top-[100px]">
                {/* 브랜드 이미지 */}
                <div className="h-[200px] bg-gradient-to-br from-pink-100 to-purple-100 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=200&fit=crop"
                    alt={brand.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 브랜드 정보 */}
                <div className="p-6">
                  <h1 className="text-[22px] font-semibold text-[#2a2931] mb-1">{brand.name}</h1>
                  <p className="text-[16px] font-medium text-[#908f9f] mb-4">{brand.slogan}</p>
                  <p className="text-[16px] text-[#606177] leading-relaxed mb-4">{brand.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {brand.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#f8f8fe] text-[#606177] text-[14px] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-[#e5e5e5]">
                    {brand.details.map((detail, i) => (
                      <div key={i} className="flex justify-between text-[14px]">
                        <span className="text-[#908f9f]">{detail.label}</span>
                        <span className="text-[#2a2931] font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 우측: 탭 콘텐츠 */}
            <div className="flex-1">
              {/* 탭 네비게이션 */}
              <div className="bg-white rounded-[12px] p-2 mb-6 flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex-1 flex items-center justify-center py-3 rounded-lg text-[16px] font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#2a2931] text-white'
                        : 'text-[#606177] hover:bg-[#f8f8fe]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 탭 콘텐츠 */}
              <div className="bg-white rounded-[16px] p-8 min-h-[500px]">
                {activeTab === 'summary' && (
                  <div>
                    <h2 className="text-[22px] font-semibold text-[#2a2931] mb-6">브랜드 요약</h2>
                    <div className="space-y-4">
                      <div className="p-5 bg-[#f8f8fe] rounded-[12px]">
                        <h3 className="text-[16px] font-semibold text-[#2a2931] mb-2">브랜드 비전</h3>
                        <p className="text-[16px] text-[#606177]">자연의 순수함과 현대적 감성이 조화된 클린뷰티 브랜드</p>
                      </div>
                      <div className="p-5 bg-[#f8f8fe] rounded-[12px]">
                        <h3 className="text-[16px] font-semibold text-[#2a2931] mb-2">핵심 가치</h3>
                        <ul className="list-disc list-inside text-[16px] text-[#606177] space-y-1">
                          <li>자연 유래 성분 사용 (95% 이상)</li>
                          <li>친환경 패키지 (재활용 가능)</li>
                          <li>크루얼티 프리 (동물실험 반대)</li>
                        </ul>
                      </div>
                      <div className="p-5 bg-[#f8f8fe] rounded-[12px]">
                        <h3 className="text-[16px] font-semibold text-[#2a2931] mb-2">경쟁 우위</h3>
                        <p className="text-[16px] text-[#606177]">클린뷰티 + 감각적 디자인의 조합으로 "예쁜 착한 화장품" 포지셔닝</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div>
                    <h2 className="text-[22px] font-semibold text-[#2a2931] mb-6">브랜드 퀴즈</h2>
                    <div className="space-y-6">
                      <div className="p-6 border border-[#e5e5e5] rounded-[12px]">
                        <p className="text-[18px] font-medium text-[#2a2931] mb-4">Q1. SENNOK의 핵심 타겟 고객은?</p>
                        <div className="space-y-2">
                          {['10대 학생', '환경을 생각하는 2030 여성', '40대 이상 주부', '남성 고객'].map((opt, i) => (
                            <button key={i} className="w-full p-4 text-left border border-[#e5e5e5] rounded-lg text-[16px] text-[#2a2931] hover:bg-[#f8f8fe] hover:border-[#2a2931]">
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'concept' && (
                  <div>
                    <h2 className="text-[22px] font-semibold text-[#2a2931] mb-6">핵심 개념</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { term: '클린뷰티', def: '유해 성분을 배제하고 자연 유래 성분을 사용하는 뷰티 트렌드' },
                        { term: '비건 화장품', def: '동물성 원료를 사용하지 않고 동물실험을 하지 않는 화장품' },
                        { term: 'EWG 등급', def: '환경연구단체가 평가하는 화장품 성분 안전성 등급' },
                        { term: '업사이클링', def: '폐기물을 새로운 제품으로 재탄생시키는 친환경 방식' },
                      ].map((item, i) => (
                        <div key={i} className="p-5 bg-[#f8f8fe] rounded-[12px]">
                          <h3 className="text-[18px] font-semibold text-[#2a2931] mb-2">{item.term}</h3>
                          <p className="text-[15px] text-[#606177]">{item.def}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'memo' && (
                  <div>
                    <h2 className="text-[22px] font-semibold text-[#2a2931] mb-6">메모</h2>
                    <textarea
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      placeholder="브랜드에 대한 메모를 작성하세요..."
                      className="w-full h-[350px] p-5 bg-[#f8f8fe] rounded-[12px] text-[16px] text-[#2a2931] placeholder-[#908f9f] resize-none focus:outline-none"
                    />
                    <div className="flex justify-end mt-4">
                      <button className="px-8 py-3 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]">
                        저장하기
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'ai-tutor' && (
                  <div className="flex flex-col h-[500px]">
                    <h2 className="text-[22px] font-semibold text-[#2a2931] mb-4">AI 튜터</h2>
                    
                    {/* 채팅 */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-[#f8f8fe] rounded-[12px]">
                      {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-4 rounded-[12px] ${
                            msg.role === 'user' ? 'bg-[#2a2931] text-white' : 'bg-white border border-[#e5e5e5]'
                          }`}>
                            <p className="text-[15px] whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* 입력 */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="질문을 입력하세요..."
                        className="flex-1 px-5 py-4 bg-[#f8f8fe] rounded-lg text-[16px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-8 py-4 bg-[#2a2931] text-white text-[16px] font-medium rounded-lg hover:bg-[#3a3941]"
                      >
                        전송
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
