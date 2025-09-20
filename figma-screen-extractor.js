// .env 파일 로드
require('dotenv').config();

const FigmaUrlExtractor = require('./figma-url-extractor');

class FigmaScreenExtractor extends FigmaUrlExtractor {
  constructor(accessToken = null) {
    super(accessToken);
    this.screens = [];
  }

  // 화면 단위 노드 추출 (CANVAS나 큰 FRAME)
  async extractScreenNodes(figmaUrl) {
    try {
      console.log('=== 피그마 화면 단위 추출 시작 ===\n');
      console.log(`URL: ${figmaUrl}\n`);

      const urlInfo = this.parseUrl(figmaUrl);
      if (!urlInfo || !urlInfo.fileKey) {
        throw new Error('유효하지 않은 피그마 URL입니다.');
      }

      // 전체 파일 데이터 가져오기
      const fileData = await this.fetchFileFromAPI(urlInfo.fileKey);
      
      console.log(`파일명: ${fileData.name}`);
      console.log(`페이지 수: ${fileData.document.children?.length || 0}\n`);

      // 화면 노드들 추출
      this.screens = this.findScreenNodes(fileData.document, urlInfo.fileKey);

      console.log(`=== 화면 추출 완료 ===`);
      console.log(`총 화면 수: ${this.screens.length}개\n`);

      // 화면 목록 출력
      this.screens.forEach((screen, index) => {
        console.log(`${index + 1}. ${screen.name}`);
        console.log(`   ID: ${screen.id}`);
        console.log(`   크기: ${screen.width} × ${screen.height}px`);
        console.log(`   섹션 수: ${screen.sections.length}개`);
        console.log(`   링크: ${screen.nodeLink}`);
        console.log('');
      });

      return {
        url: figmaUrl,
        fileKey: urlInfo.fileKey,
        fileName: fileData.name,
        totalScreens: this.screens.length,
        screens: this.screens
      };

    } catch (error) {
      console.error('화면 추출 실패:', error.message);
      throw error;
    }
  }

  // 화면 노드 찾기 (재귀)
  findScreenNodes(node, fileKey, parentPath = '') {
    const screens = [];

    if (!node) return screens;

    // CANVAS (페이지) 처리
    if (node.type === 'CANVAS' && node.children) {
      node.children.forEach(child => {
        // 큰 FRAME이면 화면으로 간주
        if (this.isScreenFrame(child)) {
          const screen = this.createScreenObject(child, fileKey, node.name);
          screens.push(screen);
        }
      });
    }

    // DOCUMENT의 자식들 순회
    if (node.type === 'DOCUMENT' && node.children) {
      node.children.forEach(child => {
        screens.push(...this.findScreenNodes(child, fileKey, parentPath));
      });
    }

    return screens;
  }

  // 화면 프레임인지 판단
  isScreenFrame(node) {
    if (node.type !== 'FRAME') return false;

    const bounds = node.absoluteBoundingBox;
    if (!bounds) return false;

    // 큰 화면 크기 조건 (1920x1080 이상 또는 1920 너비 이상)
    const isLargeFrame = bounds.width >= 1920 || bounds.height >= 1080;
    
    // 또는 특정 이름 패턴 (Landing, Brand Identity 등)
    const hasScreenName = /landing|brand|identity|management|planning|report/i.test(node.name);

    return isLargeFrame || hasScreenName;
  }

  // 화면 객체 생성
  createScreenObject(frameNode, fileKey, pageName) {
    const bounds = frameNode.absoluteBoundingBox || {};
    
    // 화면 내 주요 섹션들 추출
    const sections = this.extractScreenSections(frameNode);

    return {
      id: frameNode.id,
      name: frameNode.name,
      type: 'SCREEN',
      pageName: pageName,
      width: bounds.width || 0,
      height: bounds.height || 0,
      x: bounds.x || 0,
      y: bounds.y || 0,
      nodeLink: this.generateSectionLink(fileKey, frameNode.id),
      directLink: this.generateDirectLink(fileKey, frameNode.id),
      sections: sections,
      totalElements: frameNode.children ? frameNode.children.length : 0
    };
  }

  // 화면 내 섹션들 추출
  extractScreenSections(screenNode) {
    const sections = [];

    if (!screenNode.children) return sections;

    screenNode.children.forEach(child => {
      // INSTANCE나 FRAME만 섹션으로 간주
      if (child.type === 'INSTANCE' || child.type === 'FRAME') {
        const bounds = child.absoluteBoundingBox || {};
        
        sections.push({
          id: child.id,
          name: child.name,
          type: child.type,
          x: bounds.x || 0,
          y: bounds.y || 0,
          width: bounds.width || 0,
          height: bounds.height || 0,
          isComponent: child.type === 'INSTANCE',
          componentId: child.componentId || null,
          // 섹션 분류
          sectionType: this.classifySection(child.name),
          visible: child.visible !== false
        });
      }
    });

    // Y 좌표로 정렬 (위에서 아래 순서)
    sections.sort((a, b) => a.y - b.y);

    return sections;
  }

  // 섹션 분류 (GNB, Footer, Content 등)
  classifySection(name) {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('gnb') || lowerName.includes('header') || lowerName.includes('navigation')) {
      return 'header';
    }
    if (lowerName.includes('footer')) {
      return 'footer';
    }
    if (lowerName.includes('sidebar') || lowerName.includes('side')) {
      return 'sidebar';
    }
    if (lowerName.includes('form') || lowerName.includes('input')) {
      return 'form';
    }
    if (lowerName.includes('button')) {
      return 'button';
    }
    if (lowerName.includes('text') || lowerName.includes('content')) {
      return 'content';
    }
    
    return 'unknown';
  }

  // 특정 화면의 상세 정보 가져오기
  async getScreenDetails(figmaUrl, screenId) {
    try {
      const urlInfo = this.parseUrl(figmaUrl);
      
      // 특정 노드만 가져오기
      const fileData = await this.fetchFileFromAPI(urlInfo.fileKey, [screenId]);
      
      const screenNode = this.findNodeById(fileData.document, screenId);
      
      if (!screenNode) {
        throw new Error(`화면 ID ${screenId}를 찾을 수 없습니다.`);
      }

      return this.createScreenObject(screenNode, urlInfo.fileKey, 'Unknown Page');
      
    } catch (error) {
      console.error('화면 상세 정보 가져오기 실패:', error);
      throw error;
    }
  }

  // 노드 ID로 노드 찾기
  findNodeById(node, targetId) {
    if (!node) return null;
    
    if (node.id === targetId) return node;
    
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeById(child, targetId);
        if (found) return found;
      }
    }
    
    return null;
  }

  // 화면 맵 내보내기
  exportScreenMap(filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    const data = {
      extractedAt: new Date().toISOString(),
      totalScreens: this.screens.length,
      screens: this.screens.map(screen => ({
        ...screen,
        sectionsCount: screen.sections.length,
        // 섹션 요약
        sectionSummary: {
          header: screen.sections.filter(s => s.sectionType === 'header').length,
          footer: screen.sections.filter(s => s.sectionType === 'footer').length,
          content: screen.sections.filter(s => s.sectionType === 'content').length,
          form: screen.sections.filter(s => s.sectionType === 'form').length,
          unknown: screen.sections.filter(s => s.sectionType === 'unknown').length
        }
      }))
    };

    const mapFilename = filename || `figma-screens-map-${timestamp}.json`;
    require('fs').writeFileSync(mapFilename, JSON.stringify(data, null, 2));
    console.log(`화면 맵이 ${mapFilename}에 저장되었습니다.`);

    return data;
  }

  // 화면별 리포트 생성
  exportScreenReport(filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    let markdown = '# 피그마 화면 구조 분석 리포트\n\n';
    
    markdown += `**생성 일시:** ${new Date().toISOString()}\n`;
    markdown += `**총 화면 수:** ${this.screens.length}개\n\n`;

    this.screens.forEach((screen, index) => {
      markdown += `## ${index + 1}. ${screen.name}\n\n`;
      markdown += `- **ID:** ${screen.id}\n`;
      markdown += `- **크기:** ${screen.width} × ${screen.height}px\n`;
      markdown += `- **위치:** (${screen.x}, ${screen.y})\n`;
      markdown += `- **섹션 수:** ${screen.sections.length}개\n`;
      markdown += `- **링크:** [피그마에서 보기](${screen.directLink})\n\n`;

      if (screen.sections.length > 0) {
        markdown += '### 구성 섹션\n\n';
        markdown += '| 이름 | 타입 | 분류 | 크기 | 위치 |\n';
        markdown += '|------|------|------|------|------|\n';
        
        screen.sections.forEach(section => {
          markdown += `| ${section.name} | ${section.type} | ${section.sectionType} | ${section.width}×${section.height} | (${section.x}, ${section.y}) |\n`;
        });
        
        markdown += '\n';
      }
      
      markdown += '---\n\n';
    });

    const reportFilename = filename || `figma-screens-report-${timestamp}.md`;
    require('fs').writeFileSync(reportFilename, markdown);
    console.log(`화면 리포트가 ${reportFilename}에 저장되었습니다.`);
  }
}

// CLI 인터페이스
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('피그마 화면 단위 추출 도구');
    console.log('');
    console.log('사용법:');
    console.log('  node figma-screen-extractor.js <피그마_URL>');
    console.log('  node figma-screen-extractor.js <피그마_URL> --screen-id <노드_ID>');
    console.log('');
    console.log('예제:');
    console.log('  node figma-screen-extractor.js "https://www.figma.com/design/abc123/My-Design"');
    console.log('  node figma-screen-extractor.js "https://www.figma.com/design/abc123/My-Design" --screen-id "2:2454"');
    return;
  }
  
  const figmaUrl = args[0];
  const screenIdIndex = args.indexOf('--screen-id');
  const screenId = screenIdIndex !== -1 ? args[screenIdIndex + 1] : null;
  
  try {
    const extractor = new FigmaScreenExtractor();
    
    if (screenId) {
      // 특정 화면 상세 정보
      console.log(`특정 화면 (${screenId}) 상세 정보 추출 중...\n`);
      const screenDetails = await extractor.getScreenDetails(figmaUrl, screenId);
      
      console.log('=== 화면 상세 정보 ===');
      console.log(`이름: ${screenDetails.name}`);
      console.log(`크기: ${screenDetails.width} × ${screenDetails.height}px`);
      console.log(`섹션 수: ${screenDetails.sections.length}개\n`);
      
      screenDetails.sections.forEach((section, index) => {
        console.log(`${index + 1}. ${section.name} (${section.sectionType})`);
        console.log(`   타입: ${section.type}, 크기: ${section.width}×${section.height}`);
      });
      
    } else {
      // 모든 화면 추출
      const result = await extractor.extractScreenNodes(figmaUrl);
      
      // 결과 파일 생성
      console.log('=== 결과 파일 생성 중 ===');
      extractor.exportScreenMap();
      extractor.exportScreenReport();
    }
    
    console.log('\n✅ 작업이 완료되었습니다!');
    
  } catch (error) {
    console.error('\n❌ 작업 실패:', error.message);
    process.exit(1);
  }
}

// 내보내기
module.exports = FigmaScreenExtractor;

// 직접 실행 시
if (require.main === module) {
  main().catch(console.error);
}