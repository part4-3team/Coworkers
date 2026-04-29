'use client';

type TaskListTaskDetailCommentActionsProps = {
  onCancel: () => void;
  onPrimaryAction: () => void;
  primaryLabel: string;
};

export default function TaskListTaskDetailCommentActions({
  onCancel,
  onPrimaryAction,
  primaryLabel,
}: TaskListTaskDetailCommentActionsProps) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-3 text-sm font-medium text-text-default">
      <button
        data-allow-unsaved="true"
        type="button"
        className="text-text-default"
        onClick={onCancel}
      >
        취소
      </button>
      <button
        data-allow-unsaved="true"
        type="button"
        className="h-8 rounded-lg border border-brand-primary px-3 text-brand-primary"
        onClick={onPrimaryAction}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
