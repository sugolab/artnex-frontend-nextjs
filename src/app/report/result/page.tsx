'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { Download, Share, BarChart3, Target, Users, TrendingUp } from 'lucide-react';

interface ReportData {
  brandName: string;
  overallScore: number;
  brandIdentityScore: number;
  marketPositionScore: number;
  competitivenessScore: number;
  growthPotentialScore: number;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
  marketAnalysis: {
    marketSize: string;
    competitorCount: number;
    marketGrowth: string;
  };
  targetAudience: {
    primaryAge: string;
    primaryGender: string;
    interests: string[];
  };
}

export default function ReportResultPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제로는 AI 분석 결과를 API에서 가져올 것
    const loadReportData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: ReportData = {
        brandName: "아트넥스",
        overallScore: 85,
        brandIdentityScore: 88,
        marketPositionScore: 82,
        competitivenessScore: 79,
        growthPotentialScore: 91,
        recommendations: [
          "브랜드 아이덴티티를 더욱 명확하게 정의하고 일관성 있는 메시지 전달",
          "디지털 마케팅 채널을 통한 타겟 고객층 접근성 강화",
          "경쟁사 대비 차별화된 브랜드 포지셔닝 전략 수립",
          "고객 피드백을 반영한 브랜드 경험 개선 및 최적화"
        ],
        strengths: [
          "혁신적인 AI 기반 브랜딩 솔루션",
          "명확한 타겟 시장 정의",
          "강력한 기술적 역량과 전문성",
          "높은 성장 잠재력과 확장 가능성"
        ],
        improvements: [
          "브랜드 인지도 향상 필요",
          "시장 내 포지셔닝 강화 필요",
          "고객 접점 다양화 필요"
        ],
        marketAnalysis: {
          marketSize: "3,200억원",
          competitorCount: 12,
          marketGrowth: "연평균 23.5%"
        },
        targetAudience: {
          primaryAge: "25-40세",
          primaryGender: "남성 52%, 여성 48%",
          interests: ["기술 혁신", "비즈니스 성장", "브랜딩", "디지털 전환"]
        }
      };
      
      setReportData(mockData);
      setIsLoading(false);
    };

    loadReportData();
  }, []);

  const handleDownloadReport = () => {
    // PDF 다운로드 로직
    alert('리포트를 다운로드합니다.');
  };

  const handleShareReport = () => {
    // 리포트 공유 로직
    alert('리포트를 공유합니다.');
  };

  const ScoreCard = ({ title, score, icon: Icon }: { title: string; score: number; icon: any }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-blue-600" />
          <h3 className="font-noto-bold text-gray-900">{title}</h3>
        </div>
        <span className="text-2xl font-noto-bold text-blue-600">{score}점</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-noto-medium">리포트를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-noto-medium">리포트 데이터를 불러올 수 없습니다.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            홈으로 돌아가기
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-noto-bold text-gray-900 mb-2">
                브랜드 컨설팅 리포트 결과
              </h1>
              <p className="text-gray-600 font-noto-medium">
                AI 분석을 통한 {reportData.brandName}의 브랜드 진단 결과입니다
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outlined"
                onClick={handleShareReport}
                className="flex items-center gap-2"
              >
                <Share className="w-4 h-4" />
                공유하기
              </Button>
              <Button
                onClick={handleDownloadReport}
                className="flex items-center gap-2"
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
        {/* Overall Score */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-noto-bold mb-2">종합 브랜드 점수</h2>
            <div className="text-5xl font-noto-bold mb-4">{reportData.overallScore}점</div>
            <p className="text-blue-100 font-noto-medium">
              평균 대비 우수한 브랜드 성과를 보여주고 있습니다
            </p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScoreCard 
            title="브랜드 아이덴티티" 
            score={reportData.brandIdentityScore} 
            icon={Target}
          />
          <ScoreCard 
            title="시장 포지션" 
            score={reportData.marketPositionScore} 
            icon={BarChart3}
          />
          <ScoreCard 
            title="경쟁력" 
            score={reportData.competitivenessScore} 
            icon={Users}
          />
          <ScoreCard 
            title="성장 잠재력" 
            score={reportData.growthPotentialScore} 
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-4">브랜드 강점</h3>
            <ul className="space-y-3">
              {reportData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 font-noto-medium">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-4">개선 필요 영역</h3>
            <ul className="space-y-3">
              {reportData.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 font-noto-medium">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Market Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h3 className="text-xl font-noto-bold text-gray-900 mb-6">시장 분석</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-noto-bold text-blue-600 mb-2">
                {reportData.marketAnalysis.marketSize}
              </div>
              <p className="text-gray-600 font-noto-medium">시장 규모</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-noto-bold text-blue-600 mb-2">
                {reportData.marketAnalysis.competitorCount}개
              </div>
              <p className="text-gray-600 font-noto-medium">주요 경쟁사</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-noto-bold text-blue-600 mb-2">
                {reportData.marketAnalysis.marketGrowth}
              </div>
              <p className="text-gray-600 font-noto-medium">시장 성장률</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <h3 className="text-xl font-noto-bold text-gray-900 mb-4">AI 추천 전략</h3>
          <div className="space-y-4">
            {reportData.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-noto-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-noto-medium">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <h3 className="text-xl font-noto-bold text-gray-900 mb-4">다음 단계</h3>
            <p className="text-gray-600 font-noto-medium mb-6">
              브랜드 전략을 실행하고 더 나은 성과를 달성해보세요
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outlined"
                onClick={() => window.location.href = '/report/bid/brand-identity'}
              >
                새로운 분석 시작
              </Button>
              <Button onClick={handleDownloadReport}>
                상세 리포트 받기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}