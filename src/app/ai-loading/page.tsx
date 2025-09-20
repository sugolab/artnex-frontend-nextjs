'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GNB, Footer } from '@/components/layout';
import { Button } from '@/components/common';

export default function AILoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [dots, setDots] = useState('');

  const loadingMessages = [
    '브랜드 데이터를 수집하고 있습니다',
    '시장 트렌드를 분석하고 있습니다',
    '경쟁사 정보를 조사하고 있습니다',
    'AI가 브랜드 전략을 수립하고 있습니다',
    '최적화된 브랜드 아이덴티티를 생성하고 있습니다'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            router.push('/report/result');
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [router]);

  useEffect(() => {
    const messageIndex = Math.floor(progress / 20);
    if (messageIndex < loadingMessages.length) {
      setCurrentMessage(loadingMessages[messageIndex]);
    }
  }, [progress]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  const handleCancel = () => {
    if (confirm('AI 생성을 취소하시겠습니까?')) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* GNB - 1920×90 */}
      <GNB />

      {/* Main Content - Frame 385 (1920×990) */}
      <main className="relative w-full h-[990px] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        
        {/* Loading Content - Frame 380 (440×181) */}
        <div className="w-[440px] h-[181px] flex flex-col items-center justify-center">
          
          {/* AI 아이콘 또는 로딩 애니메이션 */}
          <div className="mb-8 relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* 진행률 표시 */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-noto-medium text-gray-600">AI 분석 진행률</span>
              <span className="text-sm font-noto-bold text-black">{progress}%</span>
            </div>
            
            {/* 프로그레스 바 */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 현재 작업 메시지 */}
          <div className="text-center">
            <p className="text-lg font-noto-medium text-black mb-2">
              {currentMessage}{dots}
            </p>
            <p className="text-sm font-noto-regular text-gray-500">
              잠시만 기다려주세요. AI가 최고의 브랜드 전략을 수립하고 있습니다.
            </p>
          </div>

          {/* 취소 버튼 */}
          <div className="mt-8">
            <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              취소
            </Button>
          </div>
        </div>

        {/* 배경 그래픽 요소 */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-800" />
        </div>
      </main>

      {/* Footer - 1920×90 */}
      <Footer />
    </div>
  );
}