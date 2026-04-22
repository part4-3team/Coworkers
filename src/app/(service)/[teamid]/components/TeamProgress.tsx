import Image from 'next/image';
import MemberChip from './MemberChip';
import { icSettingsLarge } from '@/assets/index';
import { MOCK_MEMBERS } from '../constants';
import ProgressBar from '@ramonak/react-progress-bar';
import { ListDropdown } from '@/components/common/dropdown';
import { useModalState } from '../hooks/useModalState';
import {
  ModalMembers,
  ModalMembersInvite,
  ModalTeamDelete,
  ModalTeamLeave,
} from './ModalMembers';
import { useRouter, useParams } from 'next/navigation';

export default function TeamProgress() {
  const router = useRouter();
  const params = useParams();

  const settingButton = (
    <Image src={icSettingsLarge} width="24" height="24" alt="설정 아이콘" />
  );
  const { open, close, handleInvite, is } = useModalState();

  const MasterItems = [
    { label: '수정하기', onClick: () => router.push(`/${params.teamid}/edit`) },
    { label: '삭제하기', onClick: () => open('teamDelete') },
  ];
  const memberItems = [
    { label: '팀 나가기', onClick: () => open('teamLeave') },
  ];

  return (
    <section className="w-full bg-background-inverse p-6 flex flex-col gap-5 md:rounded-[20px]">
      <div className="flex gap-3 items-center">
        <h2 className="text-text-primary font-bold text-xl md:text-2xl">
          경영관리팀
        </h2>
        <div className="flex justify-between flex-1 items-center xl:hidden">
          <button onClick={() => open('memberList')}>
            <MemberChip members={MOCK_MEMBERS.members} />
          </button>
          <ListDropdown
            trigger={settingButton}
            items={MasterItems}
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between">
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
              </p>
            </div>
            <div className="pl-4 flex flex-col gap-1 justify-center items-center">
              <span className="text-xs font-medium text-interaction-inactive md:text-sm">
                완료 🙌
              </span>
              <p className="text-2xl text-brand-primary font-bold md:text-[32px]">
                5
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full h-5 md:h-7">
            <ProgressBar
              completed="25"
              bgColor="var(--color-brand-primary)"
              baseBgColor="var(--color-background-secondary)"
              height="100%"
              labelSize="0px"
              animateOnRender
              transitionDuration="1s"
            ></ProgressBar>
          </div>
          <div className="hidden xl:block">
            <ListDropdown
              trigger={settingButton}
              items={MasterItems}
              className=""
            />
          </div>
        </div>
      </div>
      {is('memberList') && (
        <ModalMembers onClose={close} onPrimaryButtonClick={handleInvite} />
      )}
      {is('memberInvite') && <ModalMembersInvite onClose={close} />}
      {is('teamDelete') && <ModalTeamDelete onClose={close} />}
      {is('teamLeave') && <ModalTeamLeave onClose={close} />}
    </section>
  );
}
