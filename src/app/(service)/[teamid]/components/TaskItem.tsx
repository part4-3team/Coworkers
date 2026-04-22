import { TaskItemProps } from '@/app/(service)/[teamid]/types';
import Image from 'next/image';
import { icMoreVerticalGray } from '@/assets/index';
import { ListDropdown } from '@/components/common/dropdown';

export default function TaskItem({ title }: TaskItemProps) {
  const dropdownButton = (
    <Image
      src={icMoreVerticalGray}
      alt="드롭다운 버튼"
      width="24"
      height="24"
    />
  );

  const DropdownItems = [
    { label: '수정하기', onClick: () => {} },
    { label: '삭제하기', onClick: () => {} },
  ];
  return (
    <div>
      <div className="bg-background-inverse p-6 pr-3 rounded-2xl border border-border-secondary">
        <div className="flex gap-3">
          <p
            className="flex-1 text-text-primary text-sm font-semibold whitespace-nowrap
"
          >
            {title}
          </p>
          <div>종인님이 해주실 badge</div>
          <div className="w-6 h-6 shrink-0">
            <ListDropdown
              trigger={dropdownButton}
              items={DropdownItems}
              className=""
            />
          </div>
        </div>
        <div>인영님이 해주실 Todo 리스트!</div>
      </div>
    </div>
  );
}
