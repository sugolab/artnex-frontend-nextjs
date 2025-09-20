// .env 파일 로드
require('dotenv').config();

const FigmaUrlExtractor = require('./figma-url-extractor');

// Figma API 기반 추출기
class FigmaAPIExtractor extends FigmaUrlExtractor {
  
  // 추가: 특정 페이지의 모든 레이어 가져오기
  async extractPageLayers(figmaUrl, pageId = null) {
    try {
      console.log('=== 페이지 레이어 추출 시작 ===\n');
      
      const urlInfo = this.parseUrl(figmaUrl);
      if (!urlInfo || !urlInfo.fileKey) {
        throw new Error('유효하지 않은 피그마 URL입니다.');
      }

      // 전체 파일 데이터 가져오기
      const fileData = await this.fetchFileFromAPI(urlInfo.fileKey);
      
      // 특정 페이지가 지정된 경우 해당 페이지만 추출
      if (pageId) {
        const page = this.findPageById(fileData.document, pageId);
        if (page) {
          this.traverseNode(page, urlInfo.fileKey, '');
        } else {
          throw new Error(`페이지 ID ${pageId}를 찾을 수 없습니다.`);
        }
      } else {
        // 모든 페이지 추출
        this.parseFileData(fileData, urlInfo.fileKey);
      }

      return {
        url: figmaUrl,
        fileKey: urlInfo.fileKey,
        fileName: fileData.name,
        totalLayers: this.layers.length,
        layers: this.layers
      };

    } catch (error) {
      console.error('페이지 레이어 추출 실패:', error.message);
      throw error;
    }
  }

  // 페이지 ID로 페이지 찾기
  findPageById(document, pageId) {
    if (!document.children) return null;
    
    return document.children.find(page => page.id === pageId);
  }

  // 레이어 타입별 필터링
  getLayersByType(type) {
    return this.layers.filter(layer => 
      layer.type.toLowerCase() === type.toLowerCase()
    );
  }

  // 텍스트 내용으로 검색
  searchByText(searchText) {
    return this.layers.filter(layer => 
      layer.text && layer.text.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // 레이어 크기별 필터링
  getLayersBySize(minWidth = 0, minHeight = 0, maxWidth = Infinity, maxHeight = Infinity) {
    return this.layers.filter(layer => 
      layer.width >= minWidth && layer.width <= maxWidth &&
      layer.height >= minHeight && layer.height <= maxHeight
    );
  }

  // 컴포넌트/인스턴스만 추출
  getComponents() {
    return this.layers.filter(layer => 
      layer.type === 'component' || layer.type === 'instance'
    );
  }

  // 숨겨진 레이어 제외하고 가져오기
  getVisibleLayers() {
    return this.layers.filter(layer => layer.visible);
  }

  // 레이어 이미지 생성
  async generateLayerImages(fileKey, scale = 1, format = 'png') {
    try {
      if (this.layers.length === 0) {
        console.log('추출된 레이어가 없습니다.');
        return {};
      }

      // 처음 10개 레이어만 (API 제한 고려)
      const nodeIds = this.layers.slice(0, 10).map(layer => layer.id);
      console.log(`${nodeIds.length}개 레이어의 이미지를 생성하는 중...`);

      const imageUrls = await this.getImageUrls(fileKey, nodeIds, scale, format);
      
      // 레이어 정보와 이미지 URL 매핑
      const layersWithImages = this.layers.slice(0, 10).map(layer => ({
        ...layer,
        imageUrl: imageUrls[layer.id] || null
      }));

      return layersWithImages;

    } catch (error) {
      console.error('레이어 이미지 생성 실패:', error.message);
      return {};
    }
  }

  // 상세 분석 리포트 생성
  generateAnalysisReport() {
    const report = {
      summary: {
        totalLayers: this.layers.length,
        visibleLayers: this.getVisibleLayers().length,
        hiddenLayers: this.layers.length - this.getVisibleLayers().length
      },
      layerTypes: {},
      textLayers: this.getLayersByType('text').length,
      components: this.getComponents().length,
      largestLayer: null,
      smallestLayer: null,
      averageSize: { width: 0, height: 0 }
    };

    // 레이어 타입별 개수
    this.layers.forEach(layer => {
      const type = layer.type;
      report.layerTypes[type] = (report.layerTypes[type] || 0) + 1;
    });

    // 크기 분석
    const visibleLayers = this.getVisibleLayers().filter(layer => layer.width > 0 && layer.height > 0);
    
    if (visibleLayers.length > 0) {
      // 가장 큰/작은 레이어
      report.largestLayer = visibleLayers.reduce((max, layer) => 
        (layer.width * layer.height) > (max.width * max.height) ? layer : max
      );
      
      report.smallestLayer = visibleLayers.reduce((min, layer) => 
        (layer.width * layer.height) < (min.width * min.height) ? layer : min
      );

      // 평균 크기
      const totalWidth = visibleLayers.reduce((sum, layer) => sum + layer.width, 0);
      const totalHeight = visibleLayers.reduce((sum, layer) => sum + layer.height, 0);
      
      report.averageSize.width = Math.round(totalWidth / visibleLayers.length);
      report.averageSize.height = Math.round(totalHeight / visibleLayers.length);
    }

    return report;
  }

  // 상세 리포트를 마크다운으로 내보내기
  exportDetailedReport(filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    const report = this.generateAnalysisReport();
    
    let markdown = '# 피그마 디자인 분석 리포트\n\n';
    
    markdown += `**생성 일시:** ${new Date().toISOString()}\n`;
    markdown += `**총 레이어 수:** ${report.summary.totalLayers}개\n`;
    markdown += `**표시된 레이어:** ${report.summary.visibleLayers}개\n`;
    markdown += `**숨겨진 레이어:** ${report.summary.hiddenLayers}개\n\n`;

    // 레이어 타입 분석
    markdown += '## 레이어 타입 분석\n\n';
    markdown += '| 타입 | 개수 | 비율 |\n';
    markdown += '|------|------|------|\n';
    
    Object.entries(report.layerTypes).forEach(([type, count]) => {
      const percentage = ((count / report.summary.totalLayers) * 100).toFixed(1);
      markdown += `| ${type} | ${count}개 | ${percentage}% |\n`;
    });

    // 크기 분석
    if (report.largestLayer && report.smallestLayer) {
      markdown += '\n## 크기 분석\n\n';
      markdown += `**평균 크기:** ${report.averageSize.width} × ${report.averageSize.height}px\n`;
      markdown += `**가장 큰 레이어:** ${report.largestLayer.name} (${report.largestLayer.width} × ${report.largestLayer.height}px)\n`;
      markdown += `**가장 작은 레이어:** ${report.smallestLayer.name} (${report.smallestLayer.width} × ${report.smallestLayer.height}px)\n\n`;
    }

    // 텍스트 레이어 분석
    const textLayers = this.getLayersByType('text');
    if (textLayers.length > 0) {
      markdown += '## 텍스트 레이어 분석\n\n';
      markdown += `**총 텍스트 레이어:** ${textLayers.length}개\n\n`;
      
      markdown += '| 텍스트 내용 | 폰트 | 크기 | 링크 |\n';
      markdown += '|-------------|------|------|------|\n';
      
      textLayers.slice(0, 20).forEach(layer => { // 최대 20개만
        const text = layer.text ? layer.text.substring(0, 50) : '';
        const font = layer.fontFamily || '알 수 없음';
        const size = layer.fontSize || '알 수 없음';
        markdown += `| ${text} | ${font} | ${size} | [보기](${layer.directLink}) |\n`;
      });
    }

    // 컴포넌트 분석
    const components = this.getComponents();
    if (components.length > 0) {
      markdown += '\n## 컴포넌트 분석\n\n';
      markdown += `**총 컴포넌트/인스턴스:** ${components.length}개\n\n`;
      
      markdown += '| 이름 | 타입 | 크기 | 링크 |\n';
      markdown += '|------|------|------|------|\n';
      
      components.slice(0, 15).forEach(component => {
        markdown += `| ${component.name} | ${component.type} | ${component.width} × ${component.height} | [보기](${component.directLink}) |\n`;
      });
    }

    const reportFilename = filename || `figma-analysis-report-${timestamp}.md`;
    require('fs').writeFileSync(reportFilename, markdown);
    console.log(`상세 분석 리포트가 ${reportFilename}에 저장되었습니다.`);
  }
}

// 사용 예제 함수들
async function extractWithAPI(figmaUrl, accessToken) {
  const extractor = new FigmaAPIExtractor(accessToken);
  
  try {
    console.log('=== Figma API 기반 레이어 추출 시작 ===\n');
    console.log(`URL: ${figmaUrl}\n`);
    
    // 레이어 정보 추출
    const result = await extractor.extractLayersFromUrl(figmaUrl);
    
    console.log('\n=== 추출 완료 ===');
    console.log(`파일명: ${result.fileName || '알 수 없음'}`);
    console.log(`파일 키: ${result.fileKey}`);
    console.log(`총 레이어 수: ${result.totalLayers}개`);
    
    // 타입별 분석
    const textLayers = extractor.getLayersByType('text');
    const components = extractor.getComponents();
    const visibleLayers = extractor.getVisibleLayers();
    
    console.log(`텍스트 레이어: ${textLayers.length}개`);
    console.log(`컴포넌트/인스턴스: ${components.length}개`);
    console.log(`표시된 레이어: ${visibleLayers.length}개`);
    
    // 결과 파일 생성
    console.log('\n=== 결과 파일 생성 중 ===');
    extractor.exportResults('json');
    extractor.exportResults('csv');
    extractor.exportResults('html');
    extractor.exportDetailedReport();
    
    return result;
    
  } catch (error) {
    console.error('추출 실패:', error.message);
    console.log('\n문제 해결 방법:');
    console.log('1. Figma API 토큰이 올바른지 확인');
    console.log('2. 파일에 대한 접근 권한이 있는지 확인');
    console.log('3. URL이 올바른 형식인지 확인');
    console.log('4. 네트워크 연결 상태 확인');
    throw error;
  }
}

// CLI 인터페이스
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Figma API 기반 레이어 추출 도구');
    console.log('');
    console.log('사용법:');
    console.log('  node figma-api-example.js <피그마_URL> [API_토큰]');
    console.log('  node figma-api-example.js <피그마_URL> --token <API_토큰>');
    console.log('');
    console.log('환경변수:');
    console.log('  FIGMA_ACCESS_TOKEN: Figma API 토큰');
    console.log('');
    console.log('예제:');
    console.log('  node figma-api-example.js "https://www.figma.com/design/abc123/My-Design"');
    console.log('  node figma-api-example.js "https://www.figma.com/design/abc123/My-Design" --token figd_abc123');
    console.log('');
    console.log('API 토큰 생성 방법:');
    console.log('  1. https://www.figma.com/developers/api 방문');
    console.log('  2. "Get personal access token" 클릭');
    console.log('  3. 토큰 생성 후 복사');
    return;
  }
  
  const figmaUrl = args[0];
  let accessToken = null;
  
  // 토큰 파라미터 확인
  const tokenIndex = args.indexOf('--token');
  if (tokenIndex !== -1 && args[tokenIndex + 1]) {
    accessToken = args[tokenIndex + 1];
  } else if (args[1] && !args[1].startsWith('--')) {
    accessToken = args[1];
  }
  
  try {
    await extractWithAPI(figmaUrl, accessToken);
    console.log('\n✅ 작업이 완료되었습니다!');
    
  } catch (error) {
    console.error('\n❌ 작업 실패:', error.message);
    process.exit(1);
  }
}

// 내보내기
module.exports = {
  FigmaAPIExtractor,
  extractWithAPI
};

// 직접 실행 시
if (require.main === module) {
  main().catch(console.error);
}