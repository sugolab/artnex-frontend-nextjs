'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextBox } from '@/components/common';
import { GNB, Footer } from '@/components/layout';
import { 
  Settings, User, Bell, Shield, Database, Mail,
  Phone, Key, Download, Trash2, Eye, EyeOff,
  Check, X, AlertTriangle
} from 'lucide-react';

interface NotificationSettings {
  emailNotifications: boolean;
  reportCompletion: boolean;
  marketingEmails: boolean;
  systemUpdates: boolean;
  weeklyDigest: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  dataSharing: boolean;
  analyticsTracking: boolean;
  cookiePreferences: 'all' | 'essential' | 'custom';
}

export default function MyPageSettings() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: '김성은',
    email: 'sungeun.kim@artnex.co.kr',
    phone: '010-1234-5678',
    company: 'ArtNex',
    position: '이사'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    reportCompletion: true,
    marketingEmails: false,
    systemUpdates: true,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    cookiePreferences: 'essential'
  });

  const sections = [
    { id: 'profile', label: '프로필 설정', icon: User },
    { id: 'security', label: '보안 설정', icon: Shield },
    { id: 'notifications', label: '알림 설정', icon: Bell },
    { id: 'privacy', label: '개인정보 설정', icon: Eye },
    { id: 'data', label: '데이터 관리', icon: Database }
  ];

  const handleProfileSave = () => {
    // Save profile logic
    alert('프로필이 저장되었습니다.');
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // Change password logic
    alert('비밀번호가 변경되었습니다.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationUpdate = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyUpdate = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataExport = () => {
    alert('데이터 내보내기가 시작되었습니다. 완료되면 이메일로 알려드립니다.');
  };

  const handleAccountDelete = () => {
    if (confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      alert('계정 삭제 요청이 접수되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GNB */}
      <GNB />

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-noto-bold text-gray-900 mb-2">
            계정 설정
          </h1>
          <p className="text-gray-600 font-noto-medium">
            프로필, 보안, 알림 및 개인정보 설정을 관리하세요
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-noto-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-xl font-noto-bold text-gray-900 mb-6">프로필 설정</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-noto-medium text-gray-700 mb-2">이름 *</label>
                      <TextBox
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-noto-medium text-gray-700 mb-2">이메일 *</label>
                      <TextBox
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-noto-medium text-gray-700 mb-2">연락처</label>
                      <TextBox
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="연락처를 입력하세요"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-noto-medium text-gray-700 mb-2">회사명</label>
                      <TextBox
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="회사명을 입력하세요"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-noto-medium text-gray-700 mb-2">직책</label>
                      <TextBox
                        value={profileData.position}
                        onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="직책을 입력하세요"
                      />
                    </div>
                  </div>
                  
                  <Button size="medium" onClick={handleProfileSave}>
                    프로필 저장
                  </Button>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-xl font-noto-bold text-gray-900 mb-6">보안 설정</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-noto-bold text-gray-900 mb-4">비밀번호 변경</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-noto-medium text-gray-700 mb-2">현재 비밀번호</label>
                          <div className="relative">
                            <TextBox
                              type={showCurrentPassword ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              placeholder="현재 비밀번호를 입력하세요"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-noto-medium text-gray-700 mb-2">새 비밀번호</label>
                          <div className="relative">
                            <TextBox
                              type={showNewPassword ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              placeholder="새 비밀번호를 입력하세요"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-noto-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                          <TextBox
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="새 비밀번호를 다시 입력하세요"
                          />
                        </div>
                      </div>
                      
                      <Button size="medium" onClick={handlePasswordChange}>
                        비밀번호 변경
                      </Button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-noto-bold text-gray-900 mb-4">2단계 인증</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-noto-medium text-gray-900">2단계 인증 사용</div>
                          <div className="text-sm text-gray-600">계정 보안을 강화하기 위해 2단계 인증을 활성화하세요</div>
                        </div>
                        <Button size="small" variant="outlined">
                          설정하기
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-noto-bold text-gray-900 mb-4">활성 세션</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-noto-medium text-gray-900">현재 세션 (Chrome, MacOS)</div>
                            <div className="text-sm text-gray-600">마지막 활동: 방금 전</div>
                          </div>
                          <span className="text-sm font-noto-bold text-green-600">활성</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-xl font-noto-bold text-gray-900 mb-6">알림 설정</h2>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-noto-medium text-gray-900">
                            {key === 'emailNotifications' && '이메일 알림'}
                            {key === 'reportCompletion' && '리포트 완료 알림'}
                            {key === 'marketingEmails' && '마케팅 이메일'}
                            {key === 'systemUpdates' && '시스템 업데이트'}
                            {key === 'weeklyDigest' && '주간 요약'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {key === 'emailNotifications' && '중요한 알림을 이메일로 받습니다'}
                            {key === 'reportCompletion' && '리포트 생성이 완료되면 알림을 받습니다'}
                            {key === 'marketingEmails' && '새로운 기능과 프로모션 정보를 받습니다'}
                            {key === 'systemUpdates' && '시스템 업데이트와 공지사항을 받습니다'}
                            {key === 'weeklyDigest' && '매주 활동 요약을 이메일로 받습니다'}
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationUpdate(key as keyof NotificationSettings)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-xl font-noto-bold text-gray-900 mb-6">개인정보 설정</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-noto-medium text-gray-900 mb-2">프로필 공개 설정</div>
                      <div className="text-sm text-gray-600 mb-4">다른 사용자에게 프로필 정보 공개 여부를 설정합니다</div>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-noto-medium"
                      >
                        <option value="public">공개</option>
                        <option value="private">비공개</option>
                      </select>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-noto-medium text-gray-900 mb-2">쿠키 설정</div>
                      <div className="text-sm text-gray-600 mb-4">웹사이트에서 사용하는 쿠키 유형을 선택합니다</div>
                      <select
                        value={privacy.cookiePreferences}
                        onChange={(e) => handlePrivacyUpdate('cookiePreferences', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-noto-medium"
                      >
                        <option value="all">모든 쿠키 허용</option>
                        <option value="essential">필수 쿠키만</option>
                        <option value="custom">사용자 정의</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-noto-medium text-gray-900">데이터 공유</div>
                        <div className="text-sm text-gray-600">서비스 개선을 위한 익명 데이터 공유에 동의합니다</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.dataSharing}
                          onChange={(e) => handlePrivacyUpdate('dataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-noto-medium text-gray-900">분석 추적</div>
                        <div className="text-sm text-gray-600">사용 패턴 분석을 위한 데이터 수집에 동의합니다</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.analyticsTracking}
                          onChange={(e) => handlePrivacyUpdate('analyticsTracking', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management */}
              {activeSection === 'data' && (
                <div>
                  <h2 className="text-xl font-noto-bold text-gray-900 mb-6">데이터 관리</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-4">
                        <Download className="w-6 h-6 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-noto-bold text-gray-900 mb-2">데이터 내보내기</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            계정 정보, 리포트 데이터 등 모든 개인 데이터를 다운로드할 수 있습니다.
                          </p>
                          <Button size="small" onClick={handleDataExport}>
                            데이터 내보내기
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-noto-bold text-red-900 mb-2">계정 삭제</h3>
                          <p className="text-sm text-red-700 mb-4">
                            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                            삭제 전에 필요한 데이터를 백업해 주세요.
                          </p>
                          <Button 
                            size="small" 
                            onClick={handleAccountDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            계정 삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}