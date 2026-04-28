/**
 * TanStack Query 키 팩토리에서 공통으로 사용하는 타입입니다.
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
