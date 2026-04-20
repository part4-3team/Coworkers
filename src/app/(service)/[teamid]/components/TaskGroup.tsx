import TaskItem from './TaskItem';

interface TaskGroupProps {
  status: '시작 전' | '진행 중' | '완료';
}

export default function TaskGroup({ status }: TaskGroupProps) {
  return (
    <div>
      <h3>{status}</h3>
      {/* tasks.map */}
    </div>
  );
}
