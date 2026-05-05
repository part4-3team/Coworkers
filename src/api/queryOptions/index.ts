/**
 * React Query query options 모음 진입점입니다.
 *
 * 훅 파일에서 queryOptions를 가져올 때는
 * 보통 이 진입점이나 도메인별 파일을 사용합니다.
 * "이 도메인에 options 파일이 있는지" 빠르게 확인할 때 열어보면 편합니다.
 */

export {
  articleCommentQueryOptions,
  commentQueryOptions,
} from '@/api/queryOptions/commentQueryOptions';
export { articleQueryOptions } from '@/api/queryOptions/articleQueryOptions';
export { taskQueryOptions } from '@/api/queryOptions/taskQueryOptions';
export { teamQueryOptions } from '@/api/queryOptions/teamQueryOptions';
export { userQueryOptions } from '@/api/queryOptions/userQueryOptions';
