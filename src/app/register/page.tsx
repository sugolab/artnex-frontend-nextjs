'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    
    try {
      // 회원가입 로직 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Register clicked');
      // 성공 시 로그인 페이지로 이동
      window.location.href = '/login';
    } catch (error) {
      console.error('Register error:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceGuide = () => {
    console.log('Service guide clicked');
    // 서비스 안내 페이지로 이동
    window.location.href = '/service-guide';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/8d58746cbb631e4f4f6f1e1b16e121daef64ef48.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-[600px] text-center">
          {/* Title */}
          <div className="mb-[50px]">
            <h1 className="text-[50px] leading-[58px] font-poppins font-medium text-black mb-6">
              Building your<br />
              AI Manager
            </h1>
            <div className="text-base leading-[24px] font-noto-regular text-[#262d33]">
              <p>브랜드 매니징을 위한 정보를 수집합니다.</p>
              <p>누구나 쉽게 정의 브랜딩을 할 수 있습니다.</p>
            </div>
          </div>

          {/* Main Register Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full max-w-[400px] h-[50px] bg-black text-white font-noto-medium text-lg rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 mb-4"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                처리 중...
              </>
            ) : (
              '회원가입'
            )}
          </button>

          {/* Bottom Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleServiceGuide}
              className="px-8 py-3 bg-white border border-[#c5ccd2] text-black font-noto-medium text-base rounded hover:bg-gray-50 transition-colors"
            >
              서비스 안내
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-3 bg-white border border-[#c5ccd2] text-black font-noto-medium text-base rounded hover:bg-gray-50 transition-colors"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}