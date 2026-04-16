<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Coworkers Project Guide

## 프로젝트 기술 스택

- 프레임워크: Next.js
  - 마지막 프로젝트인 만큼 더 세밀하고 규칙적인 프레임워크를 사용해 코드 구조와 퀄리티를 높인다.
- 언어: TypeScript
  - 프로젝트 구조가 복잡하므로 사전에 방지 가능한 오류를 줄이고 코드 품질을 높인다.
- CSS: Tailwind
  - 기존 CSS Module 대신 Tailwind를 사용해 새로운 스타일링 방식을 익히고 작업 속도를 높인다.
  - Tailwind에는 공통 색상 위주로 정의하고, 폰트 사이즈는 별도 커스텀 정의를 최소화한다.
- API: fetch
  - Axios 대신 fetch를 사용한다.
  - Swagger API는 UI 구현 후 필요한 화면부터 연결한다.
- 배포: Vercel
  - 프론트엔드 프로젝트를 빠르게 배포하기 위한 기본 배포 방식으로 사용한다.
- 포맷팅/품질 도구: ESLint, Prettier, Husky
  - 현재는 임시 세팅으로 사용한다.
- 주요 라이브러리:
  - TanStack Query: 서버 상태 관리, 캐싱, 로딩/에러 상태, 재요청 관리
  - Zod: 폼/API 데이터 검증과 TypeScript 타입 추론
  - React Hook Form: 폼 상태와 검증 흐름 관리
  - NextAuth.js: Next.js 앱 인증 기능 보조
  - clsx: 조건부 className 조합
  - tailwind-merge: Tailwind class 충돌 병합
  - Gitmoji: 커밋 메시지 가독성 향상

## 작업 원칙

- 답변과 코드 설명은 한국어로 작성한다.
- JavaScript/TypeScript 코드는 ES6+ 기준으로 작성한다.
- 충분한 근거 없이 단정하지 않는다.
- 확실하지 않은 내용은 "알 수 없음" 또는 "확실하지 않음"이라고 명시한다.
- 정보는 단계적으로 검증하고, 확실한 내용만 결론에 사용한다.
- 추측이 불가피하면 추측임을 명시한다.
- 가능하면 공식 문서나 프로젝트 내 근거를 확인하고 참고한다.
- 기술 스택에 없는 라이브러리나 도구는 임의로 추가하지 않는다.
- Swagger API는 백엔드 구현 대상이 아니라 프론트에서 호출할 외부 API로만 취급한다.
- API 연결은 fetch 기반 공통 래퍼를 우선 사용한다.
- 절대경로 별칭 `@/`를 사용하고 상대경로 import는 사용하지 않는다.
- Next.js 관련 코드를 작성하기 전에는 이 프로젝트에 설치된 Next.js 문서를 확인한다.

## 프로젝트 폴더 구조

- `public`: 외부 서비스가 URL로 직접 접근해야 하는 정적 파일과 공유 이미지
- `public/fonts`: 로컬 폰트 파일
- `src/api`: fetch 기반 API 함수와 공통 API 클라이언트
- `src/assets`: 코드에서 import해서 사용하는 아이콘, 이미지, 로고
- `src/app`: Next.js App Router 라우트
- `src/components/common`: 전역 공통 컴포넌트
- `src/components/layout`: 레이아웃 관련 컴포넌트
- `src/components/{feature}`: 기능별 컴포넌트
- `src/constants`: 공통 상수
- `src/contexts`: Toast, Modal 등 클라이언트 UI 전역 상태
- `src/hooks`: 커스텀 훅
- `src/styles`: 전역 스타일과 Tailwind v4 관련 CSS
- `src/types`: TypeScript 공통 타입
- `src/utils`: 공통 유틸리티와 공통 설정

## 코드 작성 원칙

- 함수는 단일 책임을 갖도록 작성한다.
- 과도한 중첩은 피하고, 중첩은 가급적 2-3단계 이하로 유지한다.
- 컴포넌트가 비대해지면 UI와 로직을 분리한다.
- 반복되는 UI 패턴은 재사용 가능한 컴포넌트로 승격한다.
- 복잡한 조건식과 데이터 가공은 읽기 쉬운 변수나 함수로 분리한다.

## 컴포넌트 구조

- 컴포넌트는 단일 책임 원칙을 따른다.
- 페이지 컴포넌트에는 페이지 조립과 데이터 흐름을 두고, 세부 UI는 작은 컴포넌트로 분리한다.
- 재사용 가능한 UI는 공용 컴포넌트로 분리한다.
- 폼 로직은 React Hook Form과 Zod 조합을 우선 사용한다.

## 스타일링 원칙

- 기본 스타일링은 Tailwind를 사용한다.
- 인라인 스타일과 다른 CSS-in-JS 혼용은 지양한다.
- 기본 본문 폰트는 Pretendard를 사용한다.
- 로고 텍스트 폰트는 Montserrat Alternates를 사용한다.
- 로고 텍스트에는 Tailwind 클래스 `font-logo`를 사용한다.
- Tailwind에는 공통 색상 위주로 정의하고, 폰트 사이즈는 별도 커스텀 정의를 최소화한다.
- Tailwind 임의값 문법인 `[]` 사용은 지양한다.
- 간격, 크기, 반경, 위치 등 수치가 필요한 스타일은 Tailwind 기본 scale 값을 우선 사용한다.
- 예: `w-[320px]`보다 `w-80`, `p-[16px]`보다 `p-4`, `gap-[12px]`보다 `gap-3`를 사용한다.
- Figma 수치와 완전히 일치하는 기본 scale이 없을 때만 임의값 사용을 검토한다.
- 조건부 className 조합은 `clsx`를 직접 쓰기보다 `@/utils/cn`의 `cn` 유틸을 사용한다.
- Tailwind class 충돌이 생길 수 있는 컴포넌트 props 병합도 `cn` 유틸을 사용한다.
- 모바일 퍼스트 기준으로 작성한다.
- 반응형 처리는 프로젝트 브레이크포인트 기준을 따른다.

## 접근성 및 SEO

- 의미 있는 이미지는 구체적인 `alt`를 작성한다.
- 장식 이미지는 빈 `alt=""`를 사용한다.
- 시맨틱 태그와 헤딩 계층을 지킨다.
- `main`, `nav`, `footer` 등 랜드마크를 적절히 사용한다.
- ARIA 레이블은 필요한 곳에만 사용하고 중복/과용하지 않는다.

## 커밋 컨벤션

커밋 제목 예시:

```text
🔧 Chore: eslint&prettier 설정 추가
```

사용 가능한 타입:

```text
🎉 Init      프로젝트 생성 (최초 1회)
✨ Feat      새로운 기능/페이지 추가
🐛 Fix       버그 수정
♻️ Refactor  코드 리팩토링
🔧 Chore     설정, 빌드, 패키지 설치, 아이콘, 이미지 파일 추가
🎨 Style     스타일/포맷팅 변경
📝 Docs      문서 관련 수정
🚚 Rename    파일/디렉토리명 변경, 파일 이동
🔥 Remove    코드/파일 삭제
```

커밋 본문 규칙:

- 제목과 본문은 빈 행으로 분리한다.
- 본문은 한 줄 최대 72자로 작성한다.
- 본문에는 무엇을 변경했고 왜 변경했는지 한글로 작성한다.
- 어떻게 구현했는지보다 변경 내용과 이유를 설명한다.

## 파일명 규칙

- 디렉토리명: kebab-case
  - 예: `task-list`, `auth-form`
- 컴포넌트/페이지 `.tsx`: PascalCase
  - 예: `MainPage.tsx`, `TaskCard.tsx`
- 일반 JS/TS 파일: camelCase
  - 예: `useAuth.ts`, `apiClient.ts`
- 아이콘 에셋: `ic_` + snake_case
  - 예: `ic_arrow.svg`
- 이미지 에셋: `img_` + snake_case
  - 예: `img_back.png`, `img_logo.png`
- 상수 파일: UPPER_SNAKE_CASE
  - 예: `ROUTES.ts`, `API_BASE_URL.ts`
- 숫자 접두사: 두 자리로 통일
  - 예: `01_feature.yml`, `02_bug.yml`

## 네이밍 규칙

- 페이지 컴포넌트: PascalCase + `Page`
  - 예: `MainPage`, `MyDashBoardPage`
- 일반 컴포넌트: PascalCase
  - 예: `TaskCard`, `Button`
- 변수/함수: camelCase
  - 예: `userData`, `fetchData`
- 이벤트 핸들러: `handle` + 동사
  - 예: `handleClick`, `handleLoad`
- 이벤트 핸들러 prop: `on` + 동사
  - 예: `onClick`, `onLoad`
- Boolean 값:
  - `is` + 명사/형용사: `isLoading`, `isModalOpen`
  - `has` + 명사: `hasToken`, `hasError`
- 상수: UPPER_SNAKE_CASE
  - 예: `API_BASE_URL`, `MAX_COUNT`

## 에셋 규칙

- 아이콘과 로고는 SVG를 사용한다.
- 단순 일러스트는 PNG를 사용한다.
- 투명 이미지, UI 요소, SVG로 애매한 이미지는 PNG를 사용한다.
- 이미지 용량이 클 경우 반드시 경량화한다.
- 이미지 import는 `index.js` 또는 `index.ts`에서 일괄 export한다.
- 이미지 사용 예:

```ts
import { imgLogo, icArrow } from "@/index";
```

## import 경로 규칙

상대경로 import는 사용하지 않는다.

```ts
// 사용 금지
import Button from "../../common/Button";
```

절대경로 별칭 `@/`를 사용한다.

```ts
// 사용
import Button from "@/components/common/Button";
```

예외:

- Next.js 전역 CSS처럼 프레임워크 관례상 같은 폴더에서 직접 연결하는 파일은 상대경로를 허용한다.
- 현재 전역 CSS는 `src/app/layout.tsx`에서 `import "@/styles/globals.css";`로 가져온다.

## 주석 규칙

- TSDoc은 `/** ... */` 형식으로 작성한다.
- 파일 맨 위에는 필요한 경우 TSDoc으로 전체 설명을 작성한다.
- 공용 함수, 재사용 유틸, 복잡한 로직에는 TSDoc 작성을 권장한다.
- 그 외에는 일반 주석을 사용한다.
- 작업이 남은 부분은 `// TODO: 내용` 형식으로 작성한다.
- 주석에는 이모지를 넣지 않는다.
- 불필요한 설명 주석은 작성하지 않는다.

## 반응형 브레이크포인트

모바일 퍼스트 기준으로 작성한다.

| prefix | 최소 너비 | 대상 |
| --- | --- | --- |
| `sm` | 640px | 필요 시 사용 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 데스크탑 |
| `xl` | 1280px | 필요 시 사용 |
| `2xl` | 1536px | 필요 시 사용 |
