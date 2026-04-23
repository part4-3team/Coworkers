import type { ReactNode } from 'react';

export type RightPanelComment = {
  author: string;
  content: string;
  id: string;
  meta: string;
};

export type RightPanelContent = {
  ariaLabel?: string;
  body: ReactNode;
  footer?: ReactNode;
  headerAction?: ReactNode;
  meta?: ReactNode;
  title: string;
};

export type RightPanelProps = RightPanelContent & {
  isRendered: boolean;
  isVisible: boolean;
  onClose: () => void;
};
