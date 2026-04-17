[!IMPORTANT]

- **충분한 근거** 없이 단정 금지: "알 수 없음/확실하지 않음"을 명시.
- 정보는 단계적으로 검증, 확실한 내용만 결론에 사용.
- 추측이 불가피하면 **추측임을 명시**.
- 가능하면 **출처/근거**(공식 문서)를 첨부.
- 답변은 **한국어**, **ES6+** 기준.

### 1 가독성 (Readability)

- 함수는 단일 책임, 과도한 중첩(>2-3단계) 회피.

### 2 컴포넌트 구조

- **단일 책임 원칙**: 비대하면 UI/로직 분리, 작은 컴포넌트로 분해.

### 3 스타일링

- 기본적으로 **Tailwind** 사용. 인라인 스타일/다른 CSS-in-JS 혼용 지양.
- 공통 색상만 정의하고, 폰트 사이즈는 별도로 지정하지 않음.
- Tailwind 임의값 `[]` 사용은 지양하고 기본 scale을 우선한다.
- 단, 이는 무조건 CSS 변수나 토큰으로 분리하라는 뜻이 아니다.
- 예: `p-[16px]` → `p-4`, `w-[320px]` → `w-80`, `270px` → `w-67.5`
- 기본 scale 값은 소수점 값도 허용한다.
- 조건부 className 조합은 `clsx`를 직접 쓰기보다 `@/utils/cn`의 `cn` 유틸 사용.
- Tailwind class 충돌 병합이 필요한 경우도 `cn` 유틸 사용.
- **모바일 퍼스트** 기준으로 작성.
- 브레이크포인트 기준:
  - `sm`: 640px (필요 시 사용)
  - `md`: 768px (태블릿)
  - `lg`: 1024px (데스크탑)
  - `xl`: 1280px (필요 시 사용)
  - `2xl`: 1536px (필요 시 사용)

### 4 재사용/가독성

- 반복되는 패턴은 **UI 컴포넌트로 승격**.
- 날짜 선택 UI는 `react-datepicker`를 직접 사용하지 않고 공용 `DatePicker` 컴포넌트를 통해 사용.

### 5 접근성 & SEO

- **의미 있는 alt** 필수(장식 이미지는 빈 alt).
- 시맨틱 태그/헤딩 계층/랜드마크(`main`, `nav`, `footer`) 준수.
- **ARIA 레이블**은 필요한 곳에만(중복/과용 금지).

### 6 네이밍 규칙

#### 디렉토리명

- 디렉토리는 `kebab-case` 사용.
- 단, Next.js App Router의 라우트 세그먼트(`app/` 하위 폴더)는 URL 경로와 동일하게 작성하며, kebab-case 변환 없이 기획서 경로 그대로 사용. 예시: `addteam/`, `myhistory/`, `[teamId]/`

#### 파일명

- 컴포넌트/페이지 `.tsx` 파일은 `PascalCase` 사용. 예시: `MainBanner.tsx`, `TaskCard.tsx`
- Next.js App Router 특수 파일은 프레임워크 규칙을 우선한다. 예시: `page.tsx`, `layout.tsx`, `route.ts`
- App Router 특수 파일 안의 실제 화면 컴포넌트는 필요하면 `PascalCase` 파일로 분리한다.
- 훅, 유틸, API, 일반 모듈 파일은 `camelCase.ts` 사용. 예시: `useAuth.ts`, `apiClient.ts`
- 아이콘 에셋은 `ic_` + snake_case 사용. 예시: `ic_arrow.svg`
- 이미지 에셋은 `img_` + snake_case 사용. 예시: `img_back.png`, `img_no_team.png`
- 서비스 로고도 `img_logo_` + snake_case를 사용. 예시: `img_logo_text_large.svg`
- 숫자 접두사는 두 자리로 통일. 예시: `01_feature.yml`, `02_bug.yml`

### 7 함수/변수 규칙

- 페이지 및 컴포넌트 함수는 `PascalCase`. 예시: `MainBanner`, `MyDashBoardPage`
- 변수와 일반 함수명은 `camelCase`. 예시: `userData`, `fetchData`
- 이벤트 핸들러는 `handle + 동사` 형식을 사용. 예시: `handleClick`, `handleLoad`
- prop으로 내리는 이벤트 핸들러는 `on + 동사` 형식을 사용. 예시: `onClick`, `onLoad`

#### Boolean 변수

- 질문 형태의 접두사를 붙여 직관적으로 표현.
- `is + 명사/형용사`: `isLoading`, `isModalOpen`
- `has + 명사`: `hasToken`, `hasError`

### 8 상수 규칙

- 상수는 전체 `UPPER_SNAKE_CASE`를 사용.
- 예시: `API_BASE_URL`, `MAX_COUNT`

### 9 주석 가이드

- TSDoc은 `/** ... */` 형식을 사용.
- 파일 맨 위에 전체적인 설명을 TSDoc으로 작성.
- 공용 함수, 재사용 유틸, 복잡한 로직에는 TSDoc 작성을 권장.
- 나머지는 일반 주석(`// 내용`) 사용.
- 작업이 남은 부분은 `// TODO: 내용` 형식을 사용.
- **주석에 이모지 사용 금지.**

### 10 프로젝트 폴더 구조

- 상세 폴더 구조는 `AGENTS.md`의 `프로젝트 폴더 구조` 섹션을 기준으로 한다.
- 아직 구현 전인 라우트와 컴포넌트 파일은 최소 placeholder로 생성한다.
- 세부 UI와 로직은 해당 기능 구현 시점에 채운다.
- `app/` 하위 라우트 폴더는 기획서 URL을 우선한다. 예: `addteam`, `jointeam`, `myhistory`, `mypage`, `tasklist`
- 공개 페이지를 새로 추가하면 `src/proxy.ts`의 인증 예외 경로도 함께 확인한다.
- `src/proxy.ts`는 Next.js Proxy 파일 컨벤션상 `src` 루트에 둔다.
- Proxy 세부 로직이 길어질 경우 별도 모듈로 분리하고 `src/proxy.ts`에서 import한다.

### 11 import 규칙

- 상대경로 import는 사용하지 않는다.
- 절대경로 별칭 `@/`를 사용한다. 예시: `import Button from "@/components/common/button/Button"`
- 예외: 프레임워크나 외부 패키지 CSS가 특정 import 방식을 요구하는 경우에만 팀 합의 후 허용한다.
- 현재 전역 CSS는 `src/app/layout.tsx`에서 `import "@/styles/globals.css"`로 가져온다.

### 12 유틸 사용 규칙

- `cn` 유틸은 `@/utils/cn`에 정의된 함수를 사용한다. (`clsx` + `tailwind-merge` 조합)
- `clsx` 또는 `tailwind-merge`를 컴포넌트에서 직접 import하지 않는다.
- 조건부 className, class 충돌 병합 모두 `cn`으로 통일한다.

```tsx
// 사용 금지
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// 사용
import { cn } from '@/utils/cn';

<div className={cn('px-4 py-2', isActive && 'bg-primary', className)} />;
```

### 13 API 연결 순서

- UI 작업을 먼저 완료한 뒤, 필요한 화면부터 순서대로 API를 연결한다.
- API 함수는 `src/api/` 하위에 도메인별로 분리하여 작성한다.
- 기술 스택에 없는 라이브러리는 팀원과 논의 후 추가한다.

### 14 달력 사용 규칙

- 달력 UI는 `react-datepicker`를 사용한다.
- 각 페이지에서 `react-datepicker`를 직접 import하지 않는다.
- 공용 `DatePicker` 컴포넌트에서 날짜 포맷, 기본 스타일, disabled, minDate, maxDate 정책을 관리한다.
- `react-datepicker/dist/react-datepicker.css`는 한 곳에서만 import한다.
- 라이브러리 내부 DOM 스타일 override가 필요하면 `src/styles` 하위 CSS에서 관리한다.
