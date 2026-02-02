'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/brand-develop', label: '브랜드 개발' },
    { href: '/brand-manager', label: '브랜드매니저' },
    { href: '/marketing', label: '마케팅' },
    { href: '/support', label: '지원사업' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <span className="text-[22px] font-bold text-[#1A1A2E]">artnex</span>
          <span className="text-[22px] font-bold text-[#4A7CFF]">.</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-[#1A1A2E]'
                  : 'text-[#666666] hover:text-[#1A1A2E]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-[15px] text-[#666666] hover:text-[#1A1A2E] font-medium"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 bg-[#1F2937] text-white text-[14px] font-medium rounded-lg hover:bg-[#374151] transition-colors"
          >
            무료 시작
          </Link>
        </div>
      </div>
    </header>
  );
}
