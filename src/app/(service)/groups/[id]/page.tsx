/**
 * 할 일 상세 페이지를 구성하는 파일입니다.
 */
'use client';
import ModalPortal from '@/components/common/modal/ModalPortal';
import ModalFrame from '@/components/common/modal/ModalFrame';
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
      {/* <ModalFrame
          showCloseButton={true}
          title="모달 타이틀"
          subTitle="서브 타이틀"
          description="기본 문구 (진함)"
          subDescription="서브 문구 (회색)"
          onClose={() => setIsOpen(false)}
          lineButtonText="취소"
          onLineButtonClick={() => {}}
          primaryButtonText="확인"
          onPrimaryButtonClick={() => {}}
          subButtonText="삭제"
          onSubButtonClick={() => {}}
        >
          ㅋㅋㅋㅋㅋ 내용내용
        </ModalFrame> */}
      {openModal === 1 && (
        <ModalPortal>
          <ModalFrame
            title="멤버 초대"
            subDescription="그룹에 참여할 수 있는 링크를 복사합니다."
            onClose={() => setOpenModal(null)}
            primaryButtonText="링크 복사하기"
            onPrimaryButtonClick={() => setOpenModal(null)}
          />
        </ModalPortal>
      )}
      {openModal === 2 && (
        <ModalPortal>
          <ModalFrame
            title="멤버"
            subTitle="(4명)"
            showCloseButton={false}
            onClose={() => setOpenModal(null)}
            lineButtonText="닫기"
            onLineButtonClick={() => setOpenModal(null)}
            primaryButtonText="초대하기"
            onPrimaryButtonClick={() => setOpenModal(null)}
          >
            멤버리스트~~
          </ModalFrame>
        </ModalPortal>
      )}
      {openModal === 3 && (
        <ModalPortal>
          <ModalFrame
            icon={true}
            title="할일을 삭제하시겠습니까?"
            description="할일 정보가 삭제됩니다."
            showCloseButton={false}
            onClose={() => setOpenModal(null)}
            lineButtonText="닫기"
            onLineButtonClick={() => setOpenModal(null)}
            subButtonText="삭제"
            onSubButtonClick={() => setOpenModal(null)}
          />
        </ModalPortal>
      )}
      {openModal === 4 && (
        <ModalPortal>
          <ModalFrame
            showCloseButton={true}
            primaryButtonText="이메일 복사하기"
            onPrimaryButtonClick={() => setOpenModal(null)}
            subButtonText="멤버 삭제하기"
            onSubButtonClick={() => setOpenModal(null)}
            buttonAlign={true}
          >
            선택한 멤버 프로필
          </ModalFrame>
        </ModalPortal>
      )}
    </main>
  );
}
