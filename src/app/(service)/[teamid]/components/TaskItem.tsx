import Image from 'next/image';

import { TaskItemProps } from '@/app/(service)/[teamid]/types';
import { icMoreVerticalGray } from '@/assets/index';
import { Badge } from '@/components/common/badge';
import { ListDropdown } from '@/components/common/dropdown';

import { useModalState } from '../hooks/useModalState';

import { ModalTodoDelete } from './ModalMembers';

export default function TaskItem({ title }: TaskItemProps) {
  const dropdownButton = (
    <Image
      src={icMoreVerticalGray}
      alt="드롭다운 버튼"
      width="24"
      height="24"
    />
  );

  const { open, close, is } = useModalState();
  const DropdownItems = [
    { label: '수정하기', onClick: () => {} },
    {
      label: '삭제하기',
      onClick: () => {
        open('todoDelete');
      },
    },
    // TODO : 삭제 기능 추가되면 추가할 예쩡
  ];
  return (
    <div>
      <div className="bg-background-inverse p-6 pr-3 rounded-2xl border border-border-secondary flex flex-col gap-4">
        <div className="flex gap-3 items-center justify-center">
          <p className="flex-1 text-text-primary text-sm font-semibold whitespace-nowrap">
            {title}
          </p>
          <div>
            <Badge completed={3} total={5} />
          </div>
          <div className="w-6 h-6 shrink-0">
            <ListDropdown trigger={dropdownButton} items={DropdownItems} />
          </div>
        </div>
        <div>인영님이 해주실 Todo 리스트!</div>
        {/** TODO: 인영님이 List 해주시면 적용할 예정*/}
      </div>

      {is('todoDelete') && <ModalTodoDelete onClose={close} />}
    </div>
  );
}
