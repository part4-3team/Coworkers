import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
};

export type TitleInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

export type ContentTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    errorMessage?: string;
    button?: ReactNode;
  };

export type CommentInputProps = {
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onSubmit?: (value: string) => void;
};

export type DatePickerProps = {
  id?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
};
