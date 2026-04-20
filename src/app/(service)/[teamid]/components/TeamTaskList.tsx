// task/TeamTaskList.tsx
import TaskGroup from './TaskGroup';

const STATUS = ['시작 전', '진행 중', '완료'] as const;

export default function TeamTaskList() {
  return (
    <section>
      <h2>할일 목록</h2>
      {STATUS.map((status) => (
        <TaskGroup key={status} status={status} />
      ))}
    </section>
  );
}
