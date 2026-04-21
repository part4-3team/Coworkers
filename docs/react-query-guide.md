# React Query 사용 가이드

이 문서는 현재 프로젝트에 정리된 `queryKeys`, `queryOptions`, `hooks`를 팀원이 같은 방식으로 사용하기 위한 기준 문서입니다.

## 1. 기본 원칙

- 같은 요청은 같은 `queryKey`를 사용합니다.
- `useQuery`는 가능하면 페이지/컴포넌트에서 바로 쓰지 않고 도메인 훅으로 감쌉니다.
- 공통화 포인트는 `useQuery` 자체가 아니라 아래 4개입니다.
  - `queryKeys`
  - `api 함수`
  - `queryOptions`
  - `도메인 훅`
- `list`와 `infiniteList`는 반드시 분리합니다.
- invalidate할 때는 문자열 하드코딩 대신 `queryKeys`를 사용합니다.

## 2. 폴더 역할

### `src/api/queryKeys`

쿼리 키만 정의합니다.

- 리소스 단위 키
- detail / list / infiniteList 구분
- 팀 스코프가 필요한 경우 `teamId` 포함
- query param은 정규화해서 같은 요청이 같은 키가 되도록 유지

예시:

```ts
queryKeys.board.detail(teamId, articleId);
queryKeys.board.list(teamId, { page: 1, pageSize: 10, orderBy: 'recent' });
queryKeys.task.list(teamId, { taskListId, date: '2026-04-21' });
```

### `src/api/*Api.ts`

실제 fetch 함수만 둡니다.

- endpoint 조합
- query string 조합
- `apiClient` 호출
- 캐시 키나 React Query 로직은 넣지 않음

### `src/api/queryOptions`

`useQuery`, `useInfiniteQuery`에 들어갈 옵션을 만듭니다.

- `queryKey`
- `queryFn`
- `placeholderData`
- `staleTime`

예시:

```ts
export const boardQueryOptions = {
  detail: (teamId: string, articleId: QueryKeyId) =>
    createQueryOptions({
      queryFn: () => getBoardDetail(teamId, articleId),
      queryKey: queryKeys.board.detail(teamId, articleId),
    }),
};
```

### `src/hooks`

여러 화면에서 재사용되는 서버 상태 훅을 둡니다.

- `useBoard`
- `useBoardComment`
- `useTeam`
- `useTaskList`
- `useTask`
- `useRecurring`
- `useImage`
- `useUser`
- `useAuth`

페이지 전용 상태 훅은 각 라우트 폴더 아래 `hooks/`를 사용합니다.

예시:

- 공통 도메인 훅: `src/hooks/useBoard.ts`
- 페이지 전용 훅: `src/app/(landing)/hooks/useScrollReveal.ts`

## 3. 훅 분리 기준

현재 프로젝트는 아래 3가지를 같이 봐서 훅 파일을 나누는 것이 가장 자연스럽습니다.

- Swagger 태그 경계
- 현재 라우트/화면 경계
- invalidate 범위

즉, `queryKey`는 세밀하게 가져가더라도 훅 파일은 화면에서 함께 움직이는 데이터 덩어리 기준으로 묶습니다.

### 3-1. 훅 파일을 나누는 기준

- 같은 `teamId` 범위를 쓰더라도 invalidate 범위가 다르면 훅 파일을 분리합니다.
- 같은 화면에서 자주 함께 쓰이더라도 페이지 로컬 UI 상태는 전역 훅으로 올리지 않습니다.
- `useCommonQuery`, `useBaseQuery`처럼 모든 쿼리를 한 번 더 감싸는 공통 훅은 만들지 않습니다.
- `queryKeys`는 리소스 기준, `hooks`는 사용자 행동 기준으로 보는 것이 좋습니다.

### 3-2. 왜 지금 구조에서 더 쪼개야 하는가

현재 `queryKeys`는 이미 아래처럼 리소스가 분리되어 있습니다.

- `auth`
- `user`
- `team`
- `taskList`
- `task`
- `recurring`
- `comment`
- `board`
- `boardComment`

반면 `src/hooks`는 아직 `useAuth`, `useTeam`, `useTask`, `useBoard` 중심이라 `user`, `taskList`, `recurring`, `boardComment` 책임이 비어 있습니다.

이 상태에서 `useTask.ts`나 `useAuth.ts` 하나에 계속 넣기 시작하면 아래 문제가 생깁니다.

- 파일이 너무 빨리 커짐
- mutation 이후 invalidate 범위를 읽기 어려워짐
- 같은 도메인인데 화면마다 다른 이름으로 훅이 생김
- `myhistory`, `mypage`처럼 `User` 도메인 화면이 `Auth` 훅에 섞여 들어감

## 4. 현재 프로젝트 기준 추천 훅 구조

아래 구조가 지금의 Swagger 태그, 라우트, 기획 화면을 같이 봤을 때 가장 무난합니다.

### 4-1. 공통 도메인 훅 파일

| 파일 | 책임 | 추천 export |
| --- | --- | --- |
| `src/hooks/useAuth.ts` | 로그인/회원가입/OAuth/토큰 갱신 | `useSignIn`, `useSignUp`, `useRefreshToken`, `useSignInWithOauth` |
| `src/hooks/useImage.ts` | 프로필/팀 이미지 업로드 | `useUploadImage` |
| `src/hooks/useUser.ts` | 내 정보, 내 그룹/멤버십, 마이페이지, 마이히스토리 | `useMe`, `useMyGroups`, `useMyMemberships`, `useCompletedTasks`, `useUpdateMe`, `useUpdatePassword`, `useSendResetPasswordEmail`, `useResetPassword`, `useDeleteMe` |
| `src/hooks/useTeam.ts` | 그룹(프론트 팀) 상세, 멤버, 초대, 팀 수정 | `useTeamDetail`, `useCreateTeam`, `useUpdateTeam`, `useDeleteTeam`, `useTeamMembers`, `useInviteMember`, `useRemoveMember`, `useInvitationToken`, `useAcceptInvitation`, `useTeamTasksByDate` |
| `src/hooks/useTaskList.ts` | 컬럼 단위 할 일 목록 조회/생성/수정/삭제/순서 변경 | `useTaskList`, `useCreateTaskList`, `useUpdateTaskList`, `useDeleteTaskList`, `useUpdateTaskListOrder` |
| `src/hooks/useTask.ts` | 할 일 조회/수정/삭제/정렬과 할 일 댓글 | `useTasks`, `useTaskDetail`, `useCreateTask`, `useUpdateTask`, `useDeleteTask`, `useUpdateTaskOrder`, `useTaskComments`, `useCreateTaskComment`, `useUpdateTaskComment`, `useDeleteTaskComment` |
| `src/hooks/useRecurring.ts` | 반복 일정 생성/수정/삭제 | `useCreateRecurring`, `useUpdateRecurring`, `useDeleteRecurring` |
| `src/hooks/useBoard.ts` | 게시글 목록/상세/작성/수정/삭제/좋아요 | `useBoardList`, `useBoardDetail`, `useCreateBoard`, `useUpdateBoard`, `useDeleteBoard`, `useLikeBoard`, `useUnlikeBoard` |
| `src/hooks/useBoardComment.ts` | 게시글 댓글 목록/작성/수정/삭제 | `useBoardComments`, `useCreateBoardComment`, `useUpdateBoardComment`, `useDeleteBoardComment` |

### 4-2. 바로 파일로 만들지 않아도 되는 도메인

아래 도메인은 재사용이 더 생길 때 분리해도 충분합니다.

| 파일 | 판단 |
| --- | --- |
| `src/hooks/useOauthApp.ts` | 팀 설정 화면이 붙을 때 `useTeam`에서 분리할지 결정해도 늦지 않음 |

### 4-3. 라우트 전용 훅으로 남겨야 하는 것

이런 훅은 `src/hooks`가 아니라 각 라우트 폴더 아래 `hooks/`에 둡니다.

- 필터 탭 선택 상태
- 모달 열림/닫힘 상태
- 드래그 UI 상태
- 화면 전용 pagination UI 상태
- 폼 임시값/정렬 토글

예:

- `src/app/(landing)/hooks/useScrollReveal.ts`
- 각 서비스 라우트 화면 안의 `hooks/` 폴더

## 5. 화면 기준으로 보면 어떻게 연결되는가

현재 라우트 기준으로 보면 연결은 아래처럼 보는 게 가장 자연스럽습니다.

| 화면 | 주로 쓰는 훅 |
| --- | --- |
| `login`, `signup`, `oauth` | `useAuth` |
| `mypage`, `myhistory` | `useUser`, `useImage` |
| `addteam`, `jointeam`, `[teamid]/edit` | `useTeam`, `useImage` |
| `[teamid]/tasklist` | `useTaskList`, `useTask`, `useRecurring` |
| `boards`, `boards/[articleId]` | `useBoard`, `useBoardComment` |

이렇게 잡아두면 화면에서 훅 이름만 봐도 어느 캐시를 건드리는지 읽히고, mutation 이후 invalidate 방향도 예측하기 쉬워집니다.

## 6. mutation-only 도메인은 `queryOptions`를 생략할 수 있습니다.

지금 프로젝트에서는 `auth`, `image`처럼 조회보다 `useMutation`이 중심인 도메인이 있습니다.

이 경우에는 억지로 `queryOptions` 파일을 만들기보다 아래처럼 정리하는 편이 더 자연스럽습니다.

1. `queryKeys`
2. `api 함수`
3. `도메인 mutation 훅`

즉, `queryOptions`는 `useQuery`, `useInfiniteQuery`가 실제로 필요한 도메인에 우선 적용합니다.

## 7. 현재 기준 추천 사용 순서

새로운 조회가 필요하면 아래 순서로 작업합니다.

1. `src/api/queryKeys`에 키 추가
2. `src/api/*Api.ts`에 fetch 함수 추가
3. `src/api/queryOptions/*`에 options 추가
4. `src/hooks/*`에 도메인 훅 추가
5. 페이지/컴포넌트에서는 도메인 훅 사용

## 8. 현재 완성된 예시: Board

현재 board는 실제 사용 예시로 볼 수 있습니다.

### 8-1. query key

파일:
- `src/api/queryKeys/board.ts`

예시:

```ts
queryKeys.board.all(teamId);
queryKeys.board.lists(teamId);
queryKeys.board.list(teamId, {
  page: 1,
  pageSize: 10,
  orderBy: 'recent',
  keyword: '공지',
});
queryKeys.board.detail(teamId, articleId);
queryKeys.board.like(teamId, articleId);
```

### 8-2. api 함수

파일:
- `src/api/boardApi.ts`

예시:

```ts
export async function getBoardList(
  teamId: string,
  params?: BoardListQueryParams,
) {
  const endpoint = `${teamEndpoint('/articles', teamId)}${buildQueryString(
    params,
  )}`;

  return apiClient<unknown>(endpoint);
}
```

### 8-3. query options

파일:
- `src/api/queryOptions/boardQueryOptions.ts`

예시:

```ts
export const boardQueryOptions = {
  list: (teamId: string, params?: BoardListQueryParams) =>
    createListQueryOptions({
      queryFn: () => getBoardList(teamId, params),
      queryKey: queryKeys.board.list(teamId, params),
    }),
};
```

### 8-4. hook

파일:
- `src/hooks/useBoard.ts`

예시:

```ts
export function useBoardList({ params, teamId }: UseBoardListParams) {
  return useQuery(boardQueryOptions.list(teamId, params));
}
```

### 8-5. 화면에서 사용

```tsx
'use client';

import { useBoardList } from '@/hooks/useBoard';

type BoardPageProps = {
  teamId: string;
};

export default function BoardPage({ teamId }: BoardPageProps) {
  const { data, isLoading, isError } = useBoardList({
    teamId,
    params: {
      page: 1,
      pageSize: 10,
      orderBy: 'recent',
    },
  });

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>목록을 불러오지 못했습니다.</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

## 9. invalidate 예시

mutation 이후에는 관련 범위만 invalidate합니다.

```ts
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/api/queryKeys';

const queryClient = useQueryClient();

await queryClient.invalidateQueries({
  queryKey: queryKeys.board.lists(teamId),
});

await queryClient.invalidateQueries({
  queryKey: queryKeys.board.detail(teamId, articleId),
});
```

목록만 다시 불러올지, 상세도 같이 다시 불러올지는 mutation 영향 범위에 따라 정합니다.

## 10. 새 도메인 추가 예시

예를 들어 task list 조회를 추가할 때는 아래 순서로 맞춥니다.

### 10-1. query key

```ts
queryKeys.taskList.list(teamId, {
  groupId,
  date: '2026-04-21',
});
```

### 10-2. api 함수

```ts
export async function getTaskLists(
  teamId: string,
  params?: TaskListQueryParams,
) {
  const endpoint = `${teamEndpoint('/task-lists', teamId)}${buildQueryString(
    params,
  )}`;

  return apiClient<unknown>(endpoint);
}
```

### 10-3. query options

```ts
export const taskQueryOptions = {
  taskLists: (teamId: string, params?: TaskListQueryParams) =>
    createListQueryOptions({
      queryFn: () => getTaskLists(teamId, params),
      queryKey: queryKeys.taskList.list(teamId, params),
    }),
};
```

## 11. 지금 기준 최종 판단

현재 프로젝트에서는 아래처럼 정리하는 것이 가장 좋습니다.

- `Auth`와 `User`는 분리합니다.
- `TaskList`, `Task`, `Recurring`는 분리합니다.
- `Board`와 `BoardComment`는 분리합니다.
- 서버 상태 훅은 `src/hooks` 루트에 둡니다.
- `Image`는 mutation 훅으로 유지하고, `OauthApp`은 실제 사용 시점에 분리합니다.
- 페이지 전용 UI 상태는 전역 훅으로 올리지 않습니다.

즉, 지금 `board`를 기준 구현으로 삼되, 다음 순서는 아래가 좋습니다.

1. `useUser.ts`
2. `useTeam.ts`
3. `useTaskList.ts`
4. `useTask.ts`
5. `useRecurring.ts`
6. `useBoardComment.ts`
7. 마지막에 `useAuth.ts` mutation 정리

이 순서가 좋은 이유는 현재 기획 화면 기준으로 `myhistory/mypage`와 `tasklist` 화면이 가장 먼저 실제 데이터를 많이 쓰게 될 가능성이 높기 때문입니다.

### 10-4. hook

```ts
export function useTaskLists(teamId: string, params?: TaskListQueryParams) {
  return useQuery(taskQueryOptions.taskLists(teamId, params));
}
```

## 12. 팀 규칙

- `queryKey`는 항상 `queryKeys`를 통해 생성합니다.
- `queryFn`은 `api` 함수만 호출합니다.
- `useQuery`는 되도록 `src/hooks`의 도메인 훅에서만 직접 씁니다.
- 페이지 전용 상태는 전역 hooks가 아니라 라우트 폴더 아래 `hooks/`로 둡니다.
- 아직 API가 없는 도메인은 `queryOptions`와 `hook` 자리를 먼저 만들 수 있지만, 실제 fetch 함수가 없으면 가짜 요청은 넣지 않습니다.

## 13. 현재 상태 정리

- 실제 패턴이 연결된 도메인: `auth`, `board`, `boardComment`, `comment`, `image`, `recurring`, `task`, `taskList`, `team`, `user`
- 키만 먼저 정리된 도메인: `oauthApp`

새 기능을 붙일 때는 `board`를 기준 예시로 보면 됩니다.
