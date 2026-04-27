import MemberCard from '@/app/(service)/[teamid]/components/MemberCard';
import { ModalMemberDetail } from '@/app/(service)/[teamid]/components/modals/ModalMemberDetails';
import { ModalMembersInvite } from '@/app/(service)/[teamid]/components/modals/ModalMemberInvite';
import { MOCK_MEMBERS } from '@/app/(service)/[teamid]/constants';
import { useModalState } from '@/app/(service)/[teamid]/hooks/useModalState';
import {
  MemberChipsProps,
  TeamMemberListContentProps,
} from '@/app/(service)/[teamid]/types';
import { icUserXlarge } from '@/assets/index';

export default function TeamMemberList() {
  const { open, close, is, openMemberDetail, selectedMember } = useModalState();

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
      <TeamMemberListContent
        members={MOCK_MEMBERS.members}
        onMemberClick={(member) => {
          close(); // memberInvite 닫기
          openMemberDetail(member); // memberDetail 열기
        }}
      />
      {/** 우선 목데이터로 유저 리스트만들어둔 상태
       * Todo : 유저 데이터 불러오면 목데이터 삭제 후 데이터 연결할 예정
       */}

      {is('memberInvite') && <ModalMembersInvite onClose={close} />}

      {is('memberDetail') && (
        <ModalMemberDetail onClose={close} member={selectedMember} />
      )}
    </section>
  );
}

export function TeamMemberListContent({
  members,
  onMemberClick,
}: TeamMemberListContentProps) {
  return (
    <div className="flex flex-col gap-4.5">
      {members.map((item: MemberChipsProps) => (
        <MemberCard
          key={item.userEmail}
          userImage={item.userImage || icUserXlarge}
          name={item.userName}
          email={item.userEmail}
          onClick={() => onMemberClick(item)}
        />
      ))}
    </div>
  );
}
