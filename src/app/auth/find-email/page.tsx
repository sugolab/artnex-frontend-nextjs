'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, TextBox, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';

export default function FindEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [foundEmail, setFoundEmail] = useState('');

  const handleInputChange = (field: 'name' | 'phone', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFindEmail = async () => {
    if (!formData.name || !formData.phone) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 아이디 찾기 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 실제로는 API 응답에서 받아올 값
      const mockEmail = 'user***@example.com';
      setFoundEmail(mockEmail);
      setStep('result');
    } catch (error) {
      console.error('Find email error:', error);
      alert('아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setStep('input');
    setFormData({ name: '', phone: '' });
    setFoundEmail('');
  };

  const renderInputStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-noto-bold text-black mb-2">아이디 찾기</h1>
        <p className="text-base font-noto-medium text-gray-600">
          가입 시 입력하신 정보를 입력해주세요
        </p>
      </div>

      {/* 이름 입력 */}
      <TextBox
        placeholder="이름을 입력하세요"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />

      {/* 전화번호 입력 */}
      <TextBox
        placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />

      {/* 찾기 버튼 */}
      <Button
        size="medium"
        loading={isLoading}
        onClick={handleFindEmail}
        className="w-full"
      >
        아이디 찾기
      </Button>

      {/* 하단 링크 */}
      <div className="flex justify-center gap-6 text-sm font-noto-medium text-gray-600">
        <Link href="/auth/find-password" className="hover:text-black transition-colors">
          비밀번호 찾기
        </Link>
        <Link href="/login" className="hover:text-black transition-colors">
          로그인
        </Link>
        <Link href="/register" className="hover:text-black transition-colors">
          회원가입
        </Link>
      </div>
    </div>
  );

  const renderResultStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-noto-bold text-black mb-2">아이디 찾기</h1>
        <p className="text-base font-noto-medium text-gray-600">
          입력하신 정보와 일치하는 아이디입니다
        </p>
      </div>

      {/* 결과 표시 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="mb-4">
          <p className="text-sm font-noto-medium text-gray-600 mb-2">찾은 아이디</p>
          <p className="text-xl font-noto-bold text-black">{foundEmail}</p>
        </div>
        <div className="text-sm font-noto-regular text-gray-500">
          <p>{formData.name}님의 아이디입니다.</p>
          <p>가입일: 2024년 3월 15일</p>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="space-y-3">
        <Button
          size="medium"
          onClick={() => window.location.href = '/login'}
          className="w-full"
        >
          로그인하기
        </Button>
        
        <Button
          variant="outlined"
          size="medium"
          onClick={handleRetry}
          className="w-full"
        >
          다시 찾기
        </Button>
      </div>

      {/* 하단 링크 */}
      <div className="flex justify-center gap-6 text-sm font-noto-medium text-gray-600">
        <Link href="/auth/find-password" className="hover:text-black transition-colors">
          비밀번호 찾기
        </Link>
        <Link href="/register" className="hover:text-black transition-colors">
          회원가입
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* GNB - 1920×90 */}
      <GNB />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-12">
            <Logo size="large" />
          </div>

          {/* Content */}
          {step === 'input' ? renderInputStep() : renderResultStep()}
        </div>
      </div>

      {/* Footer - 1920×90 */}
      <Footer />
    </div>
  );
}