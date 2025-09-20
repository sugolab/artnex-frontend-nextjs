'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { 
  Download, Share, BarChart3, Target, TrendingUp, 
  CheckCircle, Lightbulb, ChevronRight,
  Star, Award, Zap, Globe
} from 'lucide-react';

interface ConsultingReportData {
  companyName: string;
  overallScore: number;
  brandStrengthScore: number;
  marketOpportunityScore: number;
  competitiveAdvantageScore: number;
  implementationReadinessScore: number;
  strategicRecommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    timeframe: string;
    expectedImpact: string;
  }[];
  brandPositioning: {
    current: string;
    recommended: string;
    differentiators: string[];
  };
  targetAudienceInsights: {
    primarySegment: string;
    secondarySegment: string;
    keyNeeds: string[];
    touchpoints: string[];
  };
  marketAnalysis: {
    marketSize: string;
    growthRate: string;
    competitorCount: number;
    marketShare: string;
  };
  implementationRoadmap: {
    phase: string;
    duration: string;
    keyActivities: string[];
    milestones: string[];
  }[];
  success_metrics: {
    metric: string;
    currentValue: string;
    targetValue: string;
    timeframe: string;
  }[];
}

export default function ConsultingResultPage() {
  const [reportData, setReportData] = useState<ConsultingReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReportData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: ConsultingReportData = {
        companyName: "아트넥스",
        overallScore: 88,
        brandStrengthScore: 82,
        marketOpportunityScore: 91,
        competitiveAdvantageScore: 85,
        implementationReadinessScore: 78,
        strategicRecommendations: [
          {
            title: "브랜드 아이덴티티 강화",
            description: "명확한 브랜드 비전과 미션을 정립하고, 일관된 브랜드 메시지를 구축하여 시장에서의 인지도를 높입니다.",
            priority: "high",
            timeframe: "3개월",
            expectedImpact: "브랜드 인지도 40% 향상"
          },
          {
            title: "디지털 마케팅 확장",
            description: "SNS와 콘텐츠 마케팅을 통해 타겟 고객과의 접점을 늘리고 온라인 프레즌스를 강화합니다.",
            priority: "high",
            timeframe: "6개월",
            expectedImpact: "온라인 리드 300% 증가"
          },
          {
            title: "고객 경험 최적화",
            description: "고객 여정 전반에 걸친 터치포인트를 개선하여 고객 만족도와 충성도를 높입니다.",
            priority: "medium",
            timeframe: "4개월",
            expectedImpact: "고객 만족도 25% 향상"
          },
          {
            title: "파트너십 확대",
            description: "전략적 파트너십을 통해 시장 진입 장벽을 낮추고 새로운 고객층에 접근합니다.",
            priority: "medium",
            timeframe: "9개월",
            expectedImpact: "신규 고객 200% 증가"
          }
        ],
        brandPositioning: {
          current: "혁신적인 AI 기반 브랜딩 솔루션 제공업체",
          recommended: "기업의 브랜드 성장을 위한 필수 AI 파트너",
          differentiators: ["AI 기반 데이터 분석", "개인화된 브랜딩 전략", "실시간 성과 모니터링", "전문가 컨설팅"]
        },
        targetAudienceInsights: {
          primarySegment: "중소기업 CEO 및 마케팅 담당자 (30-45세)",
          secondarySegment: "스타트업 창업자 및 브랜딩 관심 기업 (25-40세)",
          keyNeeds: ["브랜드 차별화", "마케팅 효율성", "성과 측정", "전문성 확보"],
          touchpoints: ["검색엔진", "소셜미디어", "업계 세미나", "추천"]
        },
        marketAnalysis: {
          marketSize: "4,800억원",
          growthRate: "연평균 28.5%",
          competitorCount: 15,
          marketShare: "현재 2.3%, 목표 8.5%"
        },
        implementationRoadmap: [
          {
            phase: "Phase 1: 브랜드 기반 구축",
            duration: "1-3개월",
            keyActivities: ["브랜드 아이덴티티 정립", "메시지 체계 구축", "비주얼 아이덴티티 개발"],
            milestones: ["브랜드 가이드라인 완성", "로고 및 디자인 시스템 적용"]
          },
          {
            phase: "Phase 2: 디지털 프레즌스 강화",
            duration: "3-6개월",
            keyActivities: ["웹사이트 리뉴얼", "SNS 채널 구축", "콘텐츠 마케팅 시작"],
            milestones: ["월 1만 방문자 달성", "SNS 팔로워 5천명 확보"]
          },
          {
            phase: "Phase 3: 시장 확장",
            duration: "6-12개월",
            keyActivities: ["파트너십 구축", "새로운 서비스 런칭", "시장 점유율 확대"],
            milestones: ["월 매출 5천만원 달성", "시장 점유율 5% 확보"]
          }
        ],
        success_metrics: [
          {
            metric: "브랜드 인지도",
            currentValue: "12%",
            targetValue: "35%",
            timeframe: "12개월"
          },
          {
            metric: "월 매출",
            currentValue: "2,000만원",
            targetValue: "5,000만원",
            timeframe: "12개월"
          },
          {
            metric: "고객 획득 비용",
            currentValue: "15만원",
            targetValue: "8만원",
            timeframe: "6개월"
          },
          {
            metric: "고객 만족도",
            currentValue: "7.2/10",
            targetValue: "8.8/10",
            timeframe: "9개월"
          }
        ]
      };
      
      setReportData(mockData);
      setIsLoading(false);
    };

    loadReportData();
  }, []);

  const handleDownloadReport = () => {
    alert('브랜드 컨설팅 리포트를 다운로드합니다.');
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
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-noto-medium">컨설팅 리포트를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-noto-medium">리포트 데이터를 불러올 수 없습니다.</p>
          <Link href="/consulting" className="text-blue-600 hover:underline mt-4 inline-block">
            컨설팅으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GNB */}
      <GNB />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-noto-bold mb-4">
                브랜드 컨설팅 리포트 결과
              </h1>
              <p className="text-xl text-blue-100 font-noto-medium mb-6">
                {reportData.companyName}의 브랜드 전략 분석 및 개선 방안
              </p>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <div className="text-5xl font-noto-bold mb-2">{reportData.overallScore}점</div>
                <p className="text-blue-100 font-noto-medium">종합 브랜드 점수</p>
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
                className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ScoreCard 
            title="브랜드 강점" 
            score={reportData.brandStrengthScore} 
            icon={Star}
            color="text-yellow-600"
          />
          <ScoreCard 
            title="시장 기회" 
            score={reportData.marketOpportunityScore} 
            icon={TrendingUp}
            color="text-green-600"
          />
          <ScoreCard 
            title="경쟁 우위" 
            score={reportData.competitiveAdvantageScore} 
            icon={Award}
            color="text-purple-600"
          />
          <ScoreCard 
            title="실행 준비도" 
            score={reportData.implementationReadinessScore} 
            icon={Zap}
            color="text-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Strategic Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                전략적 추천사항
              </h2>
              <div className="space-y-6">
                {reportData.strategicRecommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-noto-bold text-gray-900">{rec.title}</h3>
                      <PriorityBadge priority={rec.priority} />
                    </div>
                    <p className="text-gray-700 font-noto-medium mb-4">{rec.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 font-noto-medium">실행 기간: </span>
                        <span className="text-gray-900 font-noto-bold">{rec.timeframe}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-noto-medium">기대 효과: </span>
                        <span className="text-blue-600 font-noto-bold">{rec.expectedImpact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Analysis */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                시장 분석
              </h3>
              <div className="space-y-4">
                <div className="text-center border-b border-gray-100 pb-4">
                  <div className="text-2xl font-noto-bold text-blue-600 mb-1">
                    {reportData.marketAnalysis.marketSize}
                  </div>
                  <p className="text-gray-600 font-noto-medium text-sm">전체 시장 규모</p>
                </div>
                <div className="text-center border-b border-gray-100 pb-4">
                  <div className="text-2xl font-noto-bold text-green-600 mb-1">
                    {reportData.marketAnalysis.growthRate}
                  </div>
                  <p className="text-gray-600 font-noto-medium text-sm">시장 성장률</p>
                </div>
                <div className="text-center border-b border-gray-100 pb-4">
                  <div className="text-2xl font-noto-bold text-purple-600 mb-1">
                    {reportData.marketAnalysis.competitorCount}개
                  </div>
                  <p className="text-gray-600 font-noto-medium text-sm">주요 경쟁사</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-noto-bold text-orange-600 mb-1">
                    {reportData.marketAnalysis.marketShare}
                  </div>
                  <p className="text-gray-600 font-noto-medium text-sm">시장 점유율</p>
                </div>
              </div>
            </div>

            {/* Brand Positioning */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                브랜드 포지셔닝
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-noto-bold text-gray-700 mb-2">현재 포지션</h4>
                  <p className="text-sm text-gray-600 font-noto-medium">{reportData.brandPositioning.current}</p>
                </div>
                <div>
                  <h4 className="font-noto-bold text-gray-700 mb-2">권장 포지션</h4>
                  <p className="text-sm text-blue-600 font-noto-bold">{reportData.brandPositioning.recommended}</p>
                </div>
                <div>
                  <h4 className="font-noto-bold text-gray-700 mb-2">차별화 요소</h4>
                  <ul className="space-y-1">
                    {reportData.brandPositioning.differentiators.map((diff, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 font-noto-medium">{diff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            실행 로드맵
          </h2>
          <div className="space-y-8">
            {reportData.implementationRoadmap.map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-lg font-noto-bold text-gray-900">{phase.phase}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-noto-bold">
                    {phase.duration}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-noto-bold text-gray-700 mb-2">주요 활동</h4>
                    <ul className="space-y-1">
                      {phase.keyActivities.map((activity, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 font-noto-medium">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-noto-bold text-gray-700 mb-2">주요 마일스톤</h4>
                    <ul className="space-y-1">
                      {phase.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 font-noto-medium">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            성공 지표
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportData.success_metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-noto-bold text-gray-900 mb-4">{metric.metric}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-center">
                    <div className="text-xl font-noto-bold text-gray-600">{metric.currentValue}</div>
                    <div className="text-xs text-gray-500 font-noto-medium">현재</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                  <div className="text-center">
                    <div className="text-xl font-noto-bold text-blue-600">{metric.targetValue}</div>
                    <div className="text-xs text-gray-500 font-noto-medium">목표</div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600 font-noto-medium">
                  달성 기간: {metric.timeframe}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-4">다음 단계</h2>
          <p className="text-gray-600 font-noto-medium mb-8">
            전문가와 함께 브랜드 전략을 실행하고 더 나은 성과를 달성해보세요
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outlined"
              onClick={() => window.location.href = '/consulting'}
            >
              새로운 컨설팅 시작
            </Button>
            <Button
              onClick={() => window.location.href = '/contact'}
            >
              전문가 상담 받기
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

      {/* Footer */}
      <Footer />
    </div>
  );
}