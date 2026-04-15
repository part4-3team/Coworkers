[!IMPORTANT]
* **충분한 근거** 없이 단정 금지: "알 수 없음/확실하지 않음"을 명시.
* 정보는 단계적으로 검증, 확실한 내용만 결론에 사용.
* 추측이 불가피하면 **추측임을 명시**.
* 가능하면 **출처/근거**(공식 문서)를 첨부.
* 답변은 **한국어**, **ES6+** 기준.

### 1 가독성 (Readability)
* 함수는 단일 책임, 과도한 중첩(>2-3단계) 회피.

### 2 컴포넌트 구조
* **단일 책임 원칙**: 비대하면 UI/로직 분리, 작은 컴포넌트로 분해.

### 3 스타일링
* 기본적으로 **Tailwind** 사용. 인라인 스타일/다른 CSS-in-JS 혼용 지양.
* 공통 색상만 정의하고, 폰트 사이즈는 별도로 지정하지 않음.
* **모바일 퍼스트** 기준으로 작성.
* 브레이크포인트 기준:
  * `sm`: 640px (필요 시 사용)
  * `md`: 768px (태블릿)
  * `lg`: 1024px (데스크탑)
  * `xl`: 1280px (필요 시 사용)
  * `2xl`: 1536px (필요 시 사용)

### 4 재사용/가독성
* 반복되는 패턴은 **UI 컴포넌트로 승격**.

### 5 접근성 & SEO
* **의미 있는 alt** 필수(장식 이미지는 빈 alt).
* 시맨틱 태그/헤딩 계층/랜드마크(`main`, `nav`, `footer`) 준수.
* **ARIA 레이블**은 필요한 곳에만(중복/과용 금지).

### 6 네이밍 규칙

#### 디렉토리명
* 디렉토리는 `kebab-case` 사용.

#### 파일명
* 컴포넌트/페이지 `.tsx` 파일은 `PascalCase` 사용. 예시: `MainPage.tsx`, `TaskCard.tsx`
* 훅, 유틸, API, 일반 모듈 파일은 `camelCase.ts` 사용. 예시: `useAuth.ts`, `apiClient.ts`
* 아이콘 에셋은 `ic_` + snake_case 사용. 예시: `ic_arrow.svg`
* 이미지 에셋은 `img_` + snake_case 사용. 예시: `img_back.png`, `img_logo.png`
* 숫자 접두사는 두 자리로 통일. 예시: `01_feature.yml`, `02_bug.yml`

### 7 함수/변수 규칙
* 페이지 및 컴포넌트 함수는 `PascalCase`. 예시: `MainPage`, `MyDashBoardPage`
* 변수와 일반 함수명은 `camelCase`. 예시: `userData`, `fetchData`
* 이벤트 핸들러는 `handle + 동사` 형식을 사용. 예시: `handleClick`, `handleLoad`
* prop으로 내리는 이벤트 핸들러는 `on + 동사` 형식을 사용. 예시: `onClick`, `onLoad`

#### Boolean 변수
* 질문 형태의 접두사를 붙여 직관적으로 표현.
* `is + 명사/형용사`: `isLoading`, `isModalOpen`
* `has + 명사`: `hasToken`, `hasError`

### 8 상수 규칙
* 상수는 전체 `UPPER_SNAKE_CASE`를 사용.
* 예시: `API_BASE_URL`, `MAX_COUNT`

### 9 주석 가이드
* TSDoc은 `/** ... */` 형식을 사용.
* 파일 맨 위에 전체적인 설명을 TSDoc으로 작성.
* 공용 함수, 재사용 유틸, 복잡한 로직에는 TSDoc 작성을 권장.
* 나머지는 일반 주석(`// 내용`) 사용.
* 작업이 남은 부분은 `// TODO: 내용` 형식을 사용.
* **주석에 이모지 사용 금지.**
