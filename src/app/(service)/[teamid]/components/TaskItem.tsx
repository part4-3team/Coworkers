import { TaskItemProps } from '@/app/(service)/[teamid]/types';
import Image from 'next/image';
import { icMoreVerticalGray } from '@/assets/index';

export default function TaskItem({ title }: TaskItemProps) {
  return (
    <div>
      <div className="bg-background-inverse p-6 rounded-2xl border border-border-secondary">
        <div className="flex gap-3">
          <p
            className="flex-1 text-text-primary text-sm font-semibold whitespace-nowrap
"
          >
            {title}
          </p>
          <div>종인님이 해주실 badge</div>
          <button className="w-6 h-6 shrink-0">
            <Image
              src={icMoreVerticalGray}
              alt="드롭다운 버튼"
              width="24"
              height="24"
            />
          </button>
        </div>
        <div>인영님이 해주실 Todo 리스트!</div>
      </div>
    </div>
  );
}
