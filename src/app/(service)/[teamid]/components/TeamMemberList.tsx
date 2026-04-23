import MemberCard from './MemberCard';
import { MOCK_MEMBERS } from '../constants';
import { MemberChipsProps } from '../types';
import { useModalState } from '../hooks/useModalState';
import { ModalMembersInvite, ModalMemberDetail } from './ModalMembers';

export default function TeamMemberList() {
  const { open, close, is } = useModalState();

  return (
    <section className="hidden xl:flex w-60 bg-background-inverse mt-11 px-5 py-6 rounded-2xl border border-border-secondary shrink-0 flex-col gap-4 h-fit min-h-28">
      <div className="flex justify-between items-center">
        <h2 className="text-text-primary text-base font-medium">
          멤버{' '}
          <span className="text-text-default font-normal">
            ({MOCK_MEMBERS.members.length}명)
          </span>
        </h2>
        <button
          className="text-brand-primary font-semibold text-sm"
          onClick={() => {
            open('memberInvite');
          }}
        >
          초대하기 +
        </button>
      </div>
      <TeamMemberListContent members={MOCK_MEMBERS.members} />
      {/** 우선 목데이터로 유저 리스트만들어둔 상태
       * Todo : 유저 데이터 불러오면 목데이터 삭제 후 데이터 연결할 예정
       */}

      {is('memberInvite') && <ModalMembersInvite onClose={close} />}
    </section>
  );
}

export function TeamMemberListContent({
  members,
}: {
  members: MemberChipsProps[];
}) {
  const { is, openMemberDetail, selectedMember, close } = useModalState();
  return (
    <div className="flex flex-col gap-4.5">
      {members.map((item: MemberChipsProps) => (
        <MemberCard
          key={item.userEmail}
          userImage={item.userImage}
          name={item.userName}
          email={item.userEmail}
          onClick={() => openMemberDetail(item)}
        />
      ))}
      {/* 멤버 선택시 선택한 멤버 Detail 모달 발생 */}
      {is('memberDetail') && (
        <ModalMemberDetail onClose={close} member={selectedMember} />
      )}
    </div>
  );
}
