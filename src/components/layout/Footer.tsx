import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 로고 & 설명 */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              artnex<span className="text-purple-400">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              브랜드 개발부터 마케팅, 지원사업까지<br />
              원스톱 브랜드 솔루션
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/brand-develop" className="hover:text-white transition-colors">브랜드 개발</Link></li>
              <li><Link href="/brand-manager" className="hover:text-white transition-colors">브랜드매니저</Link></li>
              <li><Link href="/marketing" className="hover:text-white transition-colors">마케팅</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">지원사업</Link></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">이용가이드</Link></li>
              <li><Link href="/notice" className="hover:text-white transition-colors">공지사항</Link></li>
            </ul>
          </div>

          {/* 회사정보 */}
          <div>
            <h4 className="text-white font-semibold mb-4">회사정보</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">회사소개</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              <p>주식회사 수고랩 | 대표: 차민주</p>
              <p className="mt-1">사업자등록번호: 000-00-00000 | 통신판매업신고: 제0000-서울강남-00000호</p>
            </div>
            <p className="text-sm">© 2026 Sugolab. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
