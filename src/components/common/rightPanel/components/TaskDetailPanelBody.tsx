import { ContentTextarea } from '@/components/common/form';
import TaskDetailCommentsSection from '@/components/common/rightPanel/components/TaskDetailCommentsSection';
import type { RightPanelComment } from '@/components/common/rightPanel/types';

type TaskDetailPanelBodyProps = {
  activeCommentActionId: string | null;
  commentCount: number;
  comments: readonly RightPanelComment[];
  description: string;
  draftCommentContent: string;
  draftDescription: string;
  editingCommentId: string | null;
  isTaskEditing: boolean;
  onCancelCommentAction: () => void;
  onCancelCommentEdit: () => void;
  onChangeDraftCommentContent: (value: string) => void;
  onChangeDraftDescription: (value: string) => void;
  onStartCommentEdit: (comment: RightPanelComment) => void;
  onSubmitCommentEdit: () => void;
  onToggleCommentAction: (commentId: string) => void;
};

export default function TaskDetailPanelBody({
  activeCommentActionId,
  commentCount,
  comments,
  description,
  draftCommentContent,
  draftDescription,
  editingCommentId,
  isTaskEditing,
  onCancelCommentAction,
  onCancelCommentEdit,
  onChangeDraftCommentContent,
  onChangeDraftDescription,
  onStartCommentEdit,
  onSubmitCommentEdit,
  onToggleCommentAction,
}: TaskDetailPanelBodyProps) {
  return (
    <div className="mt-6 border-t border-background-tertiary pt-6 md:mt-7 md:pt-7">
      {isTaskEditing ? (
        <ContentTextarea
          value={draftDescription}
          placeholder="내용을 입력하세요."
          className="min-h-24 md:min-h-28"
          onChange={(event) => {
            onChangeDraftDescription(event.target.value);
          }}
        />
      ) : (
        <p className="text-sm font-medium leading-6 text-text-secondary md:text-base">
          {description}
        </p>
      )}

      <TaskDetailCommentsSection
        activeCommentActionId={activeCommentActionId}
        commentCount={commentCount}
        comments={comments}
        draftCommentContent={draftCommentContent}
        editingCommentId={editingCommentId}
        onCancelCommentAction={onCancelCommentAction}
        onCancelCommentEdit={onCancelCommentEdit}
        onChangeDraftCommentContent={onChangeDraftCommentContent}
        onStartCommentEdit={onStartCommentEdit}
        onSubmitCommentEdit={onSubmitCommentEdit}
        onToggleCommentAction={onToggleCommentAction}
      />
    </div>
  );
}
