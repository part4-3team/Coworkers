/**
 * 할 일 리스트 보드 전용 삭제 확인 UI입니다.
 * 공용 Modal(ModalPortal + ModalFrame)을 사용합니다.
 */

'use client';

import { IcAlertCircleLarge } from '@/assets';
import Modal from '@/components/common/modal';

type TaskListTaskDeleteModalProps = {
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListTaskDeleteModal({
  taskTitle,
  onClose,
  onConfirm,
}: TaskListTaskDeleteModalProps) {
  return (
    <Modal
      hasCloseButton={false}
      lineButtonText="닫기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제하기"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex justify-center" aria-hidden="true">
          <IcAlertCircleLarge width={24} height={24} aria-hidden="true" />
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <h2
            id="modal-danger-title"
            className="w-full text-center text-base font-medium leading-5 text-text-primary"
          >
            <span className="block">&apos;{taskTitle}&apos;</span>
            <span className="block">할 일을 정말 삭제하시겠어요?</span>
          </h2>
          <p
            id="modal-danger-description"
            className="text-center text-sm font-medium leading-snug text-text-secondary"
          >
            삭제 후에는 되돌릴 수 없습니다.
          </p>
        </div>
      </div>
    </Modal>
  );
}
