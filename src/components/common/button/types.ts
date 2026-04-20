import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
};

export type FloatingButtonProps = Omit<ButtonProps, 'children'>;
