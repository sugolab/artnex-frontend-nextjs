'use client';

import { useState } from 'react';
import { GNB, Footer } from '@/components/layout';
import { Button, TextBox } from '@/components/common';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2, ChevronDown } from 'lucide-react';

interface FormData {
  consultingField: string;
  companyName: string;
  department: string;
  contactName: string;
  position: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    consultingField: '',
    companyName: '',
    department: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultingOptions = [
    'AI 리포트',
    'AI 디자인',
    'AI 마케팅',
    '브랜드 컨설팅',
    '기타 문의'
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.consultingField || !formData.companyName || !formData.contactName || 
        !formData.email || !formData.phone || !formData.message || !formData.agreeToTerms) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 실제 API 호출 시뮬레이션 (2초 지연)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 폼 제출 성공
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit error:', error);
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* GNB */}
        <GNB />

        {/* Success Content */}
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-noto-bold text-gray-900 mb-4">
                문의가 접수되었습니다
              </h1>
              
              <div className="text-lg font-noto-medium text-gray-600 mb-8">
                <p>문의문이 정상적으로 접수되었습니다.</p>
                <p>담당자가 검토 후 연락드리겠습니다.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="medium"
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  메인페이지로 이동
                </Button>
                
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={() => window.location.href = '/contact'}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  다시 문의하기
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GNB />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-noto-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl font-noto-medium text-gray-600 mb-8">
            실시간 고객 행동 분석과 아트넥스만의 AI 기술을 활용하여<br />
            개인화된 브랜드 경험을 창출하고, 브랜드만의 독특한 가치를 강화합니다.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-noto-bold text-gray-900 mb-2">전화 문의</h3>
              <p className="text-gray-600 font-noto-medium">02-1234-5678</p>
              <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-noto-bold text-gray-900 mb-2">이메일 문의</h3>
              <p className="text-gray-600 font-noto-medium">contact@artnex.co.kr</p>
              <p className="text-sm text-gray-500">24시간 접수</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-noto-bold text-gray-900 mb-2">방문 상담</h3>
              <p className="text-gray-600 font-noto-medium">서울시 강남구</p>
              <p className="text-sm text-gray-500">사전 예약 필수</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-noto-bold text-gray-900 mb-6 text-center">
              문의하기
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Consulting Field Dropdown */}
              <div>
                <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                  상담분야 *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between font-noto-medium text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <span className={formData.consultingField ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.consultingField || '상담분야를 선택해주세요'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                      {consultingOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            handleInputChange('consultingField', option);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left font-noto-medium text-gray-700 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    회사명 *
                  </label>
                  <TextBox
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="회사명을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    담당부서
                  </label>
                  <TextBox
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="담당부서를 입력하세요"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    담당자 이름 *
                  </label>
                  <TextBox
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="담당자 이름을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    직함
                  </label>
                  <TextBox
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="직함을 입력하세요"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    이메일 주소 *
                  </label>
                  <TextBox
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                    휴대폰 번호 *
                  </label>
                  <TextBox
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="휴대폰 번호를 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-noto-medium text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="상담하고자 하는 내용을 자세히 작성해주세요"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-noto-medium text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                  className="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded mt-0.5 transition-colors"
                  style={{ 
                    backgroundColor: formData.agreeToTerms ? '#3B82F6' : 'white',
                    borderColor: formData.agreeToTerms ? '#3B82F6' : '#D1D5DB'
                  }}
                >
                  {formData.agreeToTerms && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <label className="font-noto-medium text-sm text-gray-700 cursor-pointer">
                  개인정보 수집 및 이용에 동의합니다. (필수)
                </label>
              </div>

              <Button
                type="submit"
                size="large"
                disabled={!formData.agreeToTerms || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    전송 중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    문의하기
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
        </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}