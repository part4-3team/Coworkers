/**
 * 할 일 상세 페이지를 구성하는 파일입니다.
 */
'use client';
import Modal from '@/components/common/modal/';
import { useState } from 'react';

export default function TaskDetailPage() {
  // const [isOpen, setIsOpen] = useState(true);
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <main className="flex gap-4 px-16 py-16">
      <button
        className="px-6 py-1 border rounded-2xl"
        onClick={() => setOpenModal(1)}
      >
        1버튼 모달 열기
      </button>
      <button
        className="px-6 py-1 border rounded-2xl"
        onClick={() => setOpenModal(2)}
      >
        2버튼(그레이,블루)모달 열기
      </button>
      <button
        className="px-6 py-1 border rounded-2xl"
        onClick={() => setOpenModal(3)}
      >
        2버튼(그레이,레드)모달 열기
      </button>
      <button
        className="px-6 py-1 border rounded-2xl"
        onClick={() => setOpenModal(4)}
      >
        2(블루,레드)모달 열기
      </button>

      {openModal === 1 && (
        <Modal
          title="멤버 초대"
          subDescription="그룹에 참여할 수 있는 링크를 복사합니다."
          onClose={() => setOpenModal(null)}
          primaryButtonText="링크 복사하기"
          onPrimaryButtonClick={() => setOpenModal(null)}
        />
      )}
      {openModal === 2 && (
        <Modal
          title="멤버"
          subTitle="(4명)"
          hasCloseButton={false}
          onClose={() => setOpenModal(null)}
          lineButtonText="닫기"
          onLineButtonClick={() => setOpenModal(null)}
          primaryButtonText="초대하기"
          onPrimaryButtonClick={() => setOpenModal(null)}
        >
          멤버리스트~~
        </Modal>
      )}
      {openModal === 3 && (
        <Modal
          hasIcon={true}
          title="할일을 삭제하시겠습니까?"
          description="할일 정보가 삭제됩니다."
          hasCloseButton={false}
          onClose={() => setOpenModal(null)}
          lineButtonText="닫기"
          onLineButtonClick={() => setOpenModal(null)}
          subButtonText="삭제"
          onSubButtonClick={() => setOpenModal(null)}
        />
      )}
      {openModal === 4 && (
        <Modal
          hasCloseButton={true}
          primaryButtonText="이메일 복사하기"
          onPrimaryButtonClick={() => setOpenModal(null)}
          subButtonText="멤버 삭제하기"
          onSubButtonClick={() => setOpenModal(null)}
          isButtonAlign={true}
          onClose={() => setOpenModal(null)}
        >
          선택한 멤버 프로필
        </Modal>
      )}
    </main>
  );
}
