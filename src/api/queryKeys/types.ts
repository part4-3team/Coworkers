/**
 * query key, query params를 만들 때 공통으로 사용하는 타입 모음입니다.
 *
 * 이 파일은 보통 새 query key를 추가하거나,
 * 목록 조회 params 타입을 새로 정의할 때 같이 봅니다.
 *
 * 예:
 * - 페이지네이션 목록 -> `OffsetPaginationQueryParams`
 * - 커서 기반 댓글 목록 -> `CursorPaginationQueryParams`
 * - 날짜 범위 검색 -> `DateRangeQueryParams`
 */

export type QueryKeyId = number | string;

export type QueryParamPrimitive = boolean | number | string | null;

export type QueryParamValue =
  | QueryParamPrimitive
  | QueryParams
  | readonly QueryParamValue[];

export type QueryParams = {
  readonly [key: string]: QueryParamValue | undefined;
};

export type OffsetPaginationQueryParams = {
  page?: number;
  pageSize?: number;
};

export type CursorPaginationQueryParams = {
  cursor?: number;
  limit?: number;
};

export type DateRangeQueryParams = {
  endDate?: string;
  startDate?: string;
};

export type TeamScopedDateQueryParams = DateRangeQueryParams & {
  date?: string;
};

export type CompletedTaskHistoryQueryParams = CursorPaginationQueryParams &
  DateRangeQueryParams & {
    month?: string;
    teamId?: string;
  };

export type ArticleListQueryParams = OffsetPaginationQueryParams &
  CursorPaginationQueryParams & {
    keyword?: string;
    orderBy?: string;
  };

export type TaskListQueryParams = TeamScopedDateQueryParams & {
  groupId?: QueryKeyId;
};

export type TaskQueryParams = TeamScopedDateQueryParams & {
  done?: boolean;
  recurringId?: QueryKeyId;
  taskListId?: QueryKeyId;
};
