/**
 * 하나의 할 일 목록 그룹과 완료 항목을 렌더링하는 컴포넌트입니다.
 */

import HistoryTaskCard from '@/app/(service)/myhistory/components/HistoryTaskCard';
import type { HistoryTaskGroupProps } from '@/app/(service)/myhistory/types';

export default function HistoryTaskGroup({ group }: HistoryTaskGroupProps) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <h3 className="text-base font-bold text-text-primary 2xl:text-lg">
          {group.title}
        </h3>
        <span className="text-sm font-medium text-interaction-inactive md:text-base">
          {group.teamName}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:mt-3">
        {group.tasks.map((task) => (
          <HistoryTaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
