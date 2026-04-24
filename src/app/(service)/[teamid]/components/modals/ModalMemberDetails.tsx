import Image from 'next/image';

import Modal from '@/components/common/modal';
import { useToast } from '@/components/common/toast';

import { ModalMembersProps } from '../../types';

// 멤버 개인 정보
export function ModalMemberDetail({
  onClose,
  onPrimaryButtonClick,
  member,
}: ModalMembersProps) {
  const { showToast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(member?.userEmail ?? '');
      showToast('이메일이 복사되었습니다.', 'success');
      onClose();
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: 멤버 삭제 API 호출 로직 구현
      showToast('멤버가 삭제되었습니다.', 'error');
      onPrimaryButtonClick?.();
      onClose();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };
  if (!member) return null;

  return (
    <Modal
      onClose={onClose}
      primaryButtonText="이메일 복사하기"
      onPrimaryButtonClick={handleCopyEmail}
      subButtonText="멤버 삭제"
      onSubButtonClick={handleDelete}
      isButtonAlign={true}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-xl mb-4 w-10 h-10 overflow-hidden">
          <Image
            src={member.userImage}
            alt=""
            width="40"
            height="40"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-text-primary font-semibold mb-1">
          {member?.userName}
        </p>
        <p className="text-xs text-text-secondary font-normal">
          {member?.userEmail}
        </p>
      </div>
    </Modal>
  );
}
