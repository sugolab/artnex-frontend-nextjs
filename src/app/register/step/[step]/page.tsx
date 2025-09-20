'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, TextBox, Logo, ProcessBar } from '@/components/common';
import { GNB, Footer } from '@/components/layout';

interface StepData {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  phone?: string;
  company?: string;
  position?: string;
  businessType?: string;
  agreementTerms?: boolean;
  agreementPrivacy?: boolean;
  agreementMarketing?: boolean;
}

const steps = [
  { number: '01', title: '이메일 인증', label: '이메일 인증' },
  { number: '02', title: '기본 정보', label: '기본 정보' },
  { number: '03', title: '상세 정보', label: '상세 정보' },
  { number: '04', title: '약관 동의', label: '약관 동의' }
];

export default function RegisterStepPage() {
  const params = useParams();
  const router = useRouter();
  const currentStep = parseInt(params.step as string);
  
  const [isLoading, setIsLoading] = useState(false);
  const [stepData, setStepData] = useState<StepData>({});

  useEffect(() => {
    // 유효하지 않은 스텝이면 첫 번째 스텝으로 리다이렉트
    if (currentStep < 1 || currentStep > 4) {
      router.replace('/register/step/1');
    }
  }, [currentStep, router]);

  const handleInputChange = (field: keyof StepData, value: string | boolean) => {
    setStepData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = async () => {
    setIsLoading(true);
    
    try {
      // 각 스텝별 검증 로직
      const isValid = validateCurrentStep();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentStep < 4) {
        router.push(`/register/step/${currentStep + 1}`);
      } else {
        // 마지막 스텝이면 완료 처리
        handleRegistrationComplete();
      }
    } catch (error) {
      console.error('Step navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/register/step/${currentStep - 1}`);
    } else {
      router.push('/register');
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!stepData.email) {
          alert('이메일을 입력해주세요.');
          return false;
        }
        return true;
      case 2:
        if (!stepData.password || !stepData.confirmPassword) {
          alert('비밀번호를 입력해주세요.');
          return false;
        }
        if (stepData.password !== stepData.confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          return false;
        }
        return true;
      case 3:
        if (!stepData.name || !stepData.phone) {
          alert('이름과 전화번호를 입력해주세요.');
          return false;
        }
        return true;
      case 4:
        if (!stepData.agreementTerms || !stepData.agreementPrivacy) {
          alert('필수 약관에 동의해주세요.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleRegistrationComplete = async () => {
    try {
      console.log('Registration completed:', stepData);
      // 실제 회원가입 API 호출
      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (error) {
      console.error('Registration completion error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-noto-bold text-black mb-2">이메일 인증</h2>
              <p className="text-gray-600 font-noto-medium">사용하실 이메일 주소를 입력해주세요.</p>
            </div>
            
            <TextBox
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={stepData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-noto-bold text-black mb-2">비밀번호 설정</h2>
              <p className="text-gray-600 font-noto-medium">안전한 비밀번호를 설정해주세요.</p>
            </div>
            
            <TextBox
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={stepData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            
            <TextBox
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={stepData.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-noto-bold text-black mb-2">기본 정보</h2>
              <p className="text-gray-600 font-noto-medium">기본 정보를 입력해주세요.</p>
            </div>
            
            <TextBox
              placeholder="이름을 입력하세요"
              value={stepData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            
            <TextBox
              placeholder="전화번호를 입력하세요"
              value={stepData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            
            <TextBox
              placeholder="회사명 (선택사항)"
              value={stepData.company || ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-noto-bold text-black mb-2">약관 동의</h2>
              <p className="text-gray-600 font-noto-medium">서비스 이용을 위한 약관에 동의해주세요.</p>
            </div>
            
            <div className="space-y-4 w-[500px]">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={stepData.agreementTerms || false}
                    onChange={(e) => handleInputChange('agreementTerms', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-noto-medium">서비스 이용약관 동의 (필수)</span>
                </label>
                <button className="text-sm text-gray-500 underline">보기</button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={stepData.agreementPrivacy || false}
                    onChange={(e) => handleInputChange('agreementPrivacy', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-noto-medium">개인정보 처리방침 동의 (필수)</span>
                </label>
                <button className="text-sm text-gray-500 underline">보기</button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={stepData.agreementMarketing || false}
                    onChange={(e) => handleInputChange('agreementMarketing', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-noto-medium">마케팅 정보 수신 동의 (선택)</span>
                </label>
                <button className="text-sm text-gray-500 underline">보기</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep < 1 || currentStep > 4) {
    return null; // 리다이렉트 처리 중
  }

  return (
    <div className="min-h-screen bg-white">
      {/* GNB */}
      <GNB />

      {/* Progress Bar */}
      <div className="flex justify-center py-8">
        <ProcessBar 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-5 pb-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Logo size="large" />
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              className="w-[200px]"
            >
              이전
            </Button>
            
            <Button
              onClick={handleNext}
              loading={isLoading}
              className="w-[200px]"
            >
              {currentStep === 4 ? '가입완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}