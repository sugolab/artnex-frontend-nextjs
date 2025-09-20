'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { 
  Palette, Wand2, Sparkles, Zap, Eye, Download, 
  ChevronRight, Star, Clock, Users,
  Layers, Grid, Image as ImageIcon
} from 'lucide-react';

interface DesignTool {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  estimatedTime: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  route: string;
  available: boolean;
  comingSoon?: boolean;
}

export default function AIDesignPage() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<string>('logo');

  const designTools: DesignTool[] = [
    {
      id: 'logo',
      title: 'AI 로고 디자인',
      subtitle: 'Logo Generation',
      description: 'AI가 브랜드 정체성을 분석하여 독창적이고 전문적인 로고를 자동 생성합니다.',
      icon: Palette,
      features: [
        '브랜드 키워드 기반 로고 생성',
        '다양한 스타일과 컬러 옵션',
        '벡터 형태로 고해상도 다운로드',
        '상업적 이용 가능한 라이선스'
      ],
      estimatedTime: '5-10분',
      complexity: 'beginner',
      popularity: 94,
      route: '/design/logo',
      available: false,
      comingSoon: true
    },
    {
      id: 'brand-kit',
      title: 'AI 브랜드 키트',
      subtitle: 'Brand Identity Kit',
      description: '통일된 브랜드 아이덴티티를 위한 컬러 팔레트, 폰트, 패턴을 AI가 제안합니다.',
      icon: Layers,
      features: [
        '브랜드 컬러 팔레트 생성',
        '타이포그래피 추천',
        '브랜드 패턴 및 그래픽 요소',
        '브랜드 가이드라인 문서'
      ],
      estimatedTime: '15-20분',
      complexity: 'intermediate',
      popularity: 89,
      route: '/design/brand-kit',
      available: false,
      comingSoon: true
    },
    {
      id: 'layout',
      title: 'AI 레이아웃 디자인',
      subtitle: 'Layout Generation',
      description: '웹사이트, 앱, 포스터 등 다양한 매체의 레이아웃을 AI가 자동으로 디자인합니다.',
      icon: Grid,
      features: [
        '반응형 웹 레이아웃',
        '모바일 앱 UI 디자인',
        '포스터 및 브로셔 레이아웃',
        'A/B 테스트용 다중 변형'
      ],
      estimatedTime: '10-15분',
      complexity: 'intermediate',
      popularity: 87,
      route: '/design/layout',
      available: false,
      comingSoon: true
    },
    {
      id: 'image',
      title: 'AI 이미지 생성',
      subtitle: 'Image Generation',
      description: '텍스트 설명만으로 브랜드에 맞는 고품질 이미지와 일러스트를 생성합니다.',
      icon: ImageIcon,
      features: [
        '텍스트-이미지 변환',
        '브랜드 톤앤매너 반영',
        '다양한 스타일과 장르',
        '고해상도 상업용 이미지'
      ],
      estimatedTime: '3-5분',
      complexity: 'beginner',
      popularity: 92,
      route: '/design/image',
      available: false,
      comingSoon: true
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '미정';
    }
  };

  const handleStartDesign = (toolId: string) => {
    const tool = designTools.find(t => t.id === toolId);
    if (tool?.available) {
      router.push(tool.route);
    } else {
      alert('해당 디자인 도구는 곧 출시 예정입니다!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* GNB */}
      <GNB />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Logo size="large" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-noto-bold text-gray-900 mb-6">
            AI 디자인
          </h1>
          
          <p className="text-xl font-noto-medium text-gray-600 mb-8 max-w-3xl mx-auto">
            인공지능 기술로 브랜드에 최적화된 디자인을 자동 생성하고<br />
            전문적인 수준의 비주얼 아이덴티티를 쉽고 빠르게 구축하세요
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Wand2 className="w-8 h-8 text-purple-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">4가지</div>
                <div className="text-sm font-noto-medium text-gray-600">AI 디자인 도구</div>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">3분</div>
                <div className="text-sm font-noto-medium text-gray-600">최소 소요 시간</div>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-yellow-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">무제한</div>
                <div className="text-sm font-noto-medium text-gray-600">디자인 생성</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-pink-600 mb-3" />
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm font-noto-medium text-gray-600">사용자 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              어떤 디자인을 만들고 싶으신가요?
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              AI 기술을 활용한 다양한 디자인 도구로 브랜드 비주얼을 완성하세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {designTools.map((tool) => (
              <div
                key={tool.id}
                className={`relative bg-white border-2 rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedTool === tool.id 
                    ? 'border-purple-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${!tool.available ? 'opacity-60' : ''}`}
                onClick={() => setSelectedTool(tool.id)}
              >
                {tool.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-noto-bold">
                      Coming Soon
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <tool.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-noto-bold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-sm font-noto-medium text-purple-600 mb-3">{tool.subtitle}</p>
                    <p className="text-gray-600 font-noto-medium text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-noto-medium text-gray-600">{tool.estimatedTime}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-noto-bold ${getComplexityColor(tool.complexity)}`}>
                        {getComplexityLabel(tool.complexity)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-noto-medium text-gray-600">인기도</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${tool.popularity}%` }}
                          />
                        </div>
                        <span className="font-noto-bold text-purple-600">{tool.popularity}%</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-noto-bold text-gray-900 text-sm">주요 기능</h4>
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                          <span className="text-xs font-noto-medium text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="medium"
                      onClick={() => handleStartDesign(tool.id)}
                      disabled={!tool.available}
                      className={`w-full flex items-center justify-center gap-2 ${
                        selectedTool === tool.id 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : ''
                      }`}
                    >
                      {tool.available ? '디자인 시작하기' : 'Coming Soon'}
                      {tool.available && <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-noto-bold text-gray-900 mb-4">
              AI 디자인의 특별함
            </h2>
            <p className="text-lg font-noto-medium text-gray-600">
              전문 디자이너 수준의 결과물을 누구나 쉽게 만들 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: '빠른 생성',
                description: '몇 분 안에 전문적인 디자인을 완성할 수 있습니다',
                color: 'text-yellow-600'
              },
              {
                icon: Eye,
                title: '브랜드 맞춤',
                description: '브랜드 정체성을 반영한 일관성 있는 디자인을 제공합니다',
                color: 'text-blue-600'
              },
              {
                icon: Download,
                title: '상업적 이용',
                description: '생성된 모든 디자인은 상업적 목적으로 자유롭게 사용 가능합니다',
                color: 'text-green-600'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-noto-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-noto-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-noto-bold mb-4">
            AI로 브랜드 디자인을 혁신하세요
          </h2>
          <p className="text-xl font-noto-medium text-purple-100 mb-8">
            전문 디자이너 없이도 브랜드에 완벽한 디자인을 만들어보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              onClick={() => handleStartDesign('logo')}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              로고 디자인 시작하기
            </Button>
            <Button
              size="large"
              variant="outlined"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => router.push('/reports')}
            >
              브랜드 분석 먼저 받기
            </Button>
          </div>

          <div className="mt-8 text-sm font-noto-medium text-purple-200">
            💡 회원가입 후 무료 체험 · 🎨 무제한 디자인 생성 · 📄 상업적 이용 가능
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}