# 팀 코드 리뷰 스타일 가이드

## 기술 스택
- 프레임워크: Next.js
- 언어: TypeScript
- CSS: Tailwind CSS
- API: fetch (axios 사용 금지 - 보안 이슈)
- 서버 상태 관리: TanStack Query
- 폼 관리: React Hook Form + Zod
- 인증: NextAuth.js

## TypeScript
- any 타입 사용 금지
- API 응답 데이터는 반드시 Zod 스키마로 런타임 검증
- z.infer<typeof Schema>로 타입 추출, 중복 타입 선언 금지

## 데이터 패칭
- 서버 상태는 TanStack Query의 useQuery / useMutation 사용
- fetch 직접 사용 금지, queryFn 내부에서만 사용
- queryKey 네이밍 규칙 유지 (예: ['resource', id])
- 성공 후 관련 캐시는 invalidateQueries로 무효화

## 폼
- 모든 폼은 React Hook Form 사용 (useState로 폼 상태 관리 금지)
- 검증 로직은 반드시 Zod 스키마로 분리하고 zodResolver로 연결

## CSS
- 스타일링은 Tailwind CSS만 사용
- 인라인 style 속성 사용 금지

## 공통
- 변수 선언은 const 우선 사용
- 커스텀 훅은 use 접두사 필수
- 컴포넌트는 default export, 유틸 함수는 named export 사용
- 조건부 렌더링 시 && 대신 삼항 연산자 권장 (0 렌더링 방지)
