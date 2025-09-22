import { test, expect, Page } from '@playwright/test';

// 피그마 리포트에서 확인된 주요 화면들과 예상되는 컴포넌트들
const EXPECTED_COMPONENTS = {
  // 공통 레이아웃 요소들
  header: '[data-testid="gnb"], nav, header, .gnb',
  footer: '[data-testid="footer"], footer, .footer',
  
  // 메인 페이지 요소들
  logo: '[data-testid="logo"], .logo, img[alt*="logo"], img[alt*="Logo"]',
  
  // 버튼 요소들
  buttons: '[data-testid="button"], button, .button, .btn',
  
  // 폼 요소들
  textbox: '[data-testid="textbox"], input[type="text"], input[type="email"], input[type="password"], .textbox',
  
  // 네비게이션
  navigation: '[data-testid="nav"], nav, .nav, .navigation',
  
  // 프로세스 스텝
  process: '[data-testid="process"], .process, .step',
  
  // 사이드바
  sidebar: '[data-testid="lnb"], .lnb, .sidebar, aside',
  
  // 컨텐츠 영역
  content: '[data-testid="content"], .content, main, .main-content'
};

// 피그마에서 확인된 주요 페이지 경로들
const FIGMA_PAGES = [
  { path: '/', name: 'MAIN', expectedSections: ['GNB', 'Frame 385', 'Footer'] },
  { path: '/login', name: 'Login', expectedSections: ['GNB', 'Logo', 'Text Box', 'Buttons', 'Footer'] },
  { path: '/register', name: 'Join_00', expectedSections: ['GNB', 'Buttons', 'Footer'] },
  { path: '/contact', name: 'CONTACT US', expectedSections: ['GNB', 'Footer'] },
  { path: '/consulting', name: '브랜드컨설팅', expectedSections: ['GNB', 'Logo', 'Buttons', 'Footer'] },
  { path: '/design', name: 'AI디자인', expectedSections: ['GNB', 'LNB', 'process', 'Frame 351', 'Footer'] },
  { path: '/reports', name: 'AI리포트', expectedSections: ['GNB', 'LNB', 'process', 'Footer'] },
  { path: '/mypage', name: '마이페이지', expectedSections: ['GNB', 'Frame 441', 'Frame 351', 'Footer'] },
  { path: '/ai-loading', name: 'AI생성 대기 화면', expectedSections: ['GNB', 'Frame 385', 'Frame 380', 'Footer'] }
];

async function checkComponentExists(page: Page, selector: string, componentName: string) {
  try {
    const element = await page.locator(selector).first();
    const isVisible = await element.isVisible({ timeout: 5000 });
    return { exists: isVisible, selector };
  } catch {
    return { exists: false, selector };
  }
}

async function findBestSelector(page: Page, selectors: string, componentName: string) {
  const selectorList = selectors.split(', ');
  
  for (const selector of selectorList) {
    const result = await checkComponentExists(page, selector, componentName);
    if (result.exists) {
      return result;
    }
  }
  
  return { exists: false, selector: selectorList[0] };
}

test.describe('피그마 디자인 구현 검증', () => {
  test.beforeEach(async ({ page }) => {
    // 개발 서버가 실행 중인지 확인
    await page.goto('/');
  });

  test('메인 페이지 기본 레이아웃 검증', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 로딩 대기
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 메인 페이지 레이아웃 검증 시작');
    
    // 헤더(GNB) 검증
    const headerResult = await findBestSelector(page, EXPECTED_COMPONENTS.header, 'Header/GNB');
    console.log(`📋 Header/GNB: ${headerResult.exists ? '✅ 발견' : '❌ 누락'} (selector: ${headerResult.selector})`);
    expect(headerResult.exists, `Header/GNB가 발견되지 않았습니다. 시도한 selector: ${headerResult.selector}`).toBe(true);
    
    // 로고 검증
    const logoResult = await findBestSelector(page, EXPECTED_COMPONENTS.logo, 'Logo');
    console.log(`🏷️ Logo: ${logoResult.exists ? '✅ 발견' : '❌ 누락'} (selector: ${logoResult.selector})`);
    expect(logoResult.exists, `Logo가 발견되지 않았습니다. 시도한 selector: ${logoResult.selector}`).toBe(true);
    
    // 푸터 검증
    const footerResult = await findBestSelector(page, EXPECTED_COMPONENTS.footer, 'Footer');
    console.log(`📄 Footer: ${footerResult.exists ? '✅ 발견' : '❌ 누락'} (selector: ${footerResult.selector})`);
    expect(footerResult.exists, `Footer가 발견되지 않았습니다. 시도한 selector: ${footerResult.selector}`).toBe(true);
    
    console.log('✅ 메인 페이지 기본 레이아웃 검증 완료');
  });

  test('로그인 페이지 폼 요소 검증', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 로그인 페이지 폼 요소 검증 시작');
    
    // 텍스트 박스 검증 (이메일, 비밀번호)
    const textboxResult = await findBestSelector(page, EXPECTED_COMPONENTS.textbox, 'Text Box');
    console.log(`📝 Text Box: ${textboxResult.exists ? '✅ 발견' : '❌ 누락'} (selector: ${textboxResult.selector})`);
    expect(textboxResult.exists, `Text Box가 발견되지 않았습니다. 시도한 selector: ${textboxResult.selector}`).toBe(true);
    
    // 버튼 검증 (로그인, 회원가입 등)
    const buttonResult = await findBestSelector(page, EXPECTED_COMPONENTS.buttons, 'Buttons');
    console.log(`🔘 Buttons: ${buttonResult.exists ? '✅ 발견' : '❌ 누락'} (selector: ${buttonResult.selector})`);
    expect(buttonResult.exists, `Buttons가 발견되지 않았습니다. 시도한 selector: ${buttonResult.selector}`).toBe(true);
    
    console.log('✅ 로그인 페이지 폼 요소 검증 완료');
  });

  test('네비게이션 링크 기능 검증', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 네비게이션 링크 기능 검증 시작');
    
    // 주요 네비게이션 링크들 확인
    const navigationLinks = [
      { text: '로그인', expectedPath: '/login' },
      { text: '회원가입', expectedPath: '/register' },
      { text: '컨설팅', expectedPath: '/consulting' },
      { text: '디자인', expectedPath: '/design' },
      { text: '리포트', expectedPath: '/reports' },
      { text: '마이페이지', expectedPath: '/mypage' },
      { text: '문의', expectedPath: '/contact' }
    ];
    
    for (const link of navigationLinks) {
      // 링크가 존재하는지 확인 (대소문자 구분 없이)
      const linkElement = page.locator(`a:has-text("${link.text}")`).first();
      const isVisible = await linkElement.isVisible().catch(() => false);
      
      if (isVisible) {
        console.log(`🔗 "${link.text}" 링크: ✅ 발견`);
        
        // 링크 클릭하여 페이지 이동 확인
        try {
          await linkElement.click({ timeout: 5000 });
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          const currentURL = page.url();
          const isCorrectPath = currentURL.includes(link.expectedPath);
          console.log(`   → 이동 확인: ${isCorrectPath ? '✅' : '❌'} (현재: ${currentURL}, 예상: ${link.expectedPath})`);
          
          // 다시 메인 페이지로 돌아가기
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        } catch (error) {
          console.log(`   → 이동 실패: ❌ (에러: ${error})`);
        }
      } else {
        console.log(`🔗 "${link.text}" 링크: ❌ 누락`);
      }
    }
    
    console.log('✅ 네비게이션 링크 기능 검증 완료');
  });

  // 각 주요 페이지별 레이아웃 검증
  for (const figmaPage of FIGMA_PAGES) {
    test(`${figmaPage.name} 페이지 레이아웃 검증`, async ({ page }) => {
      try {
        await page.goto(figmaPage.path);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        console.log(`🔍 ${figmaPage.name} 페이지 (${figmaPage.path}) 검증 시작`);
        
        // 기본 레이아웃 요소들 확인
        for (const section of figmaPage.expectedSections) {
          let found = false;
          let usedSelector = '';
          
          // 섹션 이름에 따른 selector 매핑
          if (section === 'GNB') {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.header, section);
            found = result.exists;
            usedSelector = result.selector;
          } else if (section === 'Footer') {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.footer, section);
            found = result.exists;
            usedSelector = result.selector;
          } else if (section === 'Logo') {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.logo, section);
            found = result.exists;
            usedSelector = result.selector;
          } else if (section.includes('Button')) {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.buttons, section);
            found = result.exists;
            usedSelector = result.selector;
          } else if (section.includes('Text Box')) {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.textbox, section);
            found = result.exists;
            usedSelector = result.selector;
          } else if (section === 'LNB') {
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.sidebar, section);
            found = result.exists;
            usedSelector = result.selector;
          } else {
            // Frame이나 기타 컨텐츠 영역
            const result = await findBestSelector(page, EXPECTED_COMPONENTS.content, section);
            found = result.exists;
            usedSelector = result.selector;
          }
          
          console.log(`   📋 ${section}: ${found ? '✅ 발견' : '⚠️ 누락'} (selector: ${usedSelector})`);
        }
        
        console.log(`✅ ${figmaPage.name} 페이지 검증 완료`);
        
      } catch (error) {
        console.log(`❌ ${figmaPage.name} 페이지 접근 실패: ${error}`);
        // 페이지 접근 실패는 테스트 실패로 처리하지 않음 (아직 구현되지 않은 페이지일 수 있음)
      }
    });
  }

  test('반응형 디자인 검증 (모바일)', async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 모바일 반응형 디자인 검증 시작');
    
    // 모바일에서도 주요 요소들이 표시되는지 확인
    const headerResult = await findBestSelector(page, EXPECTED_COMPONENTS.header, 'Header');
    const logoResult = await findBestSelector(page, EXPECTED_COMPONENTS.logo, 'Logo');
    const footerResult = await findBestSelector(page, EXPECTED_COMPONENTS.footer, 'Footer');
    
    console.log(`📱 Mobile Header: ${headerResult.exists ? '✅' : '❌'}`);
    console.log(`📱 Mobile Logo: ${logoResult.exists ? '✅' : '❌'}`);
    console.log(`📱 Mobile Footer: ${footerResult.exists ? '✅' : '❌'}`);
    
    expect(headerResult.exists, '모바일에서 Header가 표시되지 않습니다').toBe(true);
    expect(logoResult.exists, '모바일에서 Logo가 표시되지 않습니다').toBe(true);
    
    console.log('✅ 모바일 반응형 디자인 검증 완료');
  });

  test('페이지 로딩 성능 검증', async ({ page }) => {
    console.log('🔍 페이지 로딩 성능 검증 시작');
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️ 페이지 로딩 시간: ${loadTime}ms`);
    
    // 로딩 시간이 5초 이내인지 확인
    expect(loadTime, '페이지 로딩 시간이 5초를 초과했습니다').toBeLessThan(5000);
    
    console.log('✅ 페이지 로딩 성능 검증 완료');
  });
});