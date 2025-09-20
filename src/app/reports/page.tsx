'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { 
  BarChart3, Eye, TrendingUp, Target, Users, Zap,
  ChevronRight, Star, Clock, Award, CheckCircle
} from 'lucide-react';

interface ReportType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  features: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  route: string;
  available: boolean;
}

export default function ReportsLandingPage() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<string>('bid');

  const reportTypes: ReportType[] = [
    {
      id: 'bid',
      title: 'BID Report',
      subtitle: 'Brand Identity',
      description: '브랜드 아이덴티티와 핵심 가치를 분석하여 명확한 브랜드 방향성을 제시합니다.',
      icon: Target,
      features: [
        '브랜드 비전 및 미션 분석',
        '브랜드 포지셔닝 전략',
        '경쟁사 대비 차별화 요소',
        '브랜드 아키텍처 설계'
      ],
      estimatedTime: '15-20분',
      difficulty: 'beginner',
      popularity: 95,
      route: '/report/bid/brand-identity',
      available: true
    },
    {
      id: 'visual',
      title: 'Visual Report',
      subtitle: 'Brand Visual',
      description: '브랜드 비주얼 아이덴티티를 분석하고 일관성 있는 디자인 가이드라인을 제공합니다.',
      icon: Eye,
      features: [
        '로고 및 심볼 분석',
        '컬러 팔레트 최적화',
        '타이포그래피 가이드',
        '브랜드 톤앤매너 정의'
      ],
      estimatedTime: '20-25분',
      difficulty: 'intermediate',
      popularity: 88,
      route: '/report/visual/brand-visual',
      available: false
    },
    {
      id: 'marketing',
      title: 'Marketing Report',
      subtitle: 'Brand Marketing',
      description: '마케팅 전략과 채널별 성과를 분석하여 최적의 마케팅 믹스를 제안합니다.',
      icon: TrendingUp,
      features: [
        '타겟 고객 세분화',
        '마케팅 채널 최적화',
        '캠페인 성과 분석',
        'ROI 개선 전략'
      ],
      estimatedTime: '25-30분',
      difficulty: 'advanced',
      popularity: 92,
      route: '/report/marketing/brand-marketing',
      available: false
    }
  ];

  const handleStartReport = (reportId: string) => {
    const report = reportTypes.find(r => r.id === reportId);
    if (report && report.available) {
      router.push(report.route);
    } else {
      alert('해당 리포트는 곧 출시 예정입니다!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '미정';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* GNB */}
      <GNB />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Logo size="large" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-noto-bold text-gray-900 mb-6">
            AI 리포트
          </h1>
          
          <p className="text-xl font-noto-medium text-gray-600 mb-8 max-w-3xl mx-auto">
            AI 기반 분석으로 브랜드의 숨겨진 가능성을 발견하고<br />
            데이터 기반의 전략적 인사이트를 얻어보세요
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">3가지</div>
                <div className="text-sm font-noto-medium text-gray-600">전문 분석 리포트</div>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">15분</div>
                <div className="text-sm font-noto-medium text-gray-600">최소 소요 시간</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-yellow-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">95%</div>
                <div className="text-sm font-noto-medium text-gray-600">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              어떤 분석이 필요하신가요?
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              목적에 맞는 AI 리포트를 선택하여 브랜드 분석을 시작하세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={`relative bg-white border-2 rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedReport === report.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${!report.available ? 'opacity-60' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                {!report.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-noto-bold">
                      출시 예정
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <report.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-noto-bold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm font-noto-medium text-blue-600 mb-3">{report.subtitle}</p>
                  <p className="text-gray-600 font-noto-medium text-sm leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-noto-medium text-gray-600">{report.estimatedTime}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-noto-bold ${getDifficultyColor(report.difficulty)}`}>
                      {getDifficultyLabel(report.difficulty)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-noto-medium text-gray-600">인기도</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${report.popularity}%` }}
                        />
                      </div>
                      <span className="font-noto-bold text-blue-600">{report.popularity}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-noto-bold text-gray-900 text-sm">주요 기능</h4>
                  {report.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-noto-medium text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="medium"
                  onClick={() => handleStartReport(report.id)}
                  disabled={!report.available}
                  className={`w-full flex items-center justify-center gap-2 ${
                    selectedReport === report.id ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  {report.available ? '분석 시작하기' : '곧 출시 예정'}
                  {report.available && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              어떻게 작동하나요?
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              간단한 4단계로 전문적인 브랜드 분석을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: '리포트 선택',
                description: '필요한 분석 유형을 선택하고 시작합니다'
              },
              {
                step: '02',
                title: '정보 입력',
                description: '브랜드 관련 정보를 단계별로 입력합니다'
              },
              {
                step: '03',
                title: 'AI 분석',
                description: 'AI가 데이터를 분석하여 인사이트를 도출합니다'
              },
              {
                step: '04',
                title: '결과 확인',
                description: '상세한 분석 결과와 실행 방안을 확인합니다'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-noto-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-noto-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm font-noto-medium text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-noto-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl font-noto-medium text-blue-100 mb-8">
            AI 기반 브랜드 분석으로 새로운 기회를 발견해보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              onClick={() => handleStartReport('bid')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              BID Report 시작하기
            </Button>
            <Button
              size="large"
              variant="outlined"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => router.push('/consulting')}
            >
              전문 컨설팅 받기
            </Button>
          </div>

          <div className="mt-8 text-sm font-noto-medium text-blue-200">
            💡 회원가입 후 무료 이용 · 📊 상세 리포트 제공 · 🔒 데이터 보안 완벽 보장
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}