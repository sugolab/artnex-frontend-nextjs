'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/';
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fbff]">
      {/* 좌측: 로그인 영역 */}
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

        {/* 로그인 폼 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[494px] bg-white rounded-[16px] p-[50px] shadow-sm">
            <h1 className="text-[22px] font-semibold text-[#2a2931] mb-8">로그인</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] font-medium text-[#2a2931] placeholder-[#908f9f] focus:outline-none focus:ring-2 focus:ring-[#2a2931]/20"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#f8f8fe] rounded-lg text-[18px] font-medium text-[#2a2931] placeholder-[#908f9f] focus:outline-none focus:ring-2 focus:ring-[#2a2931]/20"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-[#e5e5e5] text-[#2a2931]"
                />
                <label htmlFor="rememberMe" className="ml-2 text-[18px] font-medium text-[#4c4e5c]">
                  자동로그인
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2a2931] text-white text-[18px] font-semibold rounded-lg hover:bg-[#3a3941] transition-colors disabled:opacity-50 mt-4"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            <div className="mt-8 space-y-3">
              <p className="text-[18px] font-medium">
                <span className="text-[#908f9f]">비밀번호를 잊으셨나요?</span>{' '}
                <Link href="/auth/find-password" className="text-[#606177] hover:underline">
                  비밀번호 찾기
                </Link>
              </p>
              <p className="text-[18px] font-medium">
                <span className="text-[#908f9f]">계정이 없으신가요?</span>{' '}
                <Link href="/register" className="text-[#606177] hover:underline">
                  가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 우측: 이미지 영역 */}
      <div className="w-[673px] relative bg-[#d9d9d9]">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=750&h=1123&fit=crop"
          alt="협업하는 사람들"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
