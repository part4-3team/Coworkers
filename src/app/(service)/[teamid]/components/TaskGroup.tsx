import { ModalTaskAdd } from '@/app/(service)/[teamid]/components/modals/ModalTaskAddEdit';
import TaskItem from '@/app/(service)/[teamid]/components/TaskItem';
import { useModalState } from '@/app/(service)/[teamid]/hooks/useModalState';
import { TaskProps } from '@/app/(service)/[teamid]/types';
import { IcPlusSub } from '@/assets/index';

export default function TaskGroup({ status }: TaskProps) {
  const { open, close, is } = useModalState();

  return (
    <div className="flex flex-col gap-5 min-w-0 xl:flex-1">
      <div className="flex justify-between items-center bg-background-tertiary rounded-xl pl-5 pr-2 h-9.5 w-full">
        <h3 className="text-text-primary text-sm font-medium">{status}</h3>
        <button
          className="border border-border-secondary rounded-lg bg-background-inverse w-6 h-6 flex justify-center items-center"
          onClick={() => open('taskAdd')}
        >
          <IcPlusSub
            width="16"
            height="16"
            role="img"
            aria-label="할일 추가 버튼"
          />
        </button>
      </div>
      <TaskItem title="법인 설립" status={status} />

      {is('taskAdd') && <ModalTaskAdd onClose={close} />}
      {/** tasks.map  TODO: 데이터 불러와소 map으로 나열할 예정*/}
    </div>
  );
}
