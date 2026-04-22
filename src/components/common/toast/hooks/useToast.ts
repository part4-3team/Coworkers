/**
 * 토스트 알림을 호출하는 커스텀 훅입니다.
 *
 * @example
 * const { showToast } = useToast();
 *
 * // 성공 토스트 (3초 후 자동 닫힘)
 * showToast('이메일이 복사되었습니다.', 'success');
 *
 * // 에러 토스트 (3초 후 자동 닫힘)
 * showToast('삭제되었습니다.', 'error');
 *
 * // 액션 버튼이 있는 토스트 (버튼 클릭 시 닫힘)
 * showToast('저장하지 않은 변경사항이 있어요!', 'success', {
 *   label: '변경사항 저장하기',
 *   onClick: handleSave,
 * });
 */

import { useToastContext } from '@/components/common/toast/ToastProvider';

export function useToast() {
  return useToastContext();
}
