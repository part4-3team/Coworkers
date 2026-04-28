/**
 * TanStack Query 키에서 재사용하는 리소스명과 세그먼트 상수를 정의합니다.
 */

export const QUERY_KEY_RESOURCES = {
  ARTICLES: 'articles',
  ARTICLE_COMMENTS: 'articleComments',
  AUTH: 'auth',
  COMMENTS: 'comments',
  COMPLETED_TASKS: 'completedTasks',
  GROUPS: 'groups',
  IMAGES: 'images',
  INVITATIONS: 'invitations',
  MEMBERS: 'members',
  MEMBERSHIPS: 'memberships',
  OAUTH_APPS: 'oauthApps',
  RECURRINGS: 'recurrings',
  TASK_LISTS: 'taskLists',
  TASKS: 'tasks',
  TASKS_BY_DATE: 'tasksByDate',
  TEAMS: 'teams',
  USER: 'user',
} as const;

export const QUERY_KEY_SEGMENTS = {
  DETAIL: 'detail',
  INFINITE_LIST: 'infiniteList',
  LIKE: 'like',
  LIST: 'list',
  ME: 'me',
  OAUTH: 'oauth',
  SESSION: 'session',
  SUMMARY: 'summary',
  UPLOAD: 'upload',
} as const;
