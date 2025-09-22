'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { FileText, Clock, Download, Eye, Filter, Search, ChevronRight, Calendar, Star, BarChart3, TrendingUp } from 'lucide-react';

interface ReportHistory {
  id: string;
  type: 'bid' | 'visual' | 'marketing' | 'consulting';
  title: string;
  subtitle: string;
  date: string;
  status: 'completed' | 'processing' | 'draft';
  rating?: number;
  insights: number;
  downloadUrl?: string;
  previewUrl?: string;
}

export default function MyPageReports() {
  const router = useRouter();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extended mock report history with more details
  const reportHistory: ReportHistory[] = [
    {
      id: '1',
      type: 'bid',
      title: 'BID Report - 브랜드 아이덴티티 분석',
      subtitle: '커피전문점 체인 브랜드 분석',
      date: '2025-09-20',
      status: 'completed',
      rating: 4.8,
      insights: 24,
      downloadUrl: '/reports/bid-report-20250920.pdf',
      previewUrl: '/report/bid/result'
    },
    {
      id: '2',
      type: 'consulting',
      title: '브랜드 컨설팅 - 전략 수립',
      subtitle: 'IT 스타트업 브랜드 포지셔닝',
      date: '2025-09-18',
      status: 'completed',
      rating: 4.9,
      insights: 31,
      downloadUrl: '/reports/consulting-20250918.pdf',
      previewUrl: '/consulting/result'
    },
    {
      id: '3',
      type: 'visual',
      title: 'Visual Report - 비주얼 아이덴티티',
      subtitle: '패션 브랜드 비주얼 시스템',
      date: '2025-09-15',
      status: 'processing',
      insights: 0
    },
    {
      id: '4',
      type: 'marketing',
      title: 'Marketing Report - 마케팅 전략',
      subtitle: '온라인 쇼핑몰 마케팅 분석',
      date: '2025-09-12',
      status: 'draft',
      insights: 0
    },
    {
      id: '5',
      type: 'bid',
      title: 'BID Report - 브랜드 재정립',
      subtitle: '전통 제조업체 브랜드 혁신',
      date: '2025-09-10',
      status: 'completed',
      rating: 4.7,
      insights: 28,
      downloadUrl: '/reports/bid-report-20250910.pdf'
    },
    {
      id: '6',
      type: 'visual',
      title: 'Visual Report - 로고 리뉴얼',
      subtitle: '의료기기 회사 로고 개선',
      date: '2025-09-08',
      status: 'completed',
      rating: 4.6,
      insights: 19,
      downloadUrl: '/reports/visual-report-20250908.pdf'
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bid': return 'BID 리포트';
      case 'visual': return 'Visual 리포트';
      case 'marketing': return 'Marketing 리포트';
      case 'consulting': return '브랜드 컨설팅';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bid': return 'bg-blue-100 text-blue-800';
      case 'visual': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'consulting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'processing': return '처리중';
      case 'draft': return '임시저장';
      default: return status;
    }
  };

  const filteredReports = reportHistory.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: reportHistory.length,
    completed: reportHistory.filter(r => r.status === 'completed').length,
    processing: reportHistory.filter(r => r.status === 'processing').length,
    draft: reportHistory.filter(r => r.status === 'draft').length,
    avgRating: reportHistory
      .filter(r => r.rating)
      .reduce((sum, r) => sum + (r.rating || 0), 0) / 
      reportHistory.filter(r => r.rating).length,
    totalInsights: reportHistory.reduce((sum, r) => sum + r.insights, 0)
  };

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
                리포트 관리
              </h1>
              <p className="text-gray-600 font-noto-medium">
                생성된 모든 AI 리포트를 확인하고 관리하세요
              </p>
            </div>
            
            <Button
              size="medium"
              onClick={() => router.push('/reports')}
              className="flex items-center gap-2"
            >
              새 리포트 작성
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-noto-bold text-blue-600 mb-1">{stats.total}</div>
              <div className="text-sm font-noto-medium text-gray-600">총 리포트</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-noto-bold text-green-600 mb-1">{stats.completed}</div>
              <div className="text-sm font-noto-medium text-gray-600">완료</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-noto-bold text-yellow-600 mb-1">{stats.processing}</div>
              <div className="text-sm font-noto-medium text-gray-600">처리중</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-noto-bold text-purple-600 mb-1">{stats.avgRating.toFixed(1)}</div>
              <div className="text-sm font-noto-medium text-gray-600">평균 평점</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-noto-bold text-orange-600 mb-1">{stats.totalInsights}</div>
              <div className="text-sm font-noto-medium text-gray-600">총 인사이트</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-noto-medium text-sm"
              >
                <option value="all">모든 유형</option>
                <option value="bid">BID 리포트</option>
                <option value="visual">Visual 리포트</option>
                <option value="marketing">Marketing 리포트</option>
                <option value="consulting">브랜드 컨설팅</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-noto-medium text-sm"
              >
                <option value="all">모든 상태</option>
                <option value="completed">완료</option>
                <option value="processing">처리중</option>
                <option value="draft">임시저장</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="리포트 제목이나 내용으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-noto-medium text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reports List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-noto-bold ${getTypeColor(report.type)}`}>
                        {getTypeLabel(report.type)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-noto-bold ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                      {report.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-noto-bold text-gray-700">{report.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-noto-bold text-gray-900 mb-1">
                      {report.title}
                    </h3>
                    
                    <p className="text-gray-600 font-noto-medium mb-3">
                      {report.subtitle}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 font-noto-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </div>
                      
                      {report.insights > 0 && (
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          {report.insights}개 인사이트
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-6">
                    {report.status === 'completed' && (
                      <>
                        {report.previewUrl && (
                          <button 
                            onClick={() => router.push(report.previewUrl!)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="미리보기"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
                        
                        {report.downloadUrl && (
                          <button 
                            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            title="다운로드"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    )}
                    
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-noto-bold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600 font-noto-medium">다른 조건으로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}