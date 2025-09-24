'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { ChevronRight, Lightbulb, Target, TrendingUp, Users } from 'lucide-react';

export default function BrandConsultingStartPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartConsulting = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/consulting/step/1');
    } catch (error) {
      console.error('Start consulting error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const consultingFeatures = [
    {
      icon: Lightbulb,
      title: '브랜드 전략 수립',
      description: '귀하의 브랜드만의 독특한 가치 제안과 포지셔닝 전략을 개발합니다'
    },
    {
      icon: Target,
      title: '타겟 고객 분석',
      description: '정확한 타겟 고객 세분화와 고객 여정 매핑을 제공합니다'
    },
    {
      icon: TrendingUp,
      title: '시장 기회 발굴',
      description: '시장 트렌드 분석을 통한 새로운 비즈니스 기회를 발견합니다'
    },
    {
      icon: Users,
      title: '경쟁사 차별화',
      description: '경쟁사 대비 차별화된 브랜드 우위 요소를 도출합니다'
    }
  ];

  const consultingProcess = [
    {
      step: '01',
      title: '브랜드 현황 진단',
      description: '현재 브랜드 상태와 시장 위치를 종합적으로 분석합니다'
    },
    {
      step: '02',
      title: '목표 고객 정의',
      description: '구체적인 타겟 고객군과 고객 니즈를 명확히 정의합니다'
    },
    {
      step: '03',
      title: '브랜드 전략 수립',
      description: '차별화된 브랜드 포지셔닝과 핵심 메시지를 개발합니다'
    },
    {
      step: '04',
      title: '실행 계획 제안',
      description: '구체적인 브랜드 실행 로드맵과 액션 플랜을 제시합니다'
    },
    {
      step: '05',
      title: '성과 측정 방법',
      description: '브랜드 성과를 측정할 수 있는 KPI와 모니터링 방법을 제공합니다'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GNB />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Logo size="large" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-noto-bold text-gray-900 mb-6">
            브랜드 컨설팅
          </h1>
          
          <p className="text-xl font-noto-medium text-gray-600 mb-8 max-w-3xl mx-auto">
            전문적인 브랜드 분석과 전략 수립을 통해<br />
            귀하의 브랜드를 다음 단계로 발전시켜보세요
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-noto-bold text-blue-600 mb-1">15+</div>
                <div className="text-sm font-noto-medium text-gray-600">분석 항목</div>
              </div>
              <div>
                <div className="text-2xl font-noto-bold text-blue-600 mb-1">5단계</div>
                <div className="text-sm font-noto-medium text-gray-600">체계적 프로세스</div>
              </div>
              <div>
                <div className="text-2xl font-noto-bold text-blue-600 mb-1">30분</div>
                <div className="text-sm font-noto-medium text-gray-600">소요 시간</div>
              </div>
            </div>
          </div>

          <Button
            size="large"
            loading={isLoading}
            onClick={handleStartConsulting}
            className="text-lg px-8 py-4"
          >
            브랜드 컨설팅 시작하기
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              왜 아트넥스 브랜드 컨설팅인가?
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              AI 기반 분석과 전문가 인사이트를 결합한 차별화된 컨설팅 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultingFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-noto-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm font-noto-medium text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              컨설팅 프로세스
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              5단계 체계적 프로세스로 완성되는 브랜드 전략
            </p>
          </div>

          <div className="space-y-8">
            {consultingProcess.map((process, index) => (
              <div key={index} className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-noto-bold">{process.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-noto-bold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 font-noto-medium">{process.description}</p>
                </div>
                {index < consultingProcess.length - 1 && (
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-noto-bold mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl font-noto-medium text-blue-100 mb-8">
            단 30분 투자로 브랜드의 새로운 가능성을 발견하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              variant="outlined"
              loading={isLoading}
              onClick={handleStartConsulting}
              className="bg-white text-blue-600 border-white hover:bg-gray-100 text-lg px-8 py-4"
            >
              무료 컨설팅 시작
            </Button>
            <Button
              size="large"
              variant="outlined"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => router.push('/contact')}
            >
              전문가 상담 문의
            </Button>
          </div>

          <div className="mt-8 text-sm font-noto-medium text-blue-200">
            💡 회원가입 후 이용 가능 · 📊 결과 리포트 무료 제공 · 🔒 정보 보안 완벽 보장
          </div>
        </div>
        </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}