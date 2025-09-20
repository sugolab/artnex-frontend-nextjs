# Figma API 기반 레이어 추출기

Figma API(`https://api.figma.com`)를 사용하여 피그마 파일의 모든 레이어 정보와 섹션 링크를 추출하는 도구입니다.

## 특징

✅ **Figma API 직접 연동** - MCP 서버 없이 독립적으로 작동  
✅ **URL 기반 추출** - 피그마 URL만 입력하면 자동으로 레이어 정보 추출  
✅ **상세한 레이어 정보** - 위치, 크기, 타입, 텍스트 내용, 스타일 등  
✅ **정확한 섹션 링크** - 각 레이어의 피그마 링크 생성  
✅ **고급 필터링** - 타입별, 크기별, 텍스트별 필터링 지원  
✅ **분석 리포트** - 디자인 구조 분석 및 통계  
✅ **다양한 내보내기** - JSON, CSV, HTML, Markdown 형태  

## 설치

```bash
npm install xml2js
```

## API 토큰 설정

1. [Figma Developers](https://www.figma.com/developers/api) 페이지 방문
2. "Get personal access token" 클릭
3. 토큰 생성 후 복사
4. 환경변수 설정:

```bash
export FIGMA_ACCESS_TOKEN="figd_your_token_here"
```

또는 직접 코드에서 설정:

```javascript
const extractor = new FigmaAPIExtractor('figd_your_token_here');
```

## 사용법

### CLI로 실행

```bash
# 환경변수 토큰 사용
npm run extract-api "https://www.figma.com/design/FILE_KEY/Design-Name"

# 토큰 직접 입력
npm run extract-api "https://www.figma.com/design/FILE_KEY/Design-Name" --token figd_your_token

# 직접 실행
node figma-api-example.js "YOUR_FIGMA_URL" "YOUR_API_TOKEN"
```

### 프로그래밍 방식

```javascript
const { FigmaAPIExtractor } = require('./figma-api-example');

async function extractLayers() {
  const extractor = new FigmaAPIExtractor('your_api_token');
  
  // 기본 추출
  const result = await extractor.extractLayersFromUrl(
    'https://www.figma.com/design/FILE_KEY/Design-Name'
  );
  
  console.log(`총 ${result.totalLayers}개의 레이어 추출 완료`);
  
  // 타입별 필터링
  const textLayers = extractor.getLayersByType('text');
  const components = extractor.getComponents();
  
  // 크기별 필터링
  const largeElements = extractor.getLayersBySize(100, 100);
  
  // 텍스트 검색
  const searchResults = extractor.searchByText('button');
  
  // 결과 내보내기
  extractor.exportResults('json');
  extractor.exportDetailedReport();
}
```

## 지원되는 URL 형식

```
https://www.figma.com/design/FILE_KEY/Design-Name
https://www.figma.com/design/FILE_KEY/Design-Name?node-id=1-2
https://www.figma.com/file/FILE_KEY/Design-Name
https://www.figma.com/file/FILE_KEY/Design-Name?node-id=1-2
```

## 추출되는 레이어 정보

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
  sectionLink: "https://www.figma.com/design/FILE_KEY?node-id=2%3A4652",
  directLink: "https://www.figma.com/design/FILE_KEY?node-id=2%3A4652&mode=design",
  visible: true,
  opacity: 1,
  fills: [...],
  strokes: [...],
  // 텍스트 레이어의 경우 추가 정보
  text: "Button Text",
  fontSize: 16,
  fontFamily: "Inter"
}
```

## 고급 기능

### 레이어 필터링

```javascript
// 타입별 필터링
const frames = extractor.getLayersByType('frame');
const texts = extractor.getLayersByType('text');
const instances = extractor.getLayersByType('instance');

// 크기별 필터링 (최소 100x100, 최대 500x500)
const mediumSized = extractor.getLayersBySize(100, 100, 500, 500);

// 텍스트 내용으로 검색
const buttons = extractor.searchByText('button');
const headings = extractor.searchByText('heading');

// 컴포넌트/인스턴스만 추출
const components = extractor.getComponents();

// 표시된 레이어만 추출
const visibleLayers = extractor.getVisibleLayers();
```

### 분석 리포트

```javascript
// 상세 분석 리포트 생성
const report = extractor.generateAnalysisReport();

console.log(`총 레이어: ${report.summary.totalLayers}개`);
console.log(`텍스트 레이어: ${report.textLayers}개`);
console.log(`컴포넌트: ${report.components}개`);
console.log(`평균 크기: ${report.averageSize.width} × ${report.averageSize.height}px`);

// 마크다운 리포트 생성
extractor.exportDetailedReport('design-analysis.md');
```

### 레이어 이미지 생성

```javascript
// 레이어 이미지 URL 생성 (PNG, 1x 스케일)
const layersWithImages = await extractor.generateLayerImages(fileKey, 1, 'png');

layersWithImages.forEach(layer => {
  if (layer.imageUrl) {
    console.log(`${layer.name}: ${layer.imageUrl}`);
  }
});
```

## 출력 파일

실행 후 다음 파일들이 생성됩니다:

- `figma-layers-YYYY-MM-DD.json` - 전체 레이어 데이터
- `figma-layers-YYYY-MM-DD.csv` - 스프레드시트용 데이터
- `figma-layers-YYYY-MM-DD.html` - 웹 뷰어
- `figma-analysis-report-YYYY-MM-DD.md` - 상세 분석 리포트

## API 제한사항

- **Rate Limiting**: 분당 최대 50회 요청
- **파일 접근**: 토큰 소유자가 접근 가능한 파일만
- **이미지 생성**: 한 번에 최대 100개 노드
- **응답 크기**: 대용량 파일의 경우 특정 노드만 요청 권장

## 문제 해결

### 인증 오류
```
Error: Figma API 호출 실패: 401 Unauthorized
```
- API 토큰이 올바른지 확인
- 토큰이 만료되지 않았는지 확인

### 접근 권한 오류
```
Error: Figma API 호출 실패: 403 Forbidden
```
- 파일에 대한 접근 권한이 있는지 확인
- 파일이 공개되어 있거나 팀에 소속되어 있는지 확인

### 파일 없음 오류
```
Error: Figma API 호출 실패: 404 Not Found
```
- URL의 파일 키가 올바른지 확인
- 파일이 삭제되지 않았는지 확인

## 예제

### 기본 사용

```bash
node figma-api-example.js "https://www.figma.com/design/abc123/My-Design" "figd_token123"
```

### 환경변수 사용

```bash
export FIGMA_ACCESS_TOKEN="figd_token123"
npm run extract-api "https://www.figma.com/design/abc123/My-Design"
```

### 특정 컴포넌트만 분석

```javascript
const { FigmaAPIExtractor } = require('./figma-api-example');

async function analyzeComponents() {
  const extractor = new FigmaAPIExtractor(process.env.FIGMA_ACCESS_TOKEN);
  
  await extractor.extractLayersFromUrl('YOUR_FIGMA_URL');
  
  const components = extractor.getComponents();
  console.log(`총 ${components.length}개의 컴포넌트 발견:`);
  
  components.forEach(comp => {
    console.log(`- ${comp.name} (${comp.width}×${comp.height})`);
  });
}
```