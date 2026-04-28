'use client';

import Modal from '@/components/common/modal';

type Props = {
  onClose: () => void;
};

export default function WithdrawModal({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      hasIcon={true}
      title="회원 탈퇴를 진행하시겠어요?"
      hasCloseButton={false}
      description={`그룹장으로 있는 그룹은 자동으로 삭제되고,\n 모든 그룹에서 나가집니다.`}
      lineButtonText="닫기"
      onLineButtonClick={onClose}
      subButtonText="회원 탈퇴"
      onSubButtonClick={() => {}}
    />
  );
}
