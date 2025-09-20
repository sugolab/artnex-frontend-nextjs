class FigmaUrlExtractor {
  constructor(accessToken = null) {
    this.layers = [];
    this.accessToken = accessToken || process.env.FIGMA_ACCESS_TOKEN;
    this.apiBaseUrl = 'https://api.figma.com/v1';
  }

  // Figma API 토큰 설정
  setAccessToken(token) {
    this.accessToken = token;
  }

  // 피그마 URL에서 파일 키와 노드 ID 추출
  parseUrl(figmaUrl) {
    try {
      const url = new URL(figmaUrl);
      
      // URL 패턴: https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=NODE_ID
      // 또는: https://www.figma.com/file/FILE_KEY/FILE_NAME?node-id=NODE_ID
      
      const pathParts = url.pathname.split('/');
      let fileKey = null;
      
      // /design/ 또는 /file/ 패턴에서 파일 키 추출
      if (pathParts.includes('design') || pathParts.includes('file')) {
        const keyIndex = pathParts.findIndex(part => part === 'design' || part === 'file') + 1;
        fileKey = pathParts[keyIndex];
      }
      
      // node-id 파라미터에서 노드 ID 추출
      const nodeId = url.searchParams.get('node-id');
      
      return {
        fileKey,
        nodeId: nodeId ? nodeId.replace('%3A', ':') : null, // URL 디코딩
        originalUrl: figmaUrl
      };
    } catch (error) {
      console.error('URL 파싱 오류:', error);
      return null;
    }
  }

  // Figma API를 통해 파일 데이터 가져오기
  async fetchFileFromAPI(fileKey, nodeIds = []) {
    try {
      if (!this.accessToken) {
        throw new Error('Figma API 토큰이 필요합니다. setAccessToken() 또는 FIGMA_ACCESS_TOKEN 환경변수를 설정해주세요.');
      }

      console.log(`파일 ${fileKey}의 데이터를 Figma API에서 가져오는 중...`);
      
      let url = `${this.apiBaseUrl}/files/${fileKey}`;
      
      // 특정 노드들만 가져오기 (선택사항)
      if (nodeIds.length > 0) {
        url += `?ids=${nodeIds.join(',')}`;
      }

      const response = await fetch(url, {
        headers: {
          'X-Figma-Token': this.accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`Figma API 호출 실패: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Figma API에서 데이터를 성공적으로 가져왔습니다.');
      return data;
      
    } catch (error) {
      console.error('Figma API 호출 오류:', error);
      throw new Error(`Figma API 호출 실패: ${error.message}`);
    }
  }

  // 레이어 정보와 섹션 링크를 추출하는 메인 함수
  async extractLayersFromUrl(figmaUrl) {
    try {
      console.log('피그마 URL 분석 중:', figmaUrl);
      
      // 1. URL 파싱
      const urlInfo = this.parseUrl(figmaUrl);
      if (!urlInfo || !urlInfo.fileKey) {
        throw new Error('유효하지 않은 피그마 URL입니다.');
      }
      
      console.log('파일 키:', urlInfo.fileKey);
      console.log('노드 ID:', urlInfo.nodeId);
      
      // 2. Figma API에서 파일 데이터 가져오기
      const nodeIds = urlInfo.nodeId ? [urlInfo.nodeId] : [];
      const fileData = await this.fetchFileFromAPI(urlInfo.fileKey, nodeIds);
      
      // 3. API 응답 데이터를 파싱하여 레이어 정보 추출
      this.parseFileData(fileData, urlInfo.fileKey);
      
      // 4. 결과 반환
      return {
        url: figmaUrl,
        fileKey: urlInfo.fileKey,
        nodeId: urlInfo.nodeId,
        totalLayers: this.layers.length,
        layers: this.layers
      };
      
    } catch (error) {
      console.error('레이어 추출 오류:', error);
      throw error;
    }
  }

  // Figma API 파일 데이터 파싱
  parseFileData(fileData, fileKey) {
    this.layers = []; // 초기화
    
    if (!fileData || !fileData.document) {
      throw new Error('유효하지 않은 Figma 파일 데이터입니다.');
    }

    console.log(`파일명: ${fileData.name}`);
    console.log(`페이지 수: ${fileData.document.children?.length || 0}`);

    // 모든 노드를 재귀적으로 탐색
    this.traverseNode(fileData.document, fileKey, '');
  }

  // 노드를 재귀적으로 탐색하여 레이어 정보 추출
  traverseNode(node, fileKey, parentPath = '') {
    if (!node) return;

    // 현재 노드의 레이어 정보 추출
    if (node.id && node.name) {
      const layer = {
        id: node.id,
        name: node.name,
        type: node.type?.toLowerCase() || 'unknown',
        x: node.absoluteBoundingBox?.x || 0,
        y: node.absoluteBoundingBox?.y || 0,
        width: node.absoluteBoundingBox?.width || 0,
        height: node.absoluteBoundingBox?.height || 0,
        path: parentPath ? `${parentPath} > ${node.name}` : node.name,
        sectionLink: this.generateSectionLink(fileKey, node.id),
        directLink: this.generateDirectLink(fileKey, node.id),
        visible: node.visible !== false,
        opacity: node.opacity || 1,
        fills: node.fills || [],
        strokes: node.strokes || []
      };

      // 텍스트 노드의 경우 추가 정보
      if (node.type === 'TEXT' && node.characters) {
        layer.text = node.characters;
        layer.fontSize = node.style?.fontSize;
        layer.fontFamily = node.style?.fontFamily;
      }

      this.layers.push(layer);
    }

    // 자식 노드들 재귀 탐색
    if (node.children && Array.isArray(node.children)) {
      const currentPath = node.name ? 
        (parentPath ? `${parentPath} > ${node.name}` : node.name) : 
        parentPath;
        
      node.children.forEach(child => {
        this.traverseNode(child, fileKey, currentPath);
      });
    }
  }

  // 이미지 URL 가져오기 (선택사항)
  async getImageUrls(fileKey, nodeIds, scale = 1, format = 'png') {
    try {
      if (!this.accessToken) {
        throw new Error('Figma API 토큰이 필요합니다.');
      }

      const url = `${this.apiBaseUrl}/images/${fileKey}?ids=${nodeIds.join(',')}&scale=${scale}&format=${format}`;
      
      const response = await fetch(url, {
        headers: {
          'X-Figma-Token': this.accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`이미지 URL 가져오기 실패: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.images;
      
    } catch (error) {
      console.error('이미지 URL 가져오기 오류:', error);
      return {};
    }
  }

  // 섹션 링크 생성
  generateSectionLink(fileKey, nodeId) {
    const encodedNodeId = nodeId.replace(':', '%3A');
    return `https://www.figma.com/design/${fileKey}?node-id=${encodedNodeId}`;
  }

  // 직접 링크 생성 (개별 레이어로 바로 이동)
  generateDirectLink(fileKey, nodeId) {
    const encodedNodeId = nodeId.replace(':', '%3A');
    return `https://www.figma.com/design/${fileKey}?node-id=${encodedNodeId}&mode=design`;
  }

  // 결과를 다양한 형태로 내보내기
  exportResults(format = 'json', filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format.toLowerCase()) {
      case 'json':
        this.exportToJSON(filename || `figma-layers-${timestamp}.json`);
        break;
      case 'csv':
        this.exportToCSV(filename || `figma-layers-${timestamp}.csv`);
        break;
      case 'markdown':
        this.exportToMarkdown(filename || `figma-layers-${timestamp}.md`);
        break;
      case 'html':
        this.exportToHTML(filename || `figma-layers-${timestamp}.html`);
        break;
      default:
        console.log('지원되는 형식: json, csv, markdown, html');
    }
  }

  exportToJSON(filename) {
    const data = {
      extractedAt: new Date().toISOString(),
      totalLayers: this.layers.length,
      layers: this.layers
    };

    require('fs').writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

  exportToCSV(filename) {
    const headers = ['ID', 'Name', 'Type', 'X', 'Y', 'Width', 'Height', 'Section Link', 'Direct Link'];
    const csvContent = [
      headers.join(','),
      ...this.layers.map(layer => [
        layer.id,
        `"${layer.name}"`,
        layer.type,
        layer.x,
        layer.y,
        layer.width,
        layer.height,
        `"${layer.sectionLink}"`,
        `"${layer.directLink}"`
      ].join(','))
    ].join('\n');

    require('fs').writeFileSync(filename, csvContent);
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

  exportToMarkdown(filename) {
    let markdown = '# 피그마 레이어 추출 결과\n\n';
    
    markdown += `**추출 일시:** ${new Date().toISOString()}\n`;
    markdown += `**총 레이어 수:** ${this.layers.length}\n\n`;
    
    markdown += '## 레이어 목록\n\n';
    markdown += '| 이름 | 타입 | 위치 (X, Y) | 크기 (W × H) | 섹션 링크 | 직접 링크 |\n';
    markdown += '|------|------|-------------|--------------|-----------|----------|\n';
    
    this.layers.forEach(layer => {
      markdown += `| ${layer.name} | ${layer.type} | (${layer.x}, ${layer.y}) | ${layer.width} × ${layer.height} | [링크](${layer.sectionLink}) | [보기](${layer.directLink}) |\n`;
    });

    require('fs').writeFileSync(filename, markdown);
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

  exportToHTML(filename) {
    const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>피그마 레이어 추출 결과</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .layer-link { color: #0066cc; text-decoration: none; }
        .layer-link:hover { text-decoration: underline; }
        .stats { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>피그마 레이어 추출 결과</h1>
    
    <div class="stats">
        <p><strong>추출 일시:</strong> ${new Date().toISOString()}</p>
        <p><strong>총 레이어 수:</strong> ${this.layers.length}개</p>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>이름</th>
                <th>타입</th>
                <th>위치 (X, Y)</th>
                <th>크기 (W × H)</th>
                <th>링크</th>
            </tr>
        </thead>
        <tbody>
            ${this.layers.map(layer => `
            <tr>
                <td>${layer.name}</td>
                <td>${layer.type}</td>
                <td>(${layer.x}, ${layer.y})</td>
                <td>${layer.width} × ${layer.height}</td>
                <td>
                    <a href="${layer.sectionLink}" class="layer-link" target="_blank">섹션 보기</a> |
                    <a href="${layer.directLink}" class="layer-link" target="_blank">직접 이동</a>
                </td>
            </tr>
            `).join('')}
        </tbody>
    </table>
</body>
</html>`;

    require('fs').writeFileSync(filename, html);
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

  // 시뮬레이션용 목 데이터 (API 응답 형태)
  getMockFileData(nodeId) {
    return {
      name: "Test Design",
      document: {
        id: "0:0",
        name: "Document",
        type: "DOCUMENT",
        children: [
          {
            id: "0:1",
            name: "Page 1",
            type: "CANVAS",
            children: [
              {
                id: "2:4651",
                name: "Join_00",
                type: "FRAME",
                absoluteBoundingBox: { x: 0, y: 7331, width: 1920, height: 1080 },
                children: [
                  {
                    id: "2:4652",
                    name: "Footer",
                    type: "INSTANCE",
                    absoluteBoundingBox: { x: 0, y: 990, width: 1920, height: 90 }
                  },
                  {
                    id: "2:4653",
                    name: "GNB",
                    type: "INSTANCE",
                    absoluteBoundingBox: { x: 0, y: 0, width: 1920, height: 90 }
                  },
                  {
                    id: "2:4668",
                    name: "Building your AI Manager",
                    type: "TEXT",
                    characters: "Building your AI Manager",
                    absoluteBoundingBox: { x: 795, y: 358, width: 330, height: 116 },
                    style: { fontSize: 32, fontFamily: "Inter" }
                  },
                  {
                    id: "2:4669",
                    name: "브랜드 매니징을 위해 정보를 수집합니다.",
                    type: "TEXT",
                    characters: "브랜드 매니징을 위해 정보를 수집합니다. 누구나 쉽게 멋진 브랜딩을 할 수 있습니다.",
                    absoluteBoundingBox: { x: 787, y: 494, width: 346, height: 58 },
                    style: { fontSize: 16, fontFamily: "Inter" }
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }

  // 결과 요약 출력
  printSummary() {
    console.log('\n=== 피그마 레이어 추출 결과 ===');
    console.log(`총 레이어 수: ${this.layers.length}`);
    
    const typeCount = {};
    this.layers.forEach(layer => {
      typeCount[layer.type] = (typeCount[layer.type] || 0) + 1;
    });

    console.log('\n레이어 타입별 개수:');
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}개`);
    });

    console.log('\n레이어 목록:');
    this.layers.forEach((layer, index) => {
      console.log(`${index + 1}. ${layer.name} (${layer.type})`);
      console.log(`   섹션 링크: ${layer.sectionLink}`);
      console.log(`   직접 링크: ${layer.directLink}`);
    });
  }
}

module.exports = FigmaUrlExtractor;