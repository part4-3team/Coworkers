import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export type FloatingButtonProps = Omit<ButtonProps, 'children'> & {
  children?: ReactNode;
  buttonClassName?: string;
  dragBounds?: 'body' | string;
};
