const FigmaUrlExtractor = require('./figma-url-extractor');

// 실제 MCP 서버와 연동하는 래퍼 클래스
class FigmaMCPUrlExtractor extends FigmaUrlExtractor {
  
  // 특정 노드의 상세 코드 가져오기
  async getNodeCode(nodeId, assetDir = './assets') {
    try {
      console.log(`노드 ${nodeId}의 코드 생성 중...`);
      
      // 실제 MCP 서버 호출
      const codeResult = await mcp__figma_dev_mode_mcp_server__get_code({
        nodeId: nodeId,
        dirForAssetWrites: assetDir,
        clientFrameworks: "nextjs",
        clientLanguages: "javascript,typescript"
      });
      
      console.log(`노드 ${nodeId}의 코드가 성공적으로 생성되었습니다.`);
      return codeResult;
      
    } catch (error) {
      console.error('코드 생성 실패:', error);
      throw new Error(`코드 생성 실패: ${error.message}`);
    }
  }

  // 피그마 스크린샷 가져오기
  async getScreenshot(nodeId = null) {
    try {
      console.log(`노드 ${nodeId || '현재 페이지'}의 스크린샷 생성 중...`);
      
      // 실제 MCP 서버 호출
      const screenshot = await mcp__figma_dev_mode_mcp_server__get_screenshot({
        nodeId: nodeId || '',
        clientFrameworks: "nextjs",
        clientLanguages: "javascript,typescript"
      });
      
      console.log('스크린샷이 성공적으로 생성되었습니다.');
      return screenshot;
      
    } catch (error) {
      console.error('스크린샷 생성 실패:', error);
      throw new Error(`스크린샷 생성 실패: ${error.message}`);
    }
  }

  // 변수 정의 가져오기
  async getVariables(nodeId = null) {
    try {
      console.log(`노드 ${nodeId || '현재 페이지'}의 변수 정의 가져오는 중...`);
      
      // 실제 MCP 서버 호출
      const variables = await mcp__figma_dev_mode_mcp_server__get_variable_defs({
        nodeId: nodeId || '',
        clientFrameworks: "nextjs",
        clientLanguages: "javascript,typescript"
      });
      
      console.log('변수 정의를 성공적으로 가져왔습니다.');
      return variables;
      
    } catch (error) {
      console.error('변수 정의 가져오기 실패:', error);
      throw new Error(`변수 정의 가져오기 실패: ${error.message}`);
    }
  }
}

// 사용 예제 함수들
async function extractFromUrl(figmaUrl) {
  const extractor = new FigmaMCPUrlExtractor();
  
  try {
    console.log('=== 피그마 URL 기반 레이어 추출 시작 ===\n');
    console.log(`URL: ${figmaUrl}\n`);
    
    // URL에서 레이어 정보 추출
    const result = await extractor.extractLayersFromUrl(figmaUrl);
    
    console.log('\n=== 추출 완료 ===');
    console.log(`파일 키: ${result.fileKey}`);
    console.log(`노드 ID: ${result.nodeId || '전체 페이지'}`);
    console.log(`총 레이어 수: ${result.totalLayers}개`);
    
    // 결과 요약 출력
    extractor.printSummary();
    
    // 다양한 형태로 내보내기
    console.log('\n=== 결과 파일 생성 중 ===');
    extractor.exportResults('json');
    extractor.exportResults('csv');
    extractor.exportResults('markdown');
    extractor.exportResults('html');
    
    return result;
    
  } catch (error) {
    console.error('추출 실패:', error.message);
    console.log('\n문제 해결 방법:');
    console.log('1. 피그마 데스크톱 앱이 실행되어 있는지 확인');
    console.log('2. MCP 서버가 올바르게 연결되어 있는지 확인');
    console.log('3. 피그마 파일이 열려있는지 확인');
    console.log('4. URL이 올바른 형식인지 확인');
    throw error;
  }
}

// 특정 레이어들의 코드 생성
async function generateCodeForLayers(figmaUrl, layerNames = []) {
  const extractor = new FigmaMCPUrlExtractor();
  
  try {
    console.log('=== 레이어 코드 생성 시작 ===\n');
    
    // 먼저 레이어 정보 추출
    const result = await extractor.extractLayersFromUrl(figmaUrl);
    
    // 지정된 이름의 레이어들 찾기
    const targetLayers = layerNames.length > 0 
      ? result.layers.filter(layer => 
          layerNames.some(name => layer.name.toLowerCase().includes(name.toLowerCase()))
        )
      : result.layers.slice(0, 5); // 처음 5개만 (전체는 너무 많을 수 있음)
    
    if (targetLayers.length === 0) {
      console.log(`지정된 레이어 이름 [${layerNames.join(', ')}]과 일치하는 레이어를 찾을 수 없습니다.`);
      console.log('\n사용 가능한 레이어:');
      result.layers.forEach((layer, index) => {
        console.log(`${index + 1}. ${layer.name} (${layer.type})`);
      });
      return [];
    }
    
    console.log(`\n=== ${targetLayers.length}개 레이어의 코드 생성 중 ===`);
    
    const codeResults = [];
    
    for (const layer of targetLayers) {
      try {
        console.log(`\n코드 생성 중: ${layer.name} (${layer.id})`);
        const code = await extractor.getNodeCode(layer.id, './generated-assets');
        
        codeResults.push({
          layer: layer,
          code: code,
          success: true
        });
        
        console.log(`✓ ${layer.name} 코드 생성 완료`);
        
      } catch (error) {
        console.error(`✗ ${layer.name} 코드 생성 실패:`, error.message);
        codeResults.push({
          layer: layer,
          code: null,
          success: false,
          error: error.message
        });
      }
    }
    
    // 결과를 파일로 저장
    const fs = require('fs');
    const timestamp = new Date().toISOString().split('T')[0];
    
    console.log('\n=== 코드 파일 저장 중 ===');
    
    codeResults.forEach((result) => {
      if (result.success && result.code) {
        const filename = `generated-code-${result.layer.name.replace(/[^a-zA-Z0-9]/g, '_')}-${timestamp}.js`;
        try {
          fs.writeFileSync(filename, result.code);
          console.log(`✓ 코드 저장됨: ${filename}`);
        } catch (writeError) {
          console.error(`✗ 파일 저장 실패 (${filename}):`, writeError.message);
        }
      }
    });
    
    // 요약 출력
    const successCount = codeResults.filter(r => r.success).length;
    const failCount = codeResults.filter(r => !r.success).length;
    
    console.log(`\n=== 코드 생성 완료 ===`);
    console.log(`성공: ${successCount}개`);
    console.log(`실패: ${failCount}개`);
    
    return codeResults;
    
  } catch (error) {
    console.error('코드 생성 실패:', error.message);
    throw error;
  }
}

// 스크린샷 생성
async function captureScreenshot(figmaUrl, nodeId = null) {
  const extractor = new FigmaMCPUrlExtractor();
  
  try {
    console.log('=== 스크린샷 생성 시작 ===\n');
    
    // URL 파싱해서 노드 ID 추출 (필요한 경우)
    if (!nodeId) {
      const urlInfo = extractor.parseUrl(figmaUrl);
      nodeId = urlInfo.nodeId;
    }
    
    const screenshot = await extractor.getScreenshot(nodeId);
    
    console.log('스크린샷이 성공적으로 생성되었습니다.');
    return screenshot;
    
  } catch (error) {
    console.error('스크린샷 생성 실패:', error.message);
    throw error;
  }
}

// CLI 인터페이스
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('피그마 URL 기반 레이어 추출 도구');
    console.log('');
    console.log('사용법:');
    console.log('  node figma-url-example.js <피그마_URL>');
    console.log('  node figma-url-example.js <피그마_URL> --code <레이어명1> <레이어명2>');
    console.log('  node figma-url-example.js <피그마_URL> --screenshot');
    console.log('');
    console.log('예제:');
    console.log('  node figma-url-example.js "https://www.figma.com/design/abc123/My-Design?node-id=1-2"');
    console.log('  node figma-url-example.js "https://www.figma.com/design/abc123/My-Design" --code Button Footer');
    console.log('  node figma-url-example.js "https://www.figma.com/design/abc123/My-Design" --screenshot');
    console.log('');
    console.log('지원되는 URL 형식:');
    console.log('  - https://www.figma.com/design/FILE_KEY/Design-Name');
    console.log('  - https://www.figma.com/design/FILE_KEY/Design-Name?node-id=1-2');
    console.log('  - https://www.figma.com/file/FILE_KEY/Design-Name');
    return;
  }
  
  const figmaUrl = args[0];
  const codeIndex = args.indexOf('--code');
  const screenshotFlag = args.includes('--screenshot');
  
  try {
    if (screenshotFlag) {
      // 스크린샷 모드
      await captureScreenshot(figmaUrl);
    } else if (codeIndex !== -1) {
      // 코드 생성 모드
      const layerNames = args.slice(codeIndex + 1).filter(arg => !arg.startsWith('--'));
      await generateCodeForLayers(figmaUrl, layerNames);
    } else {
      // 일반 추출 모드
      await extractFromUrl(figmaUrl);
    }
    
    console.log('\n작업이 완료되었습니다! 🎉');
    
  } catch (error) {
    console.error('\n❌ 작업 실패:', error.message);
    process.exit(1);
  }
}

// 내보내기
module.exports = {
  FigmaMCPUrlExtractor,
  extractFromUrl,
  generateCodeForLayers,
  captureScreenshot
};

// 직접 실행 시
if (require.main === module) {
  main().catch(console.error);
}