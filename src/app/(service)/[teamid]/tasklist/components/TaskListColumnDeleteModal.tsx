/**
 * 할 일 목록(컬럼) 삭제 확인 UI입니다.
 * 공용 Modal(ModalPortal + ModalFrame)을 사용합니다.
 */

'use client';

import { IcAlertCircleLarge } from '@/assets';
import Modal from '@/components/common/modal';

type TaskListColumnDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListColumnDeleteModal({
  onClose,
  onConfirm,
}: TaskListColumnDeleteModalProps) {
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
          <h1
            id="modal-column-delete-title"
            className="w-full text-center text-base font-medium leading-5 text-text-primary"
          >
            할 일을 삭제하시겠습니까?
          </h1>
          <p
            id="modal-column-delete-description"
            className="text-center text-sm font-medium leading-snug text-text-secondary"
          >
            할 일 정보가 삭제됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
}
