'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { Download, Share, Palette, Type, Image, TrendingUp, Award, CheckCircle2, Zap, Grid, Camera } from 'lucide-react';

interface VisualReportData {
  brandName: string;
  overallScore: number;
  logoScore: number;
  colorScore: number;
  typographyScore: number;
  layoutScore: number;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  colorAnalysis: {
    harmony: number;
    contrast: number;
    accessibility: number;
    brandFit: number;
  };
  typographyAnalysis: {
    readability: number;
    brandConsistency: number;
    hierarchy: number;
    webCompatibility: number;
  };
  logoAnalysis: {
    recognition: number;
    scalability: number;
    versatility: number;
    memorability: number;
  };
  designRecommendations: {
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
  }[];
  visualTrends: {
    trend: string;
    compatibility: number;
    description: string;
  }[];
  competitorComparison: {
    competitor: string;
    designScore: number;
    visualImpact: number;
    modernness: number;
  }[];
}

export default function VisualReportPage() {
  const [reportData, setReportData] = useState<VisualReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReportData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: VisualReportData = {
        brandName: "아트넥스",
        overallScore: 87,
        logoScore: 85,
        colorScore: 91,
        typographyScore: 83,
        layoutScore: 89,
        brandColors: {
          primary: "#2563EB",
          secondary: "#64748B",
          accent: "#F59E0B",
          neutral: "#6B7280"
        },
        colorAnalysis: {
          harmony: 92,
          contrast: 88,
          accessibility: 85,
          brandFit: 94
        },
        typographyAnalysis: {
          readability: 89,
          brandConsistency: 82,
          hierarchy: 87,
          webCompatibility: 91
        },
        logoAnalysis: {
          recognition: 88,
          scalability: 85,
          versatility: 83,
          memorability: 87
        },
        designRecommendations: [
          {
            category: "컬러 시스템",
            title: "브랜드 컬러 팔레트 확장",
            description: "현재 사용 중인 주요 컬러 외에 보조 컬러와 그라데이션을 추가하여 더욱 풍부한 시각적 표현을 가능하게 합니다.",
            priority: "high",
            impact: "브랜드 일관성 30% 향상"
          },
          {
            category: "타이포그래피",
            title: "폰트 패밀리 일관성 강화",
            description: "모든 브랜드 터치포인트에서 일관된 타이포그래피 시스템을 적용하여 브랜드 인지도를 높입니다.",
            priority: "high",
            impact: "가독성 25% 개선"
          },
          {
            category: "레이아웃",
            title: "그리드 시스템 표준화",
            description: "반응형 그리드 시스템을 도입하여 다양한 디바이스에서 일관된 사용자 경험을 제공합니다.",
            priority: "medium",
            impact: "사용자 경험 20% 향상"
          },
          {
            category: "아이코노그래피",
            title: "커스텀 아이콘 세트 개발",
            description: "브랜드만의 독특한 아이콘 세트를 개발하여 시각적 차별화를 강화합니다.",
            priority: "medium",
            impact: "브랜드 차별화 35% 강화"
          }
        ],
        visualTrends: [
          {
            trend: "미니멀리즘",
            compatibility: 94,
            description: "깔끔하고 단순한 디자인으로 현대적인 브랜드 이미지 구축"
          },
          {
            trend: "다크 모드",
            compatibility: 87,
            description: "사용자 경험 향상을 위한 다크 테마 지원"
          },
          {
            trend: "그라데이션",
            compatibility: 89,
            description: "생동감 있는 그라데이션으로 시각적 임팩트 강화"
          },
          {
            trend: "일러스트레이션",
            compatibility: 91,
            description: "커스텀 일러스트로 브랜드 스토리텔링 강화"
          }
        ],
        competitorComparison: [
          {
            competitor: "경쟁사 A",
            designScore: 82,
            visualImpact: 79,
            modernness: 85
          },
          {
            competitor: "경쟁사 B",
            designScore: 88,
            visualImpact: 91,
            modernness: 87
          },
          {
            competitor: "경쟁사 C",
            designScore: 75,
            visualImpact: 73,
            modernness: 78
          }
        ]
      };
      
      setReportData(mockData);
      setIsLoading(false);
    };

    loadReportData();
  }, []);

  const handleDownloadReport = () => {
    alert('Visual Report를 다운로드합니다.');
  };

  const handleShareReport = () => {
    alert('리포트를 공유합니다.');
  };

  const ScoreCard = ({ title, score, icon: Icon, color }: { 
    title: string; 
    score: number; 
    icon: React.ComponentType<{ className?: string }>; 
    color: string;
  }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${color}`} />
          <h3 className="font-noto-bold text-gray-900 text-sm">{title}</h3>
        </div>
        <span className={`text-2xl font-noto-bold ${color}`}>{score}점</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <div className="text-center">
      <div 
        className="w-16 h-16 rounded-lg border border-gray-200 mx-auto mb-2"
        style={{ backgroundColor: color }}
      />
      <div className="text-xs font-noto-medium text-gray-600 mb-1">{label}</div>
      <div className="text-xs font-noto-bold text-gray-900">{color}</div>
    </div>
  );

  const PriorityBadge = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      high: '높음',
      medium: '보통',
      low: '낮음'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-noto-bold ${colors[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-noto-medium">Visual Report를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-noto-medium">리포트 데이터를 불러올 수 없습니다.</p>
          <Link href="/reports" className="text-purple-600 hover:underline mt-4 inline-block">
            리포트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GNB />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-noto-bold mb-4">
                Visual Report 결과
              </h1>
              <p className="text-xl text-purple-100 font-noto-medium mb-6">
                {reportData.brandName}의 비주얼 아이덴티티 분석 결과
              </p>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <div className="text-5xl font-noto-bold mb-2">{reportData.overallScore}점</div>
                <p className="text-purple-100 font-noto-medium">종합 디자인 점수</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outlined"
                onClick={handleShareReport}
                className="border-white text-white hover:bg-white/10 flex items-center gap-2"
              >
                <Share className="w-4 h-4" />
                공유하기
              </Button>
              <Button
                onClick={handleDownloadReport}
                className="bg-white text-purple-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ScoreCard 
            title="로고 디자인" 
            score={reportData.logoScore} 
            icon={Camera}
            color="text-purple-600"
          />
          <ScoreCard 
            title="컬러 시스템" 
            score={reportData.colorScore} 
            icon={Palette}
            color="text-pink-600"
          />
          <ScoreCard 
            title="타이포그래피" 
            score={reportData.typographyScore} 
            icon={Type}
            color="text-blue-600"
          />
          <ScoreCard 
            title="레이아웃" 
            score={reportData.layoutScore} 
            icon={Grid}
            color="text-green-600"
          />
        </div>

        {/* Brand Colors Section */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Palette className="w-6 h-6 text-purple-600" />
            브랜드 컬러 팔레트
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <ColorSwatch color={reportData.brandColors.primary} label="Primary" />
            <ColorSwatch color={reportData.brandColors.secondary} label="Secondary" />
            <ColorSwatch color={reportData.brandColors.accent} label="Accent" />
            <ColorSwatch color={reportData.brandColors.neutral} label="Neutral" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(reportData.colorAnalysis).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-noto-bold text-purple-600 mb-1">{value}점</div>
                <div className="text-sm font-noto-medium text-gray-600">
                  {key === 'harmony' && '색상 조화'}
                  {key === 'contrast' && '대비'}
                  {key === 'accessibility' && '접근성'}
                  {key === 'brandFit' && '브랜드 적합성'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Typography Analysis */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              타이포그래피 분석
            </h3>
            <div className="space-y-4">
              {Object.entries(reportData.typographyAnalysis).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-noto-medium text-gray-600">
                    {key === 'readability' && '가독성'}
                    {key === 'brandConsistency' && '브랜드 일관성'}
                    {key === 'hierarchy' && '계층 구조'}
                    {key === 'webCompatibility' && '웹 호환성'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-sm font-noto-bold text-blue-600">{value}점</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo Analysis */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              로고 분석
            </h3>
            <div className="space-y-4">
              {Object.entries(reportData.logoAnalysis).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-noto-medium text-gray-600">
                    {key === 'recognition' && '인식도'}
                    {key === 'scalability' && '확장성'}
                    {key === 'versatility' && '활용성'}
                    {key === 'memorability' && '기억도'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-sm font-noto-bold text-purple-600">{value}점</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Recommendations */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-600" />
            디자인 개선 제안
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportData.designRecommendations.map((rec, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-noto-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {rec.category}
                    </span>
                    <h4 className="text-lg font-noto-bold text-gray-900 mt-2">{rec.title}</h4>
                  </div>
                  <PriorityBadge priority={rec.priority} />
                </div>
                <p className="text-gray-700 font-noto-medium mb-4 text-sm">{rec.description}</p>
                <div className="text-sm">
                  <span className="text-gray-500 font-noto-medium">기대 효과: </span>
                  <span className="text-purple-600 font-noto-bold">{rec.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Trends */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            비주얼 트렌드 적합성
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportData.visualTrends.map((trend, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-noto-bold text-gray-900">{trend.trend}</h4>
                  <span className="text-lg font-noto-bold text-purple-600">{trend.compatibility}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${trend.compatibility}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 font-noto-medium">{trend.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-600" />
            경쟁사 비교 분석
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-noto-bold text-gray-900">기업</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">디자인 점수</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">시각적 임팩트</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">현대성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-purple-50">
                  <td className="py-3 px-4 font-noto-bold text-purple-600">{reportData.brandName} (현재)</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-purple-600">{reportData.overallScore}점</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-purple-600">92점</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-purple-600">89점</td>
                </tr>
                {reportData.competitorComparison.map((comp, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-noto-medium text-gray-700">{comp.competitor}</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.designScore}점</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.visualImpact}점</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.modernness}점</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-4">다음 단계</h2>
          <p className="text-gray-600 font-noto-medium mb-8">
            분석 결과를 바탕으로 브랜드 비주얼을 한 단계 발전시켜보세요
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outlined"
              onClick={() => window.location.href = '/reports'}
            >
              다른 리포트 보기
            </Button>
            <Button
              onClick={() => window.location.href = '/consulting'}
            >
              전문가 컨설팅 받기
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadReport}
            >
              상세 리포트 다운로드
            </Button>
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}