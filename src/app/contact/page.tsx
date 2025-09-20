'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header variant="black" />

        {/* Success Content */}
        <main className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/771d197a8f7cc251bb0a1c0439084d132f6d1cbe.svg"
              alt="Background Pattern"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          <div className="relative z-10 max-w-[1920px] mx-auto px-5">
            <div className="pt-[300px] pb-[300px] text-center">
              <h1 className="text-[50px] leading-[58px] font-poppins font-medium text-black mb-[20px]">
                CONTACT US
              </h1>
              <div className="text-xl leading-[29px] font-noto-regular text-[#262d33] mb-[50px]">
                <p>문의문이 정상적으로 접수되었습니다.</p>
                <p>담당자가 검토 후 연락드리겠습니다.</p>
              </div>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-black text-white font-noto-medium text-lg px-8 py-3 rounded hover:bg-gray-900 transition-colors flex items-center gap-2 mx-auto"
              >
                메인페이지로 이동
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header variant="black" />

      {/* Main Content */}
      <main className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/d7ed785305b449ecb7cc92e6f51cdc619b98b1cb.svg"
            alt="Background Pattern"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-5">
          {/* Page Title */}
          <div className="pt-[184px] pb-[42px] text-center">
            <h1 className="text-[50px] leading-[58px] font-poppins font-medium text-black mb-[20px]">
              CONTACT US
            </h1>
            <div className="text-xl leading-[29px] font-noto-regular text-[#262d33]">
              <p>실시간 고객 행동 분석과 아트넥스만의 AI 기술을 활용하여</p>
              <p>개인화된 브랜드 경험을 창출하고, 브랜드만의 독특한 가치를 강화합니다.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex justify-center pb-[91px]">
            <form onSubmit={handleSubmit} className="w-[500px] space-y-[50px]">
              {/* Form Fields */}
              <div className="space-y-[15px]">
                <div className="space-y-[10px]">
                  {/* Consulting Field Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] flex items-center justify-between font-noto-regular text-base text-neutral-500"
                    >
                      <span>
                        {formData.consultingField || '상담분야를 선택해주세요.'}
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#c5ccd2] rounded-[5px] shadow-lg z-20">
                        {consultingOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              handleInputChange('consultingField', option);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-5 py-3 text-left font-noto-regular text-base text-black hover:bg-gray-50 first:rounded-t-[5px] last:rounded-b-[5px]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Input Fields */}
                <input
                  type="text"
                  placeholder="회사명"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                <input
                  type="text"
                  placeholder="담당부서"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                <input
                  type="text"
                  placeholder="담당자 이름"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                <input
                  type="text"
                  placeholder="직함"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                <input
                  type="tel"
                  placeholder="휴대폰 번호"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500"
                />

                {/* Message Textarea */}
                <textarea
                  placeholder="상담하고자 하는 내용을 작성해주세요."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={10}
                  className="w-full h-[250px] p-5 bg-white border border-[#dddddd] rounded-[5px] font-noto-regular text-[15px] leading-[22px] placeholder:text-neutral-500 resize-none"
                />

                {/* Checkbox */}
                <div className="flex items-center gap-[10px]">
                  <button
                    type="button"
                    onClick={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                    className="flex items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white"
                  >
                    {formData.agreeToTerms && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                  <label className="font-noto-medium text-sm text-[#72727b] cursor-pointer">
                    개인 및 기업정보 수집에 동의합니다.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreeToTerms || isSubmitting}
                className="w-full h-[50px] bg-black text-white font-noto-medium text-lg rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    전송 중...
                  </>
                ) : (
                  '보내기'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}