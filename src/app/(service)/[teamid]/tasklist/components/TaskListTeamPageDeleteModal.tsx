/**
 * 팀 작업 공간(페이지) 삭제 확인 UI입니다.
 * 공용 Modal · TaskListColumnDeleteModal과 동일한 레이아웃입니다.
 */

'use client';

import { IcAlertCircleLarge } from '@/assets';
import Modal from '@/components/common/modal';

type TaskListTeamPageDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListTeamPageDeleteModal({
  onClose,
  onConfirm,
}: TaskListTeamPageDeleteModalProps) {
  return (
    <Modal
      hasCloseButton={false}
      lineButtonText="닫기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex justify-center" aria-hidden="true">
          <IcAlertCircleLarge width={24} height={24} aria-hidden="true" />
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <h2
            id="modal-team-page-delete-title"
            className="w-full text-center text-base font-medium leading-5 text-text-primary"
          >
            페이지를 삭제하시겠습니까?
          </h2>
          <p
            id="modal-team-page-delete-description"
            className="text-center text-sm font-medium leading-snug text-text-secondary"
          >
            페이지에 관련된 모든 정보가 삭제됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
}
