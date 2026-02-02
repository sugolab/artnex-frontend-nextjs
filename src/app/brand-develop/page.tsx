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
      <nav className="flex-1 flex items-center justify-center gap-8">
        <Link href="/brand-develop" className="text-[16px] font-medium text-[#2a2931]">브랜드 개발</Link>
        <Link href="/brand-manager" className="text-[16px] font-medium text-[#606177]">브랜드매니저</Link>
        <Link href="/marketing" className="text-[16px] font-medium text-[#606177]">마케팅</Link>
        <Link href="/support" className="text-[16px] font-medium text-[#606177]">지원사업</Link>
      </nav>
      <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
        분석하기
      </Link>
    </header>
  );
}

interface AnalysisResult {
  name: string;
  slogan: string;
  concept: string;
  tags: string[];
}

export default function BrandDevelopPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const recommendedPrompts = [
    {
      category: '감성 키워드 중심',
      text: '요즘 스타일의 힙하고\n트렌디한 뷰티 브랜드를 갖고 싶어!',
    },
    {
      category: '가치중심 브랜드',
      text: '지속가능성과 디자인을 모두 갖춘\n리빙 브랜드를 만들어줘.',
    },
    {
      category: '타겟 중심 브랜드',
      text: '20대 여성을 위한 럭셔리\n스킨케어 브랜드를 만들고 싶어.',
    },
  ];

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      alert('브랜드 아이디어를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        name: 'SENNOK',
        slogan: 'Pure Balance, Subtle Glow',
        concept: '피부 상태와 생활 패턴을 분석해 맞춤 솔루션을 제안합니다. 자연의 순수함과 디자인의 감도가 조화된 "오가닉 감성 뷰티"를 지향합니다.',
        tags: ['자연주의', '미니멀', '감도높은'],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8fe]">
      <Header />

      <main className="py-[60px]">
        <div className="max-w-[1611px] mx-auto px-[30px]">
          {/* 검색 카드 */}
          <div className="bg-white rounded-[16px] p-[50px] mb-8">
            {/* 타이틀 */}
            <h1 className="text-[26px] font-bold text-[#2a2931] mb-8">
              당신이 원하는 브랜드는 무엇인가요?
            </h1>

            {/* 검색창 */}
            <div className="flex gap-3 mb-10">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="원하는 브랜드를 간단하게 설명해보세요."
                className="flex-1 max-w-[1057px] px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] font-medium text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-[111px] py-4 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg hover:bg-[#3a3941] disabled:opacity-50"
              >
                {isLoading ? '...' : '검색'}
              </button>
            </div>

            {/* 추천 프롬프트 */}
            {!result && (
              <div>
                <p className="text-[16px] font-semibold text-[#2a2931] mb-4">추천 프롬프트</p>
                <div className="flex gap-4">
                  {recommendedPrompts.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(item.text.replace('\n', ' '))}
                      className="w-[345px] bg-white border border-[#e5e5e5] rounded-[12px] p-5 text-left hover:border-[#2a2931] transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="w-[67px] h-[99px] bg-[#f8f8fe] rounded-lg flex-shrink-0"></div>
                        <div>
                          <p className="text-[14px] font-semibold text-[#908f9f] mb-2">{item.category}</p>
                          <p className="text-[16px] font-semibold text-[#2a2931] whitespace-pre-line leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 로딩 */}
          {isLoading && (
            <div className="bg-white rounded-[16px] p-[80px] text-center">
              <div className="animate-spin w-12 h-12 border-4 border-[#2a2931] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-[18px] text-[#908f9f]">AI가 브랜드를 분석하고 있습니다...</p>
            </div>
          )}

          {/* 결과 */}
          {result && (
            <div className="bg-white rounded-[16px] overflow-hidden">
              <div className="flex">
                {/* 이미지 */}
                <div className="w-[303px] h-[231px] bg-gradient-to-br from-pink-200 to-purple-200 flex-shrink-0"></div>
                
                {/* 정보 */}
                <div className="flex-1 p-8">
                  <h2 className="text-[22px] font-semibold text-[#2a2931] mb-2">{result.name}</h2>
                  <p className="text-[16px] font-medium text-[#908f9f] mb-4">{result.slogan}</p>
                  <p className="text-[16px] font-medium text-[#2a2931] leading-relaxed mb-4">{result.concept}</p>
                  <div className="flex gap-2">
                    {result.tags.map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-[#f8f8fe] text-[#2a2931] text-[14px] font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="border-t border-[#e5e5e5] p-6 flex gap-3">
                <Link href="/ai-manager" className="flex-1 py-4 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg text-center hover:bg-[#3a3941]">
                  AI 매니저로 관리하기
                </Link>
                <Link href="/brand-manager" className="flex-1 py-4 border border-[#2a2931] text-[#2a2931] text-[18px] font-medium rounded-lg text-center hover:bg-[#f8f8fe]">
                  브랜드매니저 상담
                </Link>
                <button 
                  onClick={() => { setResult(null); setPrompt(''); }}
                  className="px-8 py-4 border border-[#e5e5e5] text-[#606177] text-[18px] font-medium rounded-lg hover:bg-[#f8f8fe]"
                >
                  다시
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
