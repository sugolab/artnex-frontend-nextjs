'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { User, Settings, FileText, BarChart3, Clock, Download, Eye, Edit, ChevronRight, Calendar, Mail, Phone, MapPin, Award, TrendingUp } from 'lucide-react';

interface ReportHistory {
  id: string;
  type: 'bid' | 'visual' | 'marketing' | 'consulting';
  title: string;
  date: string;
  status: 'completed' | 'processing' | 'draft';
  downloadUrl?: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  memberSince: string;
  totalReports: number;
  completedReports: number;
}

export default function MyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const userProfile: UserProfile = {
    name: '김성은',
    email: 'sungeun.kim@artnex.co.kr',
    phone: '010-1234-5678',
    company: 'ArtNex',
    position: '이사',
    memberSince: '2025-09-01',
    totalReports: 12,
    completedReports: 10
  };

  // Mock report history
  const reportHistory: ReportHistory[] = [
    {
      id: '1',
      type: 'bid',
      title: 'BID Report - 브랜드 아이덴티티 분석',
      date: '2025-09-20',
      status: 'completed',
      downloadUrl: '/reports/bid-report-20250920.pdf'
    },
    {
      id: '2',
      type: 'consulting',
      title: '브랜드 컨설팅 - 전략 수립',
      date: '2025-09-18',
      status: 'completed',
      downloadUrl: '/reports/consulting-20250918.pdf'
    },
    {
      id: '3',
      type: 'visual',
      title: 'Visual Report - 비주얼 아이덴티티',
      date: '2025-09-15',
      status: 'processing'
    },
    {
      id: '4',
      type: 'marketing',
      title: 'Marketing Report - 마케팅 전략',
      date: '2025-09-12',
      status: 'draft'
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

  const tabs = [
    { id: 'profile', label: '프로필', icon: User, route: null },
    { id: 'reports', label: '리포트 히스토리', icon: FileText, route: '/mypage/reports' },
    { id: 'analytics', label: '분석 현황', icon: BarChart3, route: '/mypage/analytics' },
    { id: 'settings', label: '설정', icon: Settings, route: '/mypage/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GNB />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-noto-bold text-gray-900 mb-2">
                  안녕하세요, {userProfile.name}님
                </h1>
                <p className="text-gray-600 font-noto-medium">
                  {userProfile.company} · {userProfile.position}
                </p>
                <p className="text-sm text-gray-500 font-noto-regular mt-1">
                  가입일: {userProfile.memberSince}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-noto-bold text-blue-600">{userProfile.totalReports}</div>
                <div className="text-sm text-gray-600 font-noto-medium">총 리포트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-noto-bold text-green-600">{userProfile.completedReports}</div>
                <div className="text-sm text-gray-600 font-noto-medium">완료된 리포트</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.route) {
                    router.push(tab.route);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-noto-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex-1">
        {/* Content Area */}
        <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-noto-bold text-gray-900">프로필 정보</h2>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {}}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  편집
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">이름</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900">
                      {userProfile.name}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">이메일</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {userProfile.email}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">연락처</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {userProfile.phone}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">회사명</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900">
                      {userProfile.company}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">직책</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900">
                      {userProfile.position}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-noto-medium text-gray-700 mb-2">가입일</label>
                    <div className="p-3 bg-gray-50 rounded-lg font-noto-regular text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {userProfile.memberSince}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
        </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}