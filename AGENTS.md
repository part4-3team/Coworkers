<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Coworkers Project Guide

## 핵심 원칙

- 답변과 코드 설명은 한국어로 작성한다.
- JavaScript/TypeScript 코드는 ES6+ 기준으로 작성한다.
- 충분한 근거 없이 단정하지 않는다. 확실하지 않으면 "알 수 없음" 또는 "확실하지 않음"이라고 쓴다.
- 기술 스택에 없는 라이브러리나 도구는 임의로 추가하지 않는다.
- Next.js 관련 코드를 작성하기 전에는 설치된 문서(`node_modules/next/dist/docs/`)를 확인한다.
- API는 백엔드 구현 대상이 아니라 Swagger 외부 API를 fetch로 호출하는 대상으로 취급한다.

## 기술 스택

- Next.js
- TypeScript
- Tailwind
- fetch
- Vercel
- ESLint, Prettier, Husky
- TanStack Query
- Zod
- React Hook Form
- NextAuth.js
- react-datepicker
- clsx, tailwind-merge
- Gitmoji

## 폴더 구조

현재 구조는 아래를 기준으로 한다. 기능별 개인 컴포넌트 폴더는 각 담당자가 구현 시점에 추가한다.

```text
public/
├─ favicon.ico
├─ fonts/
│  └─ PretendardVariable.woff2
└─ og-image.png

src/
├─ api/
│  ├─ apiClient.ts
│  ├─ authApi.ts
│  ├─ groupApi.ts
│  ├─ taskApi.ts
│  ├─ commentApi.ts
│  └─ boardApi.ts
│
├─ assets/
│  ├─ icons/
│  ├─ images/
│  ├─ logos/
│  └─ index.ts
│
├─ app/
│  ├─ layout.tsx
│  ├─ providers.tsx
│  ├─ api/auth/[...nextauth]/route.ts
│  ├─ (landing)/page.tsx
│  └─ (service)/
│     ├─ layout.tsx
│     ├─ login/page.tsx
│     ├─ signup/page.tsx
│     ├─ oauth/signup/[provider]/page.tsx
│     ├─ addteam/page.tsx
│     ├─ jointeam/page.tsx
│     ├─ myhistory/page.tsx
│     ├─ mypage/page.tsx
│     ├─ boards/page.tsx
│     ├─ boards/[articleId]/page.tsx
│     └─ [teamId]/
│        ├─ page.tsx
│        ├─ tasklist/page.tsx
│        └─ [taskId]/page.tsx
│
├─ components/
│  ├─ common/
│  │  ├─ logo/
│  │  ├─ avatar/
│  │  ├─ button/
│  │  ├─ form/
│  │  ├─ modal/
│  │  ├─ dropdown/
│  │  ├─ toast/
│  │  ├─ badge/
│  │  └─ todo/
│  └─ layout/
│     ├─ Header.tsx
│     └─ sidebar/
│        ├─ index.tsx
│        ├─ Sidebar.tsx
│        ├─ components/
│        ├─ hooks/
│        ├─ constants.ts
│        └─ types.ts
│
├─ constants/
├─ contexts/
├─ hooks/
├─ proxy.ts
├─ styles/
├─ types/
└─ utils/
```

## 컴포넌트 규칙

- 공통으로 2곳 이상 쓰일 UI만 `src/components/common`에 둔다.
- 페이지 전체 레이아웃 요소는 `src/components/layout`에 둔다.
- 기능별 개인 컴포넌트는 구현 담당자가 필요할 때 별도 폴더로 추가한다.
- 사이드바처럼 파일이 많아지는 컴포넌트는 `index.tsx`, 대표 컴포넌트, `components/`, `hooks/`, `constants.ts`, `types.ts` 구조를 사용한다.
- 날짜 선택 UI는 `react-datepicker`를 직접 쓰지 않고 공용 `DatePicker` 컴포넌트로 감싸서 사용한다.

## 코드 컨벤션

- 절대경로 별칭 `@/`를 사용하고 상대경로 import는 사용하지 않는다.
- 예외: 프레임워크나 외부 CSS가 요구하는 경우만 허용한다.
- 조건부 className은 `@/utils/cn`의 `cn` 유틸을 사용한다.
- TypeScript 타입은 기본적으로 `interface` 대신 `type`을 사용한다.
- 이벤트 핸들러는 `handle + 동사`, prop 이벤트는 `on + 동사`로 작성한다.
- Boolean 변수는 `is`, `has` 접두사를 사용한다.
- 상수는 `UPPER_SNAKE_CASE`를 사용한다.

## 스타일 규칙

- 기본 스타일링은 Tailwind를 사용한다.
- 인라인 스타일과 다른 CSS-in-JS 혼용은 지양한다.
- 기본 본문 폰트는 Pretendard를 사용한다.
- 로고 텍스트는 폰트가 아니라 SVG 에셋으로 사용한다.
- Tailwind 임의값 `[]` 사용은 지양하고 기본 scale을 우선한다.
- 소수점 scale 값은 사용할 수 있다. 예: `px-3.75`, `w-67.5`
- 임의값 지양은 무조건 토큰으로 분리하라는 의미가 아니다.
- 모바일 퍼스트 기준으로 작성한다.

## 네이밍 규칙

- 디렉토리명: kebab-case
- App Router 라우트 세그먼트: 기획서 URL 우선. 예: `addteam`, `myhistory`, `tasklist`
- 컴포넌트 `.tsx`: PascalCase
- App Router 특수 파일: `page.tsx`, `layout.tsx`, `route.ts`
- 훅, 유틸, API, 일반 모듈: camelCase
- 아이콘: `ic_` + snake_case
- 이미지: `img_` + snake_case
- 로고: `img_logo_` + snake_case

## 접근성 및 주석

- 의미 있는 이미지는 구체적인 `alt`를 작성한다.
- 장식 이미지는 `alt=""`를 사용한다.
- 시맨틱 태그와 헤딩 계층을 지킨다.
- 파일 상단 설명은 필요한 경우 TSDoc(`/** ... */`)으로 작성한다.
- 작업 예정 내용은 `// TODO: 내용` 형식을 사용한다.
- 주석에는 이모지를 넣지 않는다.

## 커밋 컨벤션

예시: `🔧 Chore: eslint&prettier 설정 추가`

- `🎉 Init`: 프로젝트 생성
- `✨ Feat`: 기능/페이지 추가
- `🐛 Fix`: 버그 수정
- `♻️ Refactor`: 리팩토링
- `🔧 Chore`: 설정, 빌드, 패키지, 에셋 추가
- `🎨 Style`: 스타일/포맷팅
- `📝 Docs`: 문서 수정
- `🚚 Rename`: 파일/디렉토리 이동 또는 이름 변경
- `🔥 Remove`: 코드/파일 삭제

커밋 본문은 제목과 빈 행으로 분리하고, 한 줄 72자 이내로 한글 작성한다.
