import TaskDetailCommentInput from '@/components/common/rightPanel/components/TaskDetailCommentInput';
import TaskDetailCommentItem from '@/components/common/rightPanel/components/TaskDetailCommentItem';
import type { RightPanelComment } from '@/components/common/rightPanel/types';

type TaskDetailCommentsSectionProps = {
  activeCommentActionId: string | null;
  commentCount: number;
  comments: readonly RightPanelComment[];
  draftCommentContent: string;
  editingCommentId: string | null;
  onCancelCommentAction: () => void;
  onCancelCommentEdit: () => void;
  onChangeDraftCommentContent: (value: string) => void;
  onStartCommentEdit: (comment: RightPanelComment) => void;
  onSubmitCommentEdit: () => void;
  onToggleCommentAction: (commentId: string) => void;
};

export default function TaskDetailCommentsSection({
  activeCommentActionId,
  commentCount,
  comments,
  draftCommentContent,
  editingCommentId,
  onCancelCommentAction,
  onCancelCommentEdit,
  onChangeDraftCommentContent,
  onStartCommentEdit,
  onSubmitCommentEdit,
  onToggleCommentAction,
}: TaskDetailCommentsSectionProps) {
  return (
    <section className="mt-8 md:mt-9">
      <h3 className="text-lg font-bold text-text-primary md:text-xl">
        댓글 <span className="text-brand-primary">{commentCount}</span>
      </h3>

      <div className="mt-4">
        <TaskDetailCommentInput />
      </div>

      <ul className="mt-5 divide-y divide-background-tertiary">
        {comments.map((comment) => (
          <TaskDetailCommentItem
            key={comment.id}
            comment={comment}
            draftContent={draftCommentContent}
            isActionOpen={activeCommentActionId === comment.id}
            isEditing={editingCommentId === comment.id}
            onCancelAction={onCancelCommentAction}
            onCancelEdit={onCancelCommentEdit}
            onChangeDraftContent={onChangeDraftCommentContent}
            onStartEdit={() => {
              onStartCommentEdit(comment);
            }}
            onSubmitEdit={onSubmitCommentEdit}
            onToggleAction={() => {
              onToggleCommentAction(comment.id);
            }}
          />
        ))}
      </ul>
    </section>
  );
}
