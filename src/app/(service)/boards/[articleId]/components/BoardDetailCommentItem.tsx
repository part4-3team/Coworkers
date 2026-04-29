import { useState } from 'react';

import Image from 'next/image';

import {
  BOARD_DETAIL_DROPDOWN_ITEMS,
  BOARD_DETAIL_MENU,
} from '@/app/(service)/boards/[articleId]/constants';
import type { Comment } from '@/app/(service)/boards/[articleId]/types';
import { IcMoreVerticalLarge, IcUserLarge } from '@/assets';
import ListDropdown from '@/components/common/dropdown/components/ListDropdown';
import Modal from '@/components/common/modal';
import { useToast } from '@/components/common/toast';

export default function BoardDetailCommentItem({
  comment,
}: {
  comment: Comment;
}) {
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    /** TODO: 수정 기능 구현 로직 */
    showToast('수정 기능은 아직 구현되지 않았습니다.', 'success');
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);
    showToast('댓글이 삭제되었습니다.', 'error');
  };
  /**TODO: 수정, 삭제 기능 구현 및 로직 파일 분리해야 함 */
  const menuItems = BOARD_DETAIL_DROPDOWN_ITEMS.map((item) => ({
    ...item,
    onClick: () => {
      if (item.label === BOARD_DETAIL_MENU.EDIT) handleEdit();
      else if (item.label === BOARD_DETAIL_MENU.DELETE) handleDelete();
    },
  }));

  return (
    <li className="flex gap-4 py-3 border-t border-background-tertiary md:py-5">
      <div className="flex shrink-0 overflow-hidden rounded-lg bg-background-secondary w-7 h-7 md:w-9 md:h-9">
        {comment.writer.image ? (
          <Image
            src={comment.writer.image}
            alt={comment.writer.nickname}
            width={28}
            height={28}
            className="object-cover w-full h-full"
          />
        ) : (
          <IcUserLarge
            width={28}
            height={28}
            className="w-full h-full"
            role="img"
            aria-label={comment.writer.nickname}
          />
        )}
      </div>
      <div className="flex justify-between gap-2 w-full">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-bold text-text-primary">
            {comment.writer.nickname}
          </p>
          <p className="text-sm font-normal text-text-primary line-clamp-1">
            {comment.content}
          </p>
          <p className="text-sm font-medium text-interaction-inactive">
            {comment.createdAt}
          </p>
        </div>
        <div className="shrink-0">
          <ListDropdown
            trigger={
              <IcMoreVerticalLarge
                width={20}
                height={20}
                className="cursor-pointer shrink-0"
                role="img"
                aria-label="더보기 메뉴"
              />
            }
            items={menuItems}
          />
          {isDeleteModalOpen && (
            <Modal
              onClose={() => setIsDeleteModalOpen(false)}
              title="댓글을 삭제하시겠습니까?"
              description="댓글 정보가 삭제됩니다."
              lineButtonText="닫기"
              onLineButtonClick={() => setIsDeleteModalOpen(false)}
              subButtonText="삭제"
              onSubButtonClick={handleDeleteConfirm}
            />
          )}
        </div>
      </div>
    </li>
  );
}
