/**
 * 팀 관련 서버 상태와 액션을 관리하는 커스텀 훅입니다.
 */

export function useTeam() {
  // TODO: TanStack Query 기반 팀 조회/생성/수정/삭제 로직을 연결합니다.
  return {
    isLoading: false,
    team: null,
  } as const;
}
