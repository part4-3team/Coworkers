/**
 * 할 일 리스트 보드 전용 삭제 확인 UI입니다.
 * ModalPortal만 공용으로 쓰고, 문구·타이포는 이 라우트에서 맞춥니다.
 */

'use client';

import Image from 'next/image';

import { icAlertCircleLarge } from '@/assets';
import ModalPortal from '@/components/common/modal/components/ModalPortal';

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
    <ModalPortal>
      <div
        className="fixed inset-0 z-999 flex items-end-safe justify-center bg-black/60 md:items-center md:px-4"
        onClick={onClose}
        role="presentation"
      >
        <section
          aria-labelledby="modal-danger-title"
          aria-describedby="modal-danger-description"
          className="relative w-full min-w-80 overflow-hidden rounded-t-xl bg-background-primary px-4 pt-4 pb-8 md:max-w-sm md:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex justify-center" aria-hidden="true">
                <Image src={icAlertCircleLarge} alt="" width={24} height={24} />
              </div>
              <div className="flex w-full flex-col items-center gap-2">
                <h1
                  id="modal-danger-title"
                  className="w-full text-center text-base font-medium leading-5 text-text-primary"
                >
                  <span className="block">&apos;{taskTitle}&apos;</span>
                  <span className="block">할 일을 정말 삭제하시겠어요?</span>
                </h1>
                <p
                  id="modal-danger-description"
                  className="text-center text-sm font-medium leading-snug text-text-secondary"
                >
                  삭제 후에는 되돌릴 수 없습니다.
                </p>
              </div>
            </div>

            <div className="flex w-full gap-2">
              <button
                type="button"
                className="w-full rounded-xl border border-border-secondary px-4 py-2.75 font-medium text-text-default hover:enabled:bg-background-secondary"
                onClick={onClose}
              >
                닫기
              </button>
              <button
                type="button"
                className="w-full rounded-xl bg-status-danger px-4 py-2.75 font-medium text-white hover:enabled:bg-status-hover"
                onClick={onConfirm}
              >
                삭제하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </ModalPortal>
  );
}
