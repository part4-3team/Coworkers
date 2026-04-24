import ModalFrame from '@/components/common/modal/components/ModalFrame';
import ModalPortal from '@/components/common/modal/components/ModalPortal';

type TaskDeleteConfirmModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskDeleteConfirmModal({
  onClose,
  onConfirm,
}: TaskDeleteConfirmModalProps) {
  return (
    <ModalPortal>
      <ModalFrame
        hasIcon
        hasCloseButton={false}
        title="한일을 삭제하시겠습니까?"
        description="한일 정보가 삭제됩니다."
        lineButtonText="닫기"
        onLineButtonClick={onClose}
        subButtonText="삭제"
        onSubButtonClick={onConfirm}
        onClose={onClose}
      />
    </ModalPortal>
  );
}
