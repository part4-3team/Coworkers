import { useParams, useRouter } from 'next/navigation';

import MemberChip from '@/app/(service)/[teamid]/components/MemberChip';
import { ConfirmModal } from '@/app/(service)/[teamid]/components/modals/ConfirmModal';
import { ModalMemberDetail } from '@/app/(service)/[teamid]/components/modals/ModalMemberDetails';
import { ModalMembersInvite } from '@/app/(service)/[teamid]/components/modals/ModalMemberInvite';
import { ModalMembers } from '@/app/(service)/[teamid]/components/modals/ModalMembers';
import {
  MOCK_MEMBERS,
  SETTING_BUTTON,
} from '@/app/(service)/[teamid]/constants';
import { useModalState } from '@/app/(service)/[teamid]/hooks/useModalState';
import { ListDropdown } from '@/components/common/dropdown';

import TeamProgressBar from './TeamProgressBar';

export default function TeamProgress() {
  const router = useRouter();
  const params = useParams();

  const { open, close, is, openMemberDetail, selectedMember } = useModalState();

  // 현재 유저 상태가 나뉘어 있지 않아 임시로 구성함
  const masterItems = [
    { label: '수정하기', onClick: () => router.push(`/${params.teamid}/edit`) },
    { label: '삭제하기', onClick: () => open('teamDelete') },
  ];
  const memberItems = [
    { label: '팀 나가기', onClick: () => open('teamLeave') },
  ];
  // TODO: 추후에 유저 상태 나뉘면 유저에 따라 드롭다운 구분할 예정

  return (
    <section className="w-full bg-background-inverse p-6 shadow-[0_4px_10px_rgba(49,84,153,0.06)] md:rounded-[20px] xl:shadow-[0_8px_20px_rgba(49,84,153,0.12)]">
      <div className="flex gap-3 items-center">
        <h2 className="text-text-primary font-bold text-xl md:text-2xl">
          경영관리팀
        </h2>
        <div className="flex justify-between flex-1 items-center xl:hidden">
          <button onClick={() => open('memberList')}>
            <MemberChip members={MOCK_MEMBERS.members} />
          </button>
          <ListDropdown trigger={SETTING_BUTTON} items={masterItems} />
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between xl:pr-10">
          <div>
            <p className="text-xs font-medium text-interaction-inactive md:text-sm">
              오늘의 진행 상황
            </p>
            <p className="text-[32px] font-bold text-brand-primary  md:text-[40px]">
              25%
            </p>
          </div>
          <div className="flex items-end">
            <div className="px-4 flex flex-col gap-1 justify-center items-center border-r border-background-tertiary">
              <span className="text-xs font-medium text-interaction-inactive md:text-sm">
                오늘의 할 일
              </span>
              <p className="text-2xl text-text-default font-bold  md:text-[32px]">
                20
                {/* TODO: 데이터 가져오면 교체 예정*/}
              </p>
            </div>
            <div className="pl-4 flex flex-col gap-1 justify-center items-center">
              <span className="text-xs font-medium text-interaction-inactive md:text-sm">
                완료 🙌
              </span>
              <p className="text-2xl text-brand-primary font-bold md:text-[32px]">
                5{/* TODO: 데이터 가져오면 교체 예정*/}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full h-5 md:h-7">
            <TeamProgressBar />
          </div>
          <div className="hidden xl:block">
            <ListDropdown
              trigger={SETTING_BUTTON}
              items={memberItems}
              className=""
            />
          </div>
        </div>
      </div>
      {/* 각 레이어 불러오기 */}
      {is('memberList') && (
        <ModalMembers
          onClose={close}
          onMemberClick={(member) => {
            close();
            openMemberDetail(member);
          }}
        />
      )}
      {is('memberDetail') && (
        <ModalMemberDetail onClose={close} member={selectedMember} />
      )}
      {is('memberInvite') && <ModalMembersInvite onClose={close} />}
      {is('teamDelete') && (
        <ConfirmModal
          onClose={close}
          title="해당 팀을 삭제하시겠습니까?"
          description="팀 관련 모든 정보가 삭제됩니다."
          confirmText="삭제"
          toastMessage="삭제 되었습니다."
        />
      )}
      {is('teamLeave') && (
        <ConfirmModal
          onClose={close}
          title="해당 팀에서 나가시겠어요?"
          confirmText="팀 나가기"
          toastMessage="팀에서 나가기 되었습니다."
        />
      )}
    </section>
  );
}
