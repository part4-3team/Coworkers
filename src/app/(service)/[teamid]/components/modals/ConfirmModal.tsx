import Modal from '@/components/common/modal';
import { useToast } from '@/components/common/toast';

import { ConfirmModalProps } from '../../types';

export const ConfirmModal = ({
  title,
  description,
  confirmText,
  toastMessage,
  onClose,
  onConfirm,
  children,
}: ConfirmModalProps) => {
  const { showToast } = useToast();

  const handleConfirm = () => {
    showToast(toastMessage, 'error');

    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      title={title}
      description={description}
      hasIcon
      hasCloseButton={false}
      onClose={onClose}
      lineButtonText="취소"
      onLineButtonClick={onClose}
      subButtonText={confirmText}
      onSubButtonClick={handleConfirm}
    >
      {children}
    </Modal>
  );
};
