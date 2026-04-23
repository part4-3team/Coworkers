import type { ReactNode } from 'react';

export type EditDeleteModalProps = {
  className?: string;
  deleteLabel?: string;
  editLabel?: string;
  onDelete: () => void;
  onEdit: () => void;
};

export type ModalFrameProps = {
  children?: ReactNode;
  hasIcon?: boolean;
  hasCloseButton?: boolean;
  title?: string;
  subTitle?: string;
  description?: string;
  subDescription?: string;
  onClose?: () => void;
  lineButtonText?: string;
  onLineButtonClick?: () => void;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  subButtonText?: string;
  onSubButtonClick?: () => void;
  isButtonAlign?: boolean;
};
