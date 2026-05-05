/**
 * TanStack Query 키를 만들 때 재사용하는 리소스명 / 세그먼트 상수입니다.
 *
 * 이 파일은 보통 직접 수정할 일이 많지는 않습니다.
 * 다만 새 도메인을 추가하면서 query key 규칙을 확장해야 할 때는
 * 여기 상수를 먼저 추가한 뒤 각 도메인 키 파일에서 가져다 씁니다.
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
