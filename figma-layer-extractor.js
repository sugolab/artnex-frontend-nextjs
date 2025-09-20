const fs = require('fs');
const xml2js = require('xml2js');

class FigmaLayerExtractor {
  constructor() {
    this.layers = [];
    this.figmaFileKey = '';
  }

  setFigmaFileKey(fileKey) {
    this.figmaFileKey = fileKey;
  }

  parseMetadata(xmlString) {
    const parser = new xml2js.Parser();
    
    parser.parseString(xmlString, (err, result) => {
      if (err) {
        console.error('XML 파싱 오류:', err);
        return;
      }
      
      this.extractLayers(result);
    });
  }

  extractLayers(node, parentPath = '') {
    if (!node) return;

    const processNode = (item, currentPath) => {
      if (item.$) {
        const layer = {
          id: item.$.id,
          name: item.$.name,
          type: item.$.constructor?.name || 'unknown',
          x: parseInt(item.$.x) || 0,
          y: parseInt(item.$.y) || 0,
          width: parseInt(item.$.width) || 0,
          height: parseInt(item.$.height) || 0,
          path: currentPath,
          sectionLink: this.generateSectionLink(item.$.id, item.$.name)
        };

        this.layers.push(layer);
      }

      // 재귀적으로 하위 노드들을 처리
      Object.keys(item).forEach(key => {
        if (key !== '$' && Array.isArray(item[key])) {
          item[key].forEach((childItem, index) => {
            const childPath = currentPath ? `${currentPath} > ${item.$.name || key}` : (item.$.name || key);
            this.processNode(childItem, childPath);
          });
        }
      });
    };

    // 루트 노드부터 시작
    if (Array.isArray(node)) {
      node.forEach((item, index) => processNode(item, parentPath));
    } else {
      Object.keys(node).forEach(key => {
        if (Array.isArray(node[key])) {
          node[key].forEach((item, index) => {
            processNode(item, key);
          });
        }
      });
    }
  }

  generateSectionLink(nodeId, layerName) {
    if (!this.figmaFileKey || !nodeId) {
      return `#${layerName?.replace(/\s+/g, '-').toLowerCase()}`;
    }
    
    const encodedNodeId = nodeId.replace(':', '%3A');
    return `https://www.figma.com/file/${this.figmaFileKey}?node-id=${encodedNodeId}`;
  }

  getAllLayers() {
    return this.layers;
  }

  getLayersByType(type) {
    return this.layers.filter(layer => layer.type === type);
  }

  getLayersByName(namePattern) {
    const regex = new RegExp(namePattern, 'i');
    return this.layers.filter(layer => regex.test(layer.name));
  }

  exportToJSON(filename = 'figma-layers.json') {
    const data = {
      extractedAt: new Date().toISOString(),
      totalLayers: this.layers.length,
      figmaFileKey: this.figmaFileKey,
      layers: this.layers
    };

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

  exportToCSV(filename = 'figma-layers.csv') {
    if (this.layers.length === 0) {
      console.log('추출된 레이어가 없습니다.');
      return;
    }

    const headers = ['ID', 'Name', 'Type', 'X', 'Y', 'Width', 'Height', 'Path', 'Section Link'];
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
        `"${layer.path}"`,
        `"${layer.sectionLink}"`
      ].join(','))
    ].join('\n');

    fs.writeFileSync(filename, csvContent);
    console.log(`레이어 정보가 ${filename}에 저장되었습니다.`);
  }

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

    console.log('\n첫 10개 레이어:');
    this.layers.slice(0, 10).forEach((layer, index) => {
      console.log(`${index + 1}. ${layer.name} (${layer.type}) - ${layer.sectionLink}`);
    });
  }
}

module.exports = FigmaLayerExtractor;