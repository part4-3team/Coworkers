export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADD_TEAM: '/addteam',
  MY_HISTORY: '/myhistory',
  MY_PAGE: '/mypage',
  BOARDS: '/boards',
  TEAM: (teamId: string) => `/${teamId}`,
  TASK_LIST: (teamId: string) => `/${teamId}/tasklist`,
  TASK_DETAIL: (teamId: string, taskId: string) => `/${teamId}/${taskId}`,
  OAUTH_SIGNUP: (provider: string) => `/oauth/signup/${provider}`,
} as const;
