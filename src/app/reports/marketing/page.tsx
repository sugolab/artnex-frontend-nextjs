'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { Download, Share, TrendingUp, Target, Users, BarChart3, Activity, Globe, MessageSquare, Search, Star, ChevronUp, ChevronDown } from 'lucide-react';

interface MarketingReportData {
  brandName: string;
  overallScore: number;
  digitalPresenceScore: number;
  audienceEngagementScore: number;
  contentStrategyScore: number;
  conversionOptimizationScore: number;
  channelPerformance: {
    channel: string;
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
  }[];
  audienceInsights: {
    demographic: string;
    percentage: number;
    engagement: number;
    conversionRate: number;
  }[];
  contentAnalysis: {
    contentType: string;
    performance: number;
    reach: number;
    engagement: number;
  }[];
  marketingFunnel: {
    stage: string;
    visitors: number;
    conversionRate: number;
    dropoffRate: number;
  }[];
  competitorAnalysis: {
    competitor: string;
    digitalPresence: number;
    contentQuality: number;
    engagementRate: number;
    estimatedBudget: string;
  }[];
  recommendedActions: {
    category: string;
    action: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedCost: string;
    expectedROI: string;
    timeframe: string;
  }[];
  marketingMetrics: {
    metric: string;
    currentValue: string;
    industryAverage: string;
    targetValue: string;
    status: 'good' | 'average' | 'poor';
  }[];
}

export default function MarketingReportPage() {
  const [reportData, setReportData] = useState<MarketingReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReportData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockData: MarketingReportData = {
        brandName: "아트넥스",
        overallScore: 82,
        digitalPresenceScore: 85,
        audienceEngagementScore: 78,
        contentStrategyScore: 84,
        conversionOptimizationScore: 79,
        channelPerformance: [
          {
            channel: "검색엔진 마케팅",
            reach: 15000,
            engagement: 4.2,
            conversion: 3.1,
            roi: 320
          },
          {
            channel: "소셜미디어",
            reach: 8500,
            engagement: 7.8,
            conversion: 2.3,
            roi: 280
          },
          {
            channel: "이메일 마케팅",
            reach: 3200,
            engagement: 12.5,
            conversion: 8.7,
            roi: 450
          },
          {
            channel: "콘텐츠 마케팅",
            reach: 5800,
            engagement: 6.3,
            conversion: 4.2,
            roi: 380
          },
          {
            channel: "디스플레이 광고",
            reach: 22000,
            engagement: 1.8,
            conversion: 1.2,
            roi: 180
          }
        ],
        audienceInsights: [
          {
            demographic: "25-34세 남성",
            percentage: 32,
            engagement: 8.5,
            conversionRate: 4.2
          },
          {
            demographic: "35-44세 남성",
            percentage: 28,
            engagement: 7.1,
            conversionRate: 5.8
          },
          {
            demographic: "25-34세 여성",
            percentage: 22,
            engagement: 9.2,
            conversionRate: 3.7
          },
          {
            demographic: "35-44세 여성",
            percentage: 18,
            engagement: 6.8,
            conversionRate: 4.9
          }
        ],
        contentAnalysis: [
          {
            contentType: "블로그 포스트",
            performance: 85,
            reach: 4200,
            engagement: 6.8
          },
          {
            contentType: "인포그래픽",
            performance: 91,
            reach: 2800,
            engagement: 9.2
          },
          {
            contentType: "비디오 콘텐츠",
            performance: 88,
            reach: 3500,
            engagement: 11.5
          },
          {
            contentType: "소셜 포스트",
            performance: 73,
            reach: 6800,
            engagement: 4.3
          }
        ],
        marketingFunnel: [
          {
            stage: "인지 (Awareness)",
            visitors: 10000,
            conversionRate: 100,
            dropoffRate: 0
          },
          {
            stage: "관심 (Interest)",
            visitors: 3500,
            conversionRate: 35,
            dropoffRate: 65
          },
          {
            stage: "고려 (Consideration)",
            visitors: 1200,
            conversionRate: 12,
            dropoffRate: 23
          },
          {
            stage: "구매 (Purchase)",
            visitors: 320,
            conversionRate: 3.2,
            dropoffRate: 8.8
          }
        ],
        competitorAnalysis: [
          {
            competitor: "경쟁사 A",
            digitalPresence: 88,
            contentQuality: 82,
            engagementRate: 6.5,
            estimatedBudget: "월 800만원"
          },
          {
            competitor: "경쟁사 B",
            digitalPresence: 75,
            contentQuality: 79,
            engagementRate: 4.2,
            estimatedBudget: "월 600만원"
          },
          {
            competitor: "경쟁사 C",
            digitalPresence: 92,
            contentQuality: 89,
            engagementRate: 8.1,
            estimatedBudget: "월 1200만원"
          }
        ],
        recommendedActions: [
          {
            category: "SEO 최적화",
            action: "키워드 전략 강화",
            description: "고수익 키워드를 타겟팅하여 검색 순위를 개선하고 유기적 트래픽을 늘립니다.",
            priority: "high",
            estimatedCost: "월 200만원",
            expectedROI: "350%",
            timeframe: "3-6개월"
          },
          {
            category: "소셜미디어",
            action: "인플루언서 마케팅",
            description: "관련 업계 인플루언서와 협업하여 브랜드 인지도와 신뢰도를 높입니다.",
            priority: "high",
            estimatedCost: "월 400만원",
            expectedROI: "280%",
            timeframe: "2-4개월"
          },
          {
            category: "이메일 마케팅",
            action: "개인화 캠페인",
            description: "고객 세그먼트별 맞춤형 이메일 캠페인으로 전환율을 향상시킵니다.",
            priority: "medium",
            estimatedCost: "월 100만원",
            expectedROI: "420%",
            timeframe: "1-3개월"
          },
          {
            category: "콘텐츠 마케팅",
            action: "비디오 콘텐츠 확대",
            description: "높은 참여도를 보이는 비디오 콘텐츠 제작을 늘려 브랜드 스토리텔링을 강화합니다.",
            priority: "medium",
            estimatedCost: "월 300만원",
            expectedROI: "320%",
            timeframe: "2-5개월"
          }
        ],
        marketingMetrics: [
          {
            metric: "웹사이트 트래픽",
            currentValue: "월 15,000명",
            industryAverage: "월 12,000명",
            targetValue: "월 25,000명",
            status: "good"
          },
          {
            metric: "전환율",
            currentValue: "3.2%",
            industryAverage: "2.8%",
            targetValue: "5.0%",
            status: "good"
          },
          {
            metric: "고객 획득 비용",
            currentValue: "15만원",
            industryAverage: "12만원",
            targetValue: "10만원",
            status: "poor"
          },
          {
            metric: "이메일 오픈율",
            currentValue: "22%",
            industryAverage: "25%",
            targetValue: "30%",
            status: "average"
          },
          {
            metric: "소셜미디어 참여율",
            currentValue: "7.8%",
            industryAverage: "5.2%",
            targetValue: "10%",
            status: "good"
          }
        ]
      };
      
      setReportData(mockData);
      setIsLoading(false);
    };

    loadReportData();
  }, []);

  const handleDownloadReport = () => {
    alert('Marketing Report를 다운로드합니다.');
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

  const StatusIndicator = ({ status }: { status: 'good' | 'average' | 'poor' }) => {
    const config = {
      good: { icon: ChevronUp, color: 'text-green-600', bg: 'bg-green-100' },
      average: { icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      poor: { icon: ChevronDown, color: 'text-red-600', bg: 'bg-red-100' }
    };
    
    const { icon: Icon, color, bg } = config[status];
    
    return (
      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    );
  };

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
          <div className="w-16 h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-noto-medium">Marketing Report를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-noto-medium">리포트 데이터를 불러올 수 없습니다.</p>
          <Link href="/reports" className="text-green-600 hover:underline mt-4 inline-block">
            리포트 목록으로 돌아가기
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-noto-bold mb-4">
                Marketing Report 결과
              </h1>
              <p className="text-xl text-green-100 font-noto-medium mb-6">
                {reportData.brandName}의 마케팅 성과 분석 및 최적화 방안
              </p>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <div className="text-5xl font-noto-bold mb-2">{reportData.overallScore}점</div>
                <p className="text-green-100 font-noto-medium">종합 마케팅 점수</p>
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
                className="bg-white text-green-600 hover:bg-gray-100 flex items-center gap-2"
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
            title="디지털 프레즌스" 
            score={reportData.digitalPresenceScore} 
            icon={Globe}
            color="text-green-600"
          />
          <ScoreCard 
            title="고객 참여도" 
            score={reportData.audienceEngagementScore} 
            icon={Users}
            color="text-blue-600"
          />
          <ScoreCard 
            title="콘텐츠 전략" 
            score={reportData.contentStrategyScore} 
            icon={MessageSquare}
            color="text-purple-600"
          />
          <ScoreCard 
            title="전환 최적화" 
            score={reportData.conversionOptimizationScore} 
            icon={TrendingUp}
            color="text-orange-600"
          />
        </div>

        {/* Channel Performance */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
            채널별 성과 분석
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-noto-bold text-gray-900">채널</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">도달 수</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">참여율 (%)</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">전환율 (%)</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">ROI (%)</th>
                </tr>
              </thead>
              <tbody>
                {reportData.channelPerformance.map((channel, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-noto-medium text-gray-900">{channel.channel}</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">
                      {channel.reach.toLocaleString()}
                    </td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{channel.engagement}%</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{channel.conversion}%</td>
                    <td className="text-center py-3 px-4 font-noto-bold text-green-600">{channel.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Marketing Funnel */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              마케팅 퍼널 분석
            </h3>
            <div className="space-y-4">
              {reportData.marketingFunnel.map((stage, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-noto-medium text-gray-900">{stage.stage}</span>
                    <span className="font-noto-bold text-green-600">{stage.visitors.toLocaleString()}명</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                    <div 
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${stage.conversionRate}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-noto-medium">
                    전환율: {stage.conversionRate}% | 이탈률: {stage.dropoffRate}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Insights */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              고객 세그먼트 분석
            </h3>
            <div className="space-y-4">
              {reportData.audienceInsights.map((audience, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-noto-medium text-gray-900">{audience.demographic}</span>
                    <span className="font-noto-bold text-blue-600">{audience.percentage}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 font-noto-medium">참여율: </span>
                      <span className="text-gray-900 font-noto-bold">{audience.engagement}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-noto-medium">전환율: </span>
                      <span className="text-green-600 font-noto-bold">{audience.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Analysis */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            콘텐츠 성과 분석
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {reportData.contentAnalysis.map((content, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-noto-bold text-gray-900 mb-4">{content.contentType}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-noto-medium">성과 점수</span>
                    <span className="text-sm font-noto-bold text-purple-600">{content.performance}점</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-noto-medium">도달 수</span>
                    <span className="text-sm font-noto-bold text-gray-900">{content.reach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-noto-medium">참여율</span>
                    <span className="text-sm font-noto-bold text-blue-600">{content.engagement}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Metrics */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-green-600" />
            핵심 마케팅 지표
          </h2>
          <div className="space-y-4">
            {reportData.marketingMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusIndicator status={metric.status} />
                  <div>
                    <h4 className="font-noto-bold text-gray-900">{metric.metric}</h4>
                    <div className="text-sm text-gray-600 font-noto-medium">
                      업계 평균: {metric.industryAverage} | 목표: {metric.targetValue}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-noto-bold text-gray-900">{metric.currentValue}</div>
                  <div className="text-xs text-gray-500 font-noto-medium">현재값</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Star className="w-6 h-6 text-green-600" />
            추천 마케팅 액션
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportData.recommendedActions.map((action, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-noto-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      {action.category}
                    </span>
                    <h4 className="text-lg font-noto-bold text-gray-900 mt-2">{action.action}</h4>
                  </div>
                  <PriorityBadge priority={action.priority} />
                </div>
                <p className="text-gray-700 font-noto-medium mb-4 text-sm">{action.description}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 font-noto-medium">예상 비용: </span>
                    <span className="text-gray-900 font-noto-bold">{action.estimatedCost}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-noto-medium">예상 ROI: </span>
                    <span className="text-green-600 font-noto-bold">{action.expectedROI}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 font-noto-medium">실행 기간: </span>
                    <span className="text-gray-900 font-noto-bold">{action.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 flex items-center gap-3">
            <Search className="w-6 h-6 text-green-600" />
            경쟁사 마케팅 분석
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-noto-bold text-gray-900">기업</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">디지털 프레즌스</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">콘텐츠 품질</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">참여율</th>
                  <th className="text-center py-3 px-4 font-noto-bold text-gray-900">예상 예산</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-3 px-4 font-noto-bold text-green-600">{reportData.brandName} (현재)</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-green-600">{reportData.digitalPresenceScore}점</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-green-600">{reportData.contentStrategyScore}점</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-green-600">7.8%</td>
                  <td className="text-center py-3 px-4 font-noto-bold text-green-600">월 500만원</td>
                </tr>
                {reportData.competitorAnalysis.map((comp, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-noto-medium text-gray-700">{comp.competitor}</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.digitalPresence}점</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.contentQuality}점</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.engagementRate}%</td>
                    <td className="text-center py-3 px-4 font-noto-medium text-gray-700">{comp.estimatedBudget}</td>
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
            분석 결과를 바탕으로 마케팅 성과를 극대화해보세요
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

      {/* Footer */}
      <Footer />
    </div>
  );
}