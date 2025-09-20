'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { 
  BarChart3, TrendingUp, Target, Users, Clock, Award,
  Calendar, ArrowUp, ArrowDown, PieChart, Activity,
  Zap, Star, FileText, Eye, Download
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  totalReports: number;
  completedReports: number;
  avgCompletionTime: string;
  satisfactionScore: number;
  mostUsedReportType: string;
  insights: {
    totalGenerated: number;
    avgPerReport: number;
    topCategory: string;
  };
  growth: {
    reportsThisMonth: number;
    reportsLastMonth: number;
    growthRate: number;
  };
}

interface MonthlyData {
  month: string;
  reports: number;
  completion: number;
}

export default function MyPageAnalytics() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    period: '최근 3개월',
    totalReports: 12,
    completedReports: 10,
    avgCompletionTime: '18분',
    satisfactionScore: 4.7,
    mostUsedReportType: 'BID Report',
    insights: {
      totalGenerated: 287,
      avgPerReport: 24,
      topCategory: '브랜드 전략'
    },
    growth: {
      reportsThisMonth: 5,
      reportsLastMonth: 3,
      growthRate: 67
    }
  };

  const monthlyData: MonthlyData[] = [
    { month: '7월', reports: 2, completion: 100 },
    { month: '8월', reports: 5, completion: 80 },
    { month: '9월', reports: 5, completion: 100 }
  ];

  const reportTypeData = [
    { type: 'BID Report', count: 6, percentage: 50, color: 'bg-blue-500' },
    { type: 'Brand Consulting', count: 3, percentage: 25, color: 'bg-orange-500' },
    { type: 'Visual Report', count: 2, percentage: 17, color: 'bg-purple-500' },
    { type: 'Marketing Report', count: 1, percentage: 8, color: 'bg-green-500' }
  ];

  const insightCategories = [
    { category: '브랜드 전략', count: 78, trend: 'up' },
    { category: '마케팅 최적화', count: 65, trend: 'up' },
    { category: '비주얼 개선', count: 52, trend: 'down' },
    { category: '고객 분석', count: 47, trend: 'up' },
    { category: '경쟁사 분석', count: 45, trend: 'up' }
  ];

  const performanceMetrics = [
    {
      title: '완료율',
      value: '83%',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: '평균 소요시간',
      value: '18분',
      change: '-3분',
      trend: 'up',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: '만족도',
      value: '4.7점',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: '재사용률',
      value: '76%',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GNB */}
      <GNB />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-noto-bold text-gray-900 mb-2">
                분석 대시보드
              </h1>
              <p className="text-gray-600 font-noto-medium">
                AI 리포트 사용 현황과 성과를 분석해보세요
              </p>
            </div>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg font-noto-medium"
            >
              <option value="1month">최근 1개월</option>
              <option value="3months">최근 3개월</option>
              <option value="6months">최근 6개월</option>
              <option value="1year">최근 1년</option>
            </select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  <div className={`flex items-center gap-1 text-sm font-noto-bold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-noto-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm font-noto-medium text-gray-600">{metric.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts and Analytics */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Reports Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-noto-bold text-gray-900 mb-6">월별 리포트 생성 현황</h3>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-noto-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(data.reports / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-noto-bold text-gray-900 w-8">{data.reports}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-noto-bold w-16 text-right ${
                      data.completion === 100 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {data.completion}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Type Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-noto-bold text-gray-900 mb-6">리포트 유형별 분포</h3>
              <div className="space-y-4">
                {reportTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <span className="font-noto-medium text-gray-700">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-noto-medium text-gray-600">{item.count}개</span>
                      <span className="text-sm font-noto-bold text-gray-900 w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Insight Categories */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-noto-bold text-gray-900 mb-6">인사이트 카테고리별 분석</h3>
              <div className="space-y-4">
                {insightCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-noto-medium text-gray-900">{category.category}</span>
                      <div className={`flex items-center gap-1 text-sm ${
                        category.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </div>
                    </div>
                    <span className="font-noto-bold text-blue-600">{category.count}개</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-noto-bold text-gray-900 mb-6">요약 통계</h3>
              <div className="space-y-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-noto-bold text-blue-600 mb-1">
                    {analyticsData.insights.totalGenerated}
                  </div>
                  <div className="text-sm font-noto-medium text-gray-600">총 생성된 인사이트</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-noto-bold text-green-600 mb-1">
                    {analyticsData.insights.avgPerReport}
                  </div>
                  <div className="text-sm font-noto-medium text-gray-600">리포트당 평균 인사이트</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-noto-bold text-purple-600 mb-1">
                    {analyticsData.growth.growthRate}%
                  </div>
                  <div className="text-sm font-noto-medium text-gray-600">전월 대비 성장률</div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-noto-bold text-gray-900 mb-6">성장 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-noto-bold text-blue-600 mb-2">
                  {analyticsData.growth.reportsThisMonth}
                </div>
                <div className="text-sm font-noto-medium text-gray-600 mb-1">이번 달 리포트</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-noto-bold">+{analyticsData.growth.growthRate}%</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-noto-bold text-green-600 mb-2">
                  {analyticsData.satisfactionScore}
                </div>
                <div className="text-sm font-noto-medium text-gray-600 mb-1">평균 만족도</div>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(analyticsData.satisfactionScore)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-noto-bold text-purple-600 mb-2">
                  {analyticsData.avgCompletionTime}
                </div>
                <div className="text-sm font-noto-medium text-gray-600 mb-1">평균 완료 시간</div>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-noto-bold">개선됨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}