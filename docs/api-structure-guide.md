# API 폴더 구조 가이드

이 문서는 현재 `Coworkers` 프로젝트의 기획 요구사항, Swagger API, 현재 라우트 구조를 기준으로 `src/api` 폴더를 어떤 기준으로 유지하고 확장할지 정리한 문서입니다.

## 1. 판단 기준

- 프로젝트 기획 요구사항의 실제 화면 범위
- Swagger 태그와 엔드포인트 경계
- 현재 `app` 라우트 구조
- 현재 React Query `queryKeys`, `queryOptions`, `hooks` 구조

## 2. 현재 기준 결론

현재 `src/api`에 있는 파일들은 대부분 필요합니다.

- `apiClient.ts`
- `buildQueryString.ts`
- `authApi.ts`
- `groupApi.ts`
- `taskApi.ts`
- `boardApi.ts`
- `commentApi.ts`

반대로 지금 구조에서 더 눈에 띄는 문제는 `불필요한 API 파일이 많다`는 점보다 `필요한 파일이 아직 비어 있거나 빠져 있다`는 점입니다.

특히 아래 두 파일은 현재 기획과 UI 기준으로 필요합니다.

- `userApi.ts`
- `imageApi.ts`

## 3. 권장 최종 구조

```text
src/api/
├─ apiClient.ts
├─ buildQueryString.ts
├─ authApi.ts
├─ userApi.ts
├─ imageApi.ts
├─ groupApi.ts
├─ taskApi.ts
├─ boardApi.ts
└─ commentApi.ts
```

## 4. 파일별 책임

### `apiClient.ts`

공통 fetch 래퍼입니다.

- base URL 조합
- `teamId` 경로 조합
- 공통 headers 처리
- 공통 에러 처리

각 도메인 API 파일은 실제 엔드포인트 조합만 담당하고, fetch 공통 로직은 여기서 처리합니다.

### `buildQueryString.ts`

목록 조회용 query string 유틸입니다.

- 페이지네이션
- 검색
- 날짜 필터
- 커서 페이지네이션

채용 / 홍보, 마이 히스토리, 할 일 날짜 조회에서 재사용합니다.

### `authApi.ts`

인증 관련 API입니다.

기획/Swagger 기준 포함 대상:

- 회원가입
- 로그인
- 카카오 OAuth 로그인
- 토큰 갱신

비밀번호 재설정은 Swagger상 `User`에 있지만, 화면상 로그인 흐름에서 사용되므로 `authApi.ts`에 둘지 `userApi.ts`에 둘지는 팀 합의로 정해도 됩니다.

현재 프로젝트는 로그인 흐름 기준으로 보고 아래처럼 두는 것을 추천합니다.

- 비밀번호 재설정 메일 발송
- 비밀번호 재설정 완료

### `userApi.ts`

현재 사용자 자신의 정보와 계정 설정 관련 API입니다.

기획/Swagger 기준 포함 대상:

- 내 프로필 조회
- 내 프로필 수정
- 내 그룹 목록
- 내 멤버십 목록
- 완료한 할 일 이력
- 비밀번호 변경
- 회원 탈퇴

화면 대응:

- `/mypage`
- `/myhistory`

### `imageApi.ts`

이미지 업로드 API입니다.

기획 기준 포함 대상:

- 팀 이미지 업로드
- 프로필 이미지 업로드

현재 [AddUserImg.tsx](/Users/kwonsaerom/Desktop/coworkers/src/components/common/adduserimg/AddUserImg.tsx#L10)에서 파일 선택 UI를 이미 사용하고 있으므로, 실제 업로드 API 자리는 별도 파일로 두는 것이 자연스럽습니다.

### `groupApi.ts`

팀/그룹 관련 API입니다.

기획/Swagger 기준 포함 대상:

- 팀 생성
- 팀 수정
- 팀 삭제
- 팀 멤버 조회/추가/삭제
- 초대 토큰 발급
- 초대 수락
- 팀 기준 날짜별 할 일 조회

화면 대응:

- `/addteam`
- `/jointeam`
- `/{teamid}`
- `/{teamid}/edit`

### `taskApi.ts`

할 일 영역 API입니다.

현재 단계에서는 아래를 한 파일로 두는 것이 가장 무난합니다.

- 할 일 목록(TaskList)
- 할 일(Task)
- 반복 일정(Recurring)

기획/Swagger 기준 포함 대상:

- 할 일 목록 조회/생성/수정/삭제/순서 변경
- 할 일 조회/수정/삭제/순서 변경/완료
- 반복 일정 생성/수정/삭제

화면 대응:

- `/{teamid}/tasklist`
- `/{teamid}/{taskId}`

### `boardApi.ts`

채용 / 홍보 게시글 관련 API입니다.

기획/Swagger 기준 포함 대상:

- 게시글 목록
- 게시글 상세
- 게시글 생성
- 게시글 수정
- 게시글 삭제
- 게시글 좋아요/좋아요 취소

화면 대응:

- `/boards`
- `/boards/[articleId]`

### `commentApi.ts`

댓글 관련 API입니다.

현재 단계에서는 아래 둘을 함께 두는 것이 괜찮습니다.

- 할 일 댓글
- 게시글 댓글

기획/Swagger 기준 포함 대상:

- 할 일 댓글 목록/생성/수정/삭제
- 게시글 댓글 목록/생성/수정/삭제

## 5. 지금은 굳이 추가하지 않아도 되는 파일

### `oauthAppApi.ts`

Swagger에는 있지만 현재 기획 요구사항의 필수 화면에는 직접 드러나지 않습니다.

또한 현재 프로젝트는 [route.ts](/Users/kwonsaerom/Desktop/coworkers/src/app/api/auth/[...nextauth]/route.ts#L1)에서 환경변수 기반 OAuth 공급자 설정을 사용하고 있어, 팀별 OAuth 앱 등록 화면이 실제로 필요해질 때 추가해도 늦지 않습니다.

즉, 현재 단계에서는 보류해도 됩니다.

## 6. 나중에 파일이 커지면 어떻게 나눌까

현재는 파일 수를 과하게 늘리지 않고 아래 기준으로 유지하는 것을 추천합니다.

### 유지 단계

```text
taskApi.ts
commentApi.ts
```

### 분리 단계

아래 중 하나라도 발생하면 분리를 고려합니다.

- 파일 길이가 100줄을 넘기기 시작함
- mutation과 query가 섞여 읽기 어려워짐
- invalidate 범위를 파일 안에서 추적하기 어려워짐
- 서로 다른 화면이 같은 파일을 과하게 공유함

그때는 아래 구조를 고려합니다.

```text
src/api/
├─ taskListApi.ts
├─ taskApi.ts
├─ recurringApi.ts
├─ taskCommentApi.ts
└─ boardCommentApi.ts
```

다만 지금은 아직 실제 구현량이 적어서 이 단계까지 바로 갈 필요는 없습니다.

## 7. 최종 권장안

현재 프로젝트 기준 최종 권장안은 아래와 같습니다.

1. `apiClient.ts`, `buildQueryString.ts`는 그대로 유지
2. `authApi.ts`, `groupApi.ts`, `taskApi.ts`, `boardApi.ts`, `commentApi.ts`는 유지
3. `userApi.ts`, `imageApi.ts`를 추가
4. `oauthAppApi.ts`는 보류
5. `taskApi.ts`, `commentApi.ts`는 실제 코드가 커질 때 분리

즉, 지금의 방향은 `삭제`보다 `보강`이 맞습니다.
