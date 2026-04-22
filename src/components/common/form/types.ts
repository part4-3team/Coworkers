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

export type ContentInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errorMessage?: string;
  button?: ReactNode;
};

export type DatePickerProps = {
  id?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
};

export type ProfileImageButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  buttonText?: string;
  onChange?: (file: File | null) => void;
};
