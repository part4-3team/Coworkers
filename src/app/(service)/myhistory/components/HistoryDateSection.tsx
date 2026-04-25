/**
 * 날짜 단위 히스토리 섹션을 렌더링하는 컴포넌트입니다.
 */

import HistoryTaskGroup from '@/app/(service)/myhistory/components/HistoryTaskGroup';
import type { MyHistoryDateSection } from '@/app/(service)/myhistory/types';

type HistoryDateSectionProps = {
  section: MyHistoryDateSection;
};

export default function HistoryDateSection({
  section,
}: HistoryDateSectionProps) {
  return (
    <section className="mt-12 first:mt-0">
      <div className="flex items-center gap-8">
        <div className="h-px flex-1 bg-background-tertiary" />
        <h2 className="shrink-0 text-sm font-medium text-text-default md:text-base">
          {section.date}
        </h2>
        <div className="h-px flex-1 bg-background-tertiary" />
      </div>

      <div className="mt-6 flex flex-col gap-10 md:mt-6 md:gap-9">
        {section.groups.map((group) => (
          <HistoryTaskGroup key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
