'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginData, value: string | boolean) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // 로그인 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login attempt:', loginData);
      // 성공 시 메인 페이지로 이동
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Google OAuth 로직
  };

  const handleKakaoLogin = () => {
    console.log('Kakao login clicked');
    // Kakao OAuth 로직
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/631e503d52e01f41cf2fa58492a4f07cf6729dcf.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-[400px]">
          {/* Logo and Title */}
          <div className="text-center mb-[50px]">
            <h1 className="text-[40px] font-bold text-black mb-4">artnex.</h1>
            <p className="text-[#262d33] font-noto-regular text-base">
              우리 브랜드만을 위한 브랜딩 솔루션 ABO
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="아이디를 입력하세요."
              value={loginData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500 focus:outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={loginData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full h-[50px] px-5 bg-white border border-[#c5ccd2] rounded-[5px] font-noto-regular text-base placeholder:text-neutral-500 focus:outline-none focus:border-black"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange('rememberMe', !loginData.rememberMe)}
                  className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded bg-white"
                >
                  {loginData.rememberMe && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
                <label className="font-noto-regular text-sm text-gray-600 cursor-pointer">
                  로그인 정보 저장
                </label>
              </div>
              <Link href="/forgot-password" className="font-noto-regular text-sm text-gray-600 hover:text-black">
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] bg-black text-white font-noto-medium text-lg rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          {/* Sign up and forgot password links */}
          <div className="flex justify-center gap-6 mb-8">
            <Link href="/register" className="font-noto-regular text-sm text-gray-600 hover:text-black">
              회원가입
            </Link>
            <Link href="/forgot-password" className="font-noto-regular text-sm text-gray-600 hover:text-black">
              아이디 찾기
            </Link>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500 font-noto-regular">간편로그인</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-[50px] bg-white border border-[#c5ccd2] rounded-[5px] flex items-center justify-center gap-3 font-noto-medium text-base text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google 로그인
            </button>

            <button
              type="button"
              onClick={handleKakaoLogin}
              className="w-full h-[50px] bg-[#FEE500] border border-[#FEE500] rounded-[5px] flex items-center justify-center gap-3 font-noto-medium text-base text-black hover:bg-[#FDD835] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.03 3 3 6.44 3 10.61c0 2.68 1.74 5.01 4.38 6.32l-.82 3.01c-.06.22.04.45.22.57.08.05.17.07.26.07.12 0 .23-.04.32-.12L10.4 17.5c.52.08 1.06.11 1.6.11 4.97 0 9-3.44 9-7.61S16.97 3 12 3"/>
              </svg>
              Kakao 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}