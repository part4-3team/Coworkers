/**
 * 할 일 관련 서버 상태와 액션을 관리하는 커스텀 훅입니다.
 */

export function useTask() {
  // TODO: TanStack Query 기반 할 일 조회/생성/수정/삭제 로직을 연결합니다.
  return {
    isLoading: false,
    task: null,
  } as const;
}
