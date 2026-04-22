// member/TeamMemberList.tsx
import { MOCK_MEMBERS } from '../constants';
import Modal from '@/components/common/modal';
import { TeamMemberListContent } from './TeamMemberList';
import { ModalFrameProps } from '@/components/common/modal/types';
import { useToast } from '@/components/common/toast';
import { ModalMembersProps } from '../types';

export function ModalMembers({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="멤버"
      subTitle={`(${MOCK_MEMBERS.members.length}명)`}
      onClose={onClose}
      hasCloseButton={false}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      primaryButtonText="초대하기"
      onPrimaryButtonClick={onPrimaryButtonClick ?? onClose}
    >
      <TeamMemberListContent members={MOCK_MEMBERS.members} />
    </Modal>
  );
}

export function ModalMembersInvite({ onClose }: ModalFrameProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('이메일이 복사되었습니다.', 'success');
      onClose();
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <Modal
      title="멤버 초대"
      description="그룹에 참여할 수 있는 링크를 복사합니다."
      primaryButtonText="링크 복사하기"
      onPrimaryButtonClick={handleCopy}
      onClose={onClose}
    />
  );
}
