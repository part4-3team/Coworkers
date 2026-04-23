import Image from 'next/image';
import Modal from '@/components/common/modal';
import Input from '@/components/common/form/Input';
import { ModalFrameProps } from '@/components/common/modal/types';
import { useToast } from '@/components/common/toast';
import { ModalMembersProps } from '../types';
import { MOCK_MEMBERS } from '../constants';
import { TeamMemberListContent } from './TeamMemberList';

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

// 멤버 초대
export function ModalMembersInvite({ onClose }: ModalFrameProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('링크가 복사되었습니다.', 'success');
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
  if (!member) return null;

  return (
    <Modal
      onClose={onClose}
      primaryButtonText="이메일 복사하기"
      onPrimaryButtonClick={handleCopyEmail}
      subButtonText="멤버 삭제"
      onSubButtonClick={onPrimaryButtonClick}
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

// 멤버 삭제
export function ModalMemberDelete({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="멤버를 삭제하시겠어요?"
      hasIcon
      onClose={onClose}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      subButtonText="삭제하기"
      onSubButtonClick={onPrimaryButtonClick}
    />
  );
}

// 할일 추가
export function ModalTaskAdd({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="할 일 목록 추가"
      onClose={onClose}
      primaryButtonText="만들기"
      onPrimaryButtonClick={onPrimaryButtonClick}
    >
      <Input placeholder="할 일 목록 명을 입력해주세요." />
    </Modal>
  );
}

// 할일 삭제
export function ModalTodoDelete({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="할 일을 삭제하시겠어요?"
      hasIcon
      onClose={onClose}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      subButtonText="삭제하기"
      onSubButtonClick={onPrimaryButtonClick}
    />
  );
}

// 팀 삭제
export function ModalTeamDelete({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="팀을 삭제하시겠어요?"
      description="팀에 관련한 모든 정보가 삭제됩니다."
      hasIcon
      onClose={onClose}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      subButtonText="삭제"
      onSubButtonClick={onPrimaryButtonClick}
    />
  );
}

// 팀 나가기
export function ModalTeamLeave({
  onClose,
  onPrimaryButtonClick,
}: ModalMembersProps) {
  return (
    <Modal
      title="팀에서 나가시겠어요?"
      hasIcon
      onClose={onClose}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      subButtonText="나가기"
      onSubButtonClick={onPrimaryButtonClick}
    />
  );
}
