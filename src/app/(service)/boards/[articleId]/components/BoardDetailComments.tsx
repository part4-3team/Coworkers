'use client';

import BoardDetailCommentItem from '@/app/(service)/boards/[articleId]/components/BoardDetailCommentItem';
import type {
  Comment,
  CommentListResponse,
} from '@/app/(service)/boards/[articleId]/types';
import CommentInput from '@/components/common/form/components/CommentInput';

export default function BoardDetailComments({
  commentList,
}: {
  commentList: CommentListResponse;
}) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold text-text-primary md:text-lg">
          댓글
        </span>
        <span className="text-sm font-bold text-brand-primary md:text-lg">
          {commentList.list.length}
        </span>
      </div>
      <CommentInput
        id="comment-input"
        placeholder="댓글을 달아주세요"
        className="flex items-center mt-3 md:mt-4"
      />
      {commentList.list.length > 0 ? (
        <div className="mt-7 md:mt-9">
          <ul>
            {commentList.list.map((comment: Comment) => (
              <BoardDetailCommentItem key={comment.id} comment={comment} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="pt-5 border-t border-background-tertiary mt-7 md:mt-9">
          <span className="block text-sm font-normal text-text-default text-center py-12.5 md:py-20 lg:py-12.5">
            아직 작성된 댓글이 없습니다.
          </span>
        </div>
      )}
    </div>
  );
}
