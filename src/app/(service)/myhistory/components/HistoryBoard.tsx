'use client';

/**
 * 월별 히스토리 목록 카드 영역을 렌더링하는 컴포넌트입니다.
 */

import HistoryDateSection from '@/app/(service)/myhistory/components/HistoryDateSection';
import HistoryFilterTabs from '@/app/(service)/myhistory/components/HistoryFilterTabs';
import HistoryMonthNavigator from '@/app/(service)/myhistory/components/HistoryMonthNavigator';
import { MY_HISTORY_FILTERS } from '@/app/(service)/myhistory/constants';
import useHistoryBoard from '@/app/(service)/myhistory/hooks/useHistoryBoard';
import { cn } from '@/utils/cn';

type HistoryBoardProps = {
  activeFilterId: string | null;
  onSelectFilter: (filterId: string) => void;
};

export default function HistoryBoard({
  activeFilterId,
  onSelectFilter,
}: HistoryBoardProps) {
  const { datedHistorySections, hasTasks, selectedDate, setSelectedDate } =
    useHistoryBoard(activeFilterId);

  return (
    <section
      className={cn(
        'w-full rounded-[20px] bg-background-inverse px-4.5 py-8 min-[411px]:px-6 md:px-13 md:py-13 2xl:w-189.5 2xl:shrink-0 2xl:px-9 2xl:py-12',
        !hasTasks && 'flex min-h-162.5 flex-col md:min-h-230 2xl:min-h-192',
      )}
    >
      <HistoryMonthNavigator
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="mt-8 2xl:hidden">
        <HistoryFilterTabs
          activeFilterId={activeFilterId}
          filters={MY_HISTORY_FILTERS}
          onSelectFilter={onSelectFilter}
        />
      </div>

      {hasTasks ? (
        <div className="mt-9 md:mt-12 2xl:mt-10">
          {datedHistorySections.map((section) => (
            <HistoryDateSection key={section.id} section={section} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center">
          <div className="text-center text-sm font-normal text-text-default">
            <p>아직 완료된 작업이 없어요.</p>
            <p className="mt-2">하나씩 완료해가며 히스토리를 만들어보세요!</p>
          </div>
        </div>
      )}
    </section>
  );
}
