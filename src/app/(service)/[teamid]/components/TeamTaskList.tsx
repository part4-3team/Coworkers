// task/TeamTaskList.tsx
import TaskGroup from './TaskGroup';

const STATUS = ['시작 전', '진행 중', '완료'] as const;

export default function TeamTaskList() {
  return (
    <section className="w-full px-4 flex flex-col gap-4 md:px-0 xl:px-0">
      <h2 className="text-base text-text-primary font-medium xl:text-xl">
        할일 목록{' '}
        <span className="text-base text-text-default font-normal">(8개)</span>
      </h2>
      <div className="flex flex-col gap-8 w-full xl:flex-row xl:gap-4">
        {STATUS.map((status) => (
          <TaskGroup key={status} status={status} />
        ))}
      </div>
    </section>
  );
}
