/**
 * API 호출에 공통으로 사용하는 HTTP 메서드와 엔드포인트 세그먼트 상수입니다.
 */

export const HTTP_METHODS = {
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
} as const;

export const API_PATH_SEGMENTS = {
  ARTICLES: '/articles',
  AUTH: '/auth',
  COMMENTS: '/comments',
  GROUPS: '/groups',
  IMAGES: '/images',
  RECURRING: '/recurring',
  TASK_LISTS: '/task-lists',
  TASKS: '/tasks',
} as const;

export const API_FORM_DATA_FIELDS = {
  IMAGE: 'image',
} as const;
