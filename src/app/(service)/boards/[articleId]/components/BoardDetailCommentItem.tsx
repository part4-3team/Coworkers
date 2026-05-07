import CommentEditingContent from '@/app/(service)/boards/[articleId]/components/CommentEditingContent';
import CommentReadonlyContent from '@/app/(service)/boards/[articleId]/components/CommentReadonlyContent';
import { useBoardDetailCommentItem } from '@/app/(service)/boards/[articleId]/hooks/useBoardDetailCommentItem';
import type {
  Comment,
  UserProfileResponse,
} from '@/app/(service)/boards/[articleId]/types';

export default function BoardDetailCommentItem({
  comment,
  userProfile,
}: {
  comment: Comment;
  userProfile: UserProfileResponse;
}) {
  const {
    isOwnComment,
    isEditing,
    isDeleteModalOpen,
    menuItems,
    handleEdit,
    handleCancelEdit,
    editedContent,
    handleEditedContentChange,
    handleDeleteConfirm,
    setIsDeleteModalOpen,
  } = useBoardDetailCommentItem({ comment, userProfile });

  return (
    <>
      {isOwnComment && isEditing ? (
        <CommentEditingContent
          comment={comment}
          editedContent={editedContent}
          onChangeEditedContent={handleEditedContentChange}
          onCancelEdit={handleCancelEdit}
          onEdit={handleEdit}
        />
      ) : (
        <CommentReadonlyContent
          comment={comment}
          menuItems={menuItems}
          isDeleteModalOpen={isDeleteModalOpen}
          onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
          onDeleteConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}
