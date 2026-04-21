# Hooks 폴더 구조 가이드

이 문서는 현재 프로젝트의 `src/hooks`를 어떤 기준으로 유지할지 정리한 문서입니다.

## 1. 핵심 원칙

현재 프로젝트에서 훅은 아래 두 종류로만 나눠서 생각하는 것이 가장 단순합니다.

1. `React Query` 기반 서버 상태 훅
2. 화면 전용 UI 상태 훅

이 기준으로 보면 전역 `src/hooks`에 모든 훅을 다 넣는 방식은 좋지 않습니다.

## 2. 권장 구조

```text
src/hooks/
├─ useAuth.ts
├─ useImage.ts
├─ useUser.ts
├─ useTeam.ts
├─ useTaskList.ts
├─ useTask.ts
├─ useRecurring.ts
├─ useBoard.ts
└─ useBoardComment.ts
```

그리고 화면 전용 훅은 각 라우트 폴더 아래 둡니다.

예:

```text
src/app/(landing)/hooks/useScrollReveal.ts
src/app/(service)/some-route/hooks/useSomething.ts
```

## 3. 왜 이렇게 정리하는가

현재 `src/hooks`에는 아래 성격이 섞여 있었습니다.

- 실제 React Query 훅
- 앞으로 만들 예정인 React Query 훅
- 아직 근거가 없는 공용 UI 훅 placeholder

이 상태는 아래 문제를 만들기 쉽습니다.

- 어떤 훅이 실제로 구현된 것인지 바로 구분하기 어렵다
- React Query 훅과 단순 UI 훅의 책임이 섞인다
- 팀원이 새 훅을 추가할 때 위치 기준이 모호하다

그래서 지금 단계에서는 `서버 상태 훅만 src/hooks 루트에 둔다`가 가장 안전합니다.

## 4. 유지할 훅

아래 훅들은 현재 `queryKeys`, `queryOptions`, `api` 구조와 1:1로 이어지는 도메인 훅이라 유지하는 것이 좋습니다.

- `useAuth`
- `useImage`
- `useUser`
- `useTeam`
- `useTaskList`
- `useTask`
- `useRecurring`
- `useBoard`
- `useBoardComment`

이 훅들은 아직 일부가 placeholder여도 방향성이 분명합니다.

## 5. 줄여도 되는 훅

현재 기준으로 아래 훅은 제거해도 됩니다.

- `useFormField`
- `useToast`

이유:

- 아직 실제 사용처가 없습니다.
- `React Hook Form`을 사용하는 프로젝트라면 공용 `useFormField`를 억지로 만들 필요가 크지 않습니다.
- `Toast`도 실제 Context나 Provider가 없는 상태에서 훅 파일만 있는 것은 기준을 흐립니다.

즉, 이런 공용 UI 훅은 `필요한 시점`에 다시 추가하는 것이 맞습니다.

## 6. 훅 추가 기준

### `src/hooks`에 추가하는 경우

- `useQuery`, `useInfiniteQuery`, `useMutation`을 감싸는 도메인 훅
- 여러 화면에서 재사용되는 서버 상태 훅
- `queryKey`, `queryOptions`, `invalidate`와 직접 연결되는 훅

예:

- `useBoardList`
- `useCompletedTasks`
- `useCreateTask`

### 각 라우트 `hooks/`에 두는 경우

- 필터 탭 선택 상태
- 모달 열림/닫힘 상태
- 드래그 상태
- 화면 전용 애니메이션 상태
- 폼 임시 상태

예:

- `useScrollReveal`
- `useBoardFilters`
- `useTaskModalState`

## 7. 지금 기준 추천 운영 방식

현재는 아래 방식으로 운영하는 것을 추천합니다.

1. 서버 상태 훅은 `src/hooks` 루트에 둠
2. 페이지 전용 훅은 각 라우트 폴더 `hooks/` 사용
3. 공용 UI 훅은 실제 2곳 이상에서 필요해질 때만 추가
4. `useCommonQuery`, `useBaseQuery` 같은 과한 공통 훅은 만들지 않음

## 8. 최종 판단

현재 `src/hooks`는 늘리기보다 먼저 정리하는 것이 맞습니다.

- React Query용 도메인 훅은 유지
- 아직 근거 없는 placeholder UI 훅은 제거
- 훅 위치 기준을 명확히 분리

즉, 지금 단계에서는 `줄일 건 줄이고, 남길 건 더 선명하게 보이게 만드는 것`이 가장 좋은 정리 방향입니다.
