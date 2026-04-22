import TaskItem from './TaskItem';
import { TaskProps } from '../types';
import Image from 'next/image';
import { icPlusSub } from '@/assets/index';
import { useModalState } from '../hooks/useModalState';
import { ModalTaskAdd } from './ModalMembers';

export default function TaskGroup({ status }: TaskProps) {
  const { open, close, is } = useModalState();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center bg-background-tertiary rounded-xl pl-5 pr-2 h-9.5">
        <h3 className="text-text-primary text-sm font-medium">{status}</h3>
        <button
          className="border border-border-secondary rounded-lg bg-background-inverse w-6 h-6 flex justify-center items-center"
          onClick={() => open('taskAdd')}
        >
          <Image src={icPlusSub} alt="할일 추가 버튼" width="16" height="16" />
        </button>
      </div>
      <TaskItem title="법인 설립" />
      {is('taskAdd') && <ModalTaskAdd onClose={close} />}
      {/* tasks.map */}
    </div>
  );
}
