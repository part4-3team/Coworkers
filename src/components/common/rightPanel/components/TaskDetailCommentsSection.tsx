import TaskDetailCommentInput from '@/components/common/rightPanel/components/TaskDetailCommentInput';
import TaskDetailCommentItem from '@/components/common/rightPanel/components/TaskDetailCommentItem';
import type { RightPanelComment } from '@/components/common/rightPanel/types';

type TaskDetailCommentsSectionProps = {
  commentCount: number;
  comments: readonly RightPanelComment[];
  draftCommentContent: string;
  editingCommentId: string | null;
  onCancelCommentEdit: () => void;
  onChangeDraftCommentContent: (value: string) => void;
  onDeleteComment: (commentId: string) => void;
  onStartCommentEdit: (comment: RightPanelComment) => void;
  onSubmitCommentEdit: () => void;
};

export default function TaskDetailCommentsSection({
  commentCount,
  comments,
  draftCommentContent,
  editingCommentId,
  onCancelCommentEdit,
  onChangeDraftCommentContent,
  onDeleteComment,
  onStartCommentEdit,
  onSubmitCommentEdit,
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
            isEditing={editingCommentId === comment.id}
            onCancelEdit={onCancelCommentEdit}
            onChangeDraftContent={onChangeDraftCommentContent}
            onDelete={() => {
              onDeleteComment(comment.id);
            }}
            onStartEdit={() => {
              onStartCommentEdit(comment);
            }}
            onSubmitEdit={onSubmitCommentEdit}
          />
        ))}
      </ul>
    </section>
  );
}
