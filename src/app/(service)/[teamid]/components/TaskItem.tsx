import { TaskItemProps } from '@/app/(service)/[teamid]/types';

export default function TaskItem({ title, status }: TaskItemProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{status}</span>
    </div>
  );
}
