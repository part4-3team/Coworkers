import Modal from '@/components/common/modal';

import { MOCK_MEMBERS } from '../../constants';
import { ModalMembersProps } from '../../types';
import { TeamMemberListContent } from '../TeamMemberList';

// 멤버 리스트
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
