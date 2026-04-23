/**
 * 오른쪽 패널 상세 화면 본문과 댓글 목록을 렌더링하는 컴포넌트입니다.
 */

'use client';

import { useState } from 'react';

import TaskDetailCommentInput from '@/components/common/rightPanel/components/TaskDetailCommentInput';
import TaskDetailCommentItem from '@/components/common/rightPanel/components/TaskDetailCommentItem';
import type { RightPanelComment } from '@/components/common/rightPanel/types';

type TaskDetailPanelBodyProps = {
  commentCount: number;
  comments: readonly RightPanelComment[];
  description: string;
};

export default function TaskDetailPanelBody({
  commentCount,
  comments,
  description,
}: TaskDetailPanelBodyProps) {
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const handleToggleCommentAction = (commentId: string) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className="space-y-8 md:space-y-9">
      <p className="text-sm font-medium leading-6 text-text-secondary md:text-base">
        {description}
      </p>

      <section>
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
              isActionOpen={activeCommentId === comment.id}
              onCloseAction={() => {
                setActiveCommentId(null);
              }}
              onToggleAction={() => {
                handleToggleCommentAction(comment.id);
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
