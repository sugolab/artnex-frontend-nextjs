'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, TextBox, Logo } from '@/components/common';
import { GNB, Footer } from '@/components/layout';

type Step = 'verify' | 'code' | 'reset' | 'complete';

export default function FindPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>('verify');
  const [timer, setTimer] = useState(300); // 5분 = 300초
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 인증코드 발송 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('code');
      setTimer(300);
      setIsTimerActive(true);
      alert('인증코드가 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      console.error('Send verification code error:', error);
      alert('인증코드 발송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 인증코드 확인 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('reset');
      setIsTimerActive(false);
    } catch (error) {
      console.error('Verify code error:', error);
      alert('인증코드가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.newPassword.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    try {
      // 비밀번호 재설정 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('complete');
    } catch (error) {
      console.error('Reset password error:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimer(300);
      setIsTimerActive(true);
      alert('인증코드가 재발송되었습니다.');
    } catch (error) {
      console.error('Resend code error:', error);
      alert('인증코드 재발송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderVerifyStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-noto-bold text-black mb-2">비밀번호 찾기</h1>
        <p className="text-base font-noto-medium text-gray-600">
          가입하신 이메일 주소를 입력해주세요
        </p>
      </div>

      <TextBox
        type="email"
        placeholder="이메일 주소를 입력하세요"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />

      <Button
        size="medium"
        loading={isLoading}
        onClick={handleSendVerificationCode}
        className="w-full"
      >
        인증코드 발송
      </Button>

      <div className="flex justify-center gap-6 text-sm font-noto-medium text-gray-600">
        <Link href="/auth/find-email" className="hover:text-black transition-colors">
          아이디 찾기
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

  const renderCodeStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-noto-bold text-black mb-2">비밀번호 찾기</h1>
        <p className="text-base font-noto-medium text-gray-600">
          {formData.email}로 발송된<br />
          인증코드를 입력해주세요
        </p>
      </div>

      <div className="space-y-2">
        <TextBox
          placeholder="인증코드 6자리를 입력하세요"
          value={formData.verificationCode}
          onChange={(e) => handleInputChange('verificationCode', e.target.value)}
          maxLength={6}
        />
        
        <div className="flex justify-between items-center text-sm">
          <span className="font-noto-medium text-gray-600">
            남은 시간: <span className="text-red-500 font-noto-bold">{formatTime(timer)}</span>
          </span>
          <button
            onClick={handleResendCode}
            disabled={isLoading || timer > 240} // 1분 후 재발송 가능
            className="font-noto-medium text-black hover:underline disabled:text-gray-400 disabled:no-underline"
          >
            재발송
          </button>
        </div>
      </div>

      <Button
        size="medium"
        loading={isLoading}
        onClick={handleVerifyCode}
        className="w-full"
      >
        인증하기
      </Button>

      <div className="flex justify-center gap-6 text-sm font-noto-medium text-gray-600">
        <button 
          onClick={() => setStep('verify')}
          className="hover:text-black transition-colors"
        >
          이메일 변경
        </button>
        <Link href="/login" className="hover:text-black transition-colors">
          로그인
        </Link>
      </div>
    </div>
  );

  const renderResetStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-noto-bold text-black mb-2">비밀번호 찾기</h1>
        <p className="text-base font-noto-medium text-gray-600">
          새로운 비밀번호를 설정해주세요
        </p>
      </div>

      <TextBox
        type="password"
        placeholder="새 비밀번호를 입력하세요 (8자 이상)"
        value={formData.newPassword}
        onChange={(e) => handleInputChange('newPassword', e.target.value)}
      />

      <TextBox
        type="password"
        placeholder="새 비밀번호를 다시 입력하세요"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
      />

      <div className="text-xs text-gray-500 font-noto-regular">
        <p>• 8자 이상의 비밀번호를 입력하세요</p>
        <p>• 영문, 숫자, 특수문자를 조합하여 사용하세요</p>
      </div>

      <Button
        size="medium"
        loading={isLoading}
        onClick={handleResetPassword}
        className="w-full"
      >
        비밀번호 변경
      </Button>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-noto-bold text-black mb-2">변경 완료</h1>
        <p className="text-base font-noto-medium text-gray-600">
          비밀번호 변경이 완료되었습니다.<br />
          새로운 비밀번호로 로그인해주세요.
        </p>
      </div>

      <Button
        size="medium"
        onClick={() => window.location.href = '/login'}
        className="w-full"
      >
        로그인하기
      </Button>

      <div className="flex justify-center gap-6 text-sm font-noto-medium text-gray-600">
        <Link href="/register" className="hover:text-black transition-colors">
          회원가입
        </Link>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'verify':
        return renderVerifyStep();
      case 'code':
        return renderCodeStep();
      case 'reset':
        return renderResetStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderVerifyStep();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GNB />

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-12">
            <Logo size="large" />
          </div>

          {/* Content */}
          {renderCurrentStep()}
        </div>
      </div>

      <Footer />
    </div>
  );
}