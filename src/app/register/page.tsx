'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      alert('필수 정보를 입력해주세요.');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fbff]">
      {/* 좌측: 회원가입 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="h-[63px] flex items-center px-[30px] border-b border-[#e5e5e5] bg-white">
          <Link href="/" className="text-[22px] font-semibold text-[#2a2931]">
            artnex.
          </Link>
          <div className="flex-1"></div>
          <Link href="/brand-develop" className="px-6 py-3 bg-[#2a2931] text-white text-[18px] font-medium rounded-lg">
            분석하기
          </Link>
        </header>

        {/* 회원가입 폼 */}
        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-[494px] bg-white rounded-[16px] p-[50px] shadow-sm">
            <h1 className="text-[22px] font-semibold text-[#2a2931] mb-6">회원가입</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#2a2931] mb-2">이메일 *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#2a2931] mb-2">비밀번호 *</label>
                <input
                  type="password"
                  placeholder="8자 이상 입력"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#2a2931] mb-2">비밀번호 확인 *</label>
                <input
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={formData.passwordConfirm}
                  onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#2a2931] mb-2">이름 *</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#2a2931] mb-2">휴대폰 번호</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] text-[#2a2931] placeholder-[#908f9f] focus:outline-none"
                />
              </div>

              {/* 약관 동의 */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                    className="w-5 h-5 rounded border-[#e5e5e5] text-[#2a2931]"
                  />
                  <label htmlFor="agreeTerms" className="ml-3 text-[16px] text-[#606177]">
                    [필수] 이용약관 동의
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                    className="w-5 h-5 rounded border-[#e5e5e5] text-[#2a2931]"
                  />
                  <label htmlFor="agreePrivacy" className="ml-3 text-[16px] text-[#606177]">
                    [필수] 개인정보 처리방침 동의
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={(e) => handleChange('agreeMarketing', e.target.checked)}
                    className="w-5 h-5 rounded border-[#e5e5e5] text-[#2a2931]"
                  />
                  <label htmlFor="agreeMarketing" className="ml-3 text-[16px] text-[#606177]">
                    [선택] 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2a2931] text-white text-[18px] font-semibold rounded-lg hover:bg-[#3a3941] disabled:opacity-50 mt-4"
              >
                {isLoading ? '가입 중...' : '가입하기'}
              </button>
            </form>

            <p className="mt-6 text-[16px] text-center">
              <span className="text-[#908f9f]">이미 계정이 있으신가요?</span>{' '}
              <Link href="/login" className="text-[#606177] font-medium hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 우측: 이미지 영역 */}
      <div className="w-[673px] relative bg-[#d9d9d9]">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=750&h=1200&fit=crop"
          alt="팀 협업"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
