import { TeamMemberListContent } from '@/app/(service)/[teamid]/components/TeamMemberList';
import { MOCK_MEMBERS } from '@/app/(service)/[teamid]/constants';
import { ModalMembersProps } from '@/app/(service)/[teamid]/types';
import Modal from '@/components/common/modal';

// 멤버 리스트
export function ModalMembers({
  onClose,
  onPrimaryButtonClick,
  onMemberClick,
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
      <TeamMemberListContent
        members={MOCK_MEMBERS.members}
        onMemberClick={onMemberClick ?? (() => {})}
      />
    </Modal>
  );
}
