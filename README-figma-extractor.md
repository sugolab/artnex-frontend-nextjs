# 피그마 URL 기반 레이어 추출기

피그마 페이지 URL을 입력받아서 해당 페이지의 모든 레이어 정보와 섹션 링크를 추출하는 도구입니다.

## 기능

- 피그마 페이지의 모든 레이어 정보 추출 (ID, 이름, 타입, 위치, 크기)
- 각 레이어의 피그마 섹션 링크 자동 생성
- JSON, CSV, Markdown 형태로 결과 내보내기
- 레이어 타입별 필터링 및 검색

## 설치

```bash
npm install xml2js
```

## 사용법

### URL 기반 추출

```javascript
const { extractFromUrl } = require('./figma-url-example');

// 피그마 URL로 레이어 정보 추출
const result = await extractFromUrl('https://www.figma.com/design/FILE_KEY/Design-Name?node-id=1-2');

console.log(`총 ${result.totalLayers}개의 레이어가 추출되었습니다.`);
```

### CLI로 실행

```bash
# 기본 레이어 추출
npm run extract-url "https://www.figma.com/design/FILE_KEY/Design-Name"

# 특정 레이어들의 코드 생성
npm run extract-url "https://www.figma.com/design/FILE_KEY/Design-Name" --code Button Footer

# 직접 실행
node figma-url-example.js "YOUR_FIGMA_URL"
```

### 지원되는 URL 형식

```
https://www.figma.com/design/FILE_KEY/Design-Name
https://www.figma.com/design/FILE_KEY/Design-Name?node-id=1-2
https://www.figma.com/file/FILE_KEY/Design-Name
https://www.figma.com/file/FILE_KEY/Design-Name?node-id=1-2
```

### 결과 내보내기

```javascript
// JSON 형태로 내보내기
await extractor.exportResults('json');

// CSV 형태로 내보내기
await extractor.exportResults('csv');

// Markdown 형태로 내보내기
await extractor.exportResults('markdown');
```

## 출력 파일

- `figma-layers.json`: 전체 레이어 정보 (JSON 형태)
- `figma-layers.csv`: 스프레드시트용 CSV 파일
- `figma-layers.md`: 문서화용 마크다운 파일

## 레이어 정보 구조

각 레이어는 다음 정보를 포함합니다:

```javascript
{
  id: "2:4652",
  name: "Footer",
  type: "instance",
  x: 0,
  y: 990,
  width: 1920,
  height: 90,
  path: "Join_00 > Footer",
  sectionLink: "https://www.figma.com/file/YOUR_FILE_KEY?node-id=2%3A4652"
}
```

## 피그마 MCP 서버 연동

실제 피그마 MCP 서버와 연동하려면:

1. 피그마 데스크톱 앱이 실행되어야 합니다
2. MCP 서버가 올바르게 설정되어야 합니다
3. 피그마 파일이 열려있어야 합니다

### MCP 서버 함수 사용

```javascript
// 현재 페이지 메타데이터 가져오기
const metadata = await mcp__figma_dev_mode_mcp_server__get_metadata({
  clientFrameworks: "nextjs",
  clientLanguages: "javascript,typescript"
});

// 특정 노드의 코드 가져오기
const code = await mcp__figma_dev_mode_mcp_server__get_code({
  nodeId: "2:4652",
  dirForAssetWrites: "/path/to/assets",
  clientFrameworks: "nextjs",
  clientLanguages: "javascript,typescript"
});
```

## 필터링 및 검색

```javascript
// 텍스트 레이어만 필터링
const textLayers = layers.filter(layer => layer.type === 'text');

// 이름에 'button'이 포함된 레이어 검색
const buttonLayers = layers.filter(layer => 
  layer.name.toLowerCase().includes('button')
);

// 특정 위치 범위의 레이어 검색
const topLayers = layers.filter(layer => layer.y < 100);
```

## 주의사항

- 피그마 파일 키는 실제 사용 시 입력해야 합니다
- MCP 서버 연결이 필요한 경우 네트워크 상태를 확인하세요
- 대용량 파일의 경우 추출 시간이 오래 걸릴 수 있습니다