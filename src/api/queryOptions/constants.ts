/**
 * 프로젝트 전역에서 공통으로 재사용하는 React Query 기본 옵션 상수입니다.
 *
 * 이 파일은 "왜 어떤 목록은 30초 동안 fresh 상태지?" 같은 기준을 볼 때 사용합니다.
 * 각 queryOptions 파일에서 직접 숫자를 쓰지 않고 여기 상수를 가져다 쓰면,
 * 나중에 정책이 바뀌어도 한 곳에서 조정할 수 있습니다.
 */

const SECOND = 1000;
const MINUTE = 60 * SECOND;

export const QUERY_OPTION_DEFAULTS = {
  COMMENT_LIST_STALE_TIME: 10 * SECOND,
  DETAIL_STALE_TIME: 30 * SECOND,
  LIST_STALE_TIME: 30 * SECOND,
  TASK_LIST_DETAIL_STALE_TIME: 30 * SECOND,
  USER_LIST_STALE_TIME: 30 * SECOND,
  USER_ME_STALE_TIME: 5 * MINUTE,
} as const;
