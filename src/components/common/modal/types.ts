import type { ReactNode } from 'react';

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
