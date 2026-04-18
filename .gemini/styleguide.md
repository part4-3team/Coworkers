[!IMPORTANT]

- 충분한 근거 없이 단정하지 않는다. 확실하지 않으면 "알 수 없음/확실하지 않음"이라고 쓴다.
- 정보는 단계적으로 확인하고, 확실한 내용만 결론에 사용한다.
- 답변은 한국어, 코드는 ES6+ 기준으로 작성한다.

## 리뷰 기준

### 1. 프로젝트 구조

- 현재 폴더 구조의 기준 문서는 `AGENTS.md`다.
- `src/components` 아래는 현재 `common/`, `layout/`만 둔다.
- `auth/`, `board/`, `landing/`, `task/`, `team/` 같은 기능별 컴포넌트 폴더는 담당자가 실제 구현할 때 추가한다.
- 공통 UI는 `src/components/common`에 둔다.
- 레이아웃 UI는 `src/components/layout`에 둔다.
- 사이드바처럼 파일이 많아지는 컴포넌트는 아래 구조를 따른다.

```text
sidebar/
├─ index.tsx
├─ Sidebar.tsx
├─ components/
├─ hooks/
├─ constants.ts
└─ types.ts
```

### 2. import

- 상대경로 import는 사용하지 않는다.
- 절대경로 별칭 `@/`를 사용한다.
- 예외: 프레임워크나 외부 패키지 CSS가 특정 import 방식을 요구하는 경우만 허용한다.
- 현재 전역 CSS는 `src/app/layout.tsx`에서 `@/styles/globals.css`로 가져온다.

### 3. TypeScript

- 기본적으로 `interface` 대신 `type`을 사용한다.
- 컴포넌트 props, API 요청/응답, 도메인 모델 모두 `type`으로 작성한다.
- 선언 병합처럼 `interface`가 꼭 필요한 경우에는 팀 합의 후 사용한다.

```ts
// 사용 금지
interface ButtonProps {
  label: string;
}

// 사용
type ButtonProps = {
  label: string;
};
```

### 4. Tailwind

- 기본 스타일링은 Tailwind를 사용한다.
- 인라인 스타일과 CSS-in-JS 혼용은 지양한다.
- 조건부 className은 `@/utils/cn`의 `cn` 유틸을 사용한다.
- `clsx`, `tailwind-merge`를 컴포넌트에서 직접 import하지 않는다.
- Tailwind 임의값 `[]` 사용은 지양하고 기본 scale을 우선한다.
- 소수점 scale 값은 허용한다. 예: `px-3.75`, `w-67.5`
- 임의값 지양은 무조건 CSS 변수나 토큰으로 분리하라는 의미가 아니다.
- 모바일 퍼스트 기준으로 작성한다.

### 5. 네이밍

- 디렉토리명은 kebab-case를 사용한다.
- App Router 라우트 세그먼트는 기획서 URL을 우선한다. 예: `addteam`, `myhistory`, `tasklist`
- 컴포넌트 `.tsx` 파일은 PascalCase를 사용한다.
- App Router 특수 파일은 `page.tsx`, `layout.tsx`, `route.ts`를 사용한다.
- 훅, 유틸, API, 일반 모듈 파일은 camelCase를 사용한다.
- 아이콘은 `ic_` + snake_case를 사용한다.
- 이미지는 `img_` + snake_case를 사용한다.
- 로고는 `img_logo_` + snake_case를 사용한다.

### 6. 함수와 변수

- 함수는 단일 책임으로 작성한다.
- 과도한 중첩은 피하고 2-3단계 이하를 권장한다.
- 이벤트 핸들러는 `handle + 동사` 형식을 사용한다.
- prop 이벤트는 `on + 동사` 형식을 사용한다.
- Boolean 값은 `is`, `has` 접두사를 사용한다.
- 상수는 `UPPER_SNAKE_CASE`를 사용한다.

### 7. 접근성

- 의미 있는 이미지는 구체적인 `alt`를 작성한다.
- 장식 이미지는 `alt=""`를 사용한다.
- `main`, `nav`, `footer` 등 시맨틱 태그와 헤딩 계층을 지킨다.
- ARIA 레이블은 필요한 곳에만 사용한다.

### 8. API와 폼

- API 연결은 UI 구현 후 필요한 화면부터 진행한다.
- API 함수는 `src/api` 하위에 도메인별로 분리한다.
- 폼은 React Hook Form과 Zod 조합을 우선 사용한다.
- 날짜 선택 UI는 `react-datepicker`를 직접 import하지 않고 공용 `DatePicker`를 통해 사용한다.

### 9. 주석

- 파일 상단 설명은 필요한 경우 TSDoc(`/** ... */`)으로 작성한다.
- 복잡한 공용 함수나 유틸에는 TSDoc을 권장한다.
- 작업 예정 내용은 `// TODO: 내용` 형식을 사용한다.
- 주석에는 이모지를 넣지 않는다.
