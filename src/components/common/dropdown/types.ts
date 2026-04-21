/** 드롭다운 컴포넌트에서 사용하는 타입 정의입니다. */

export type ListDropdownItem = {
  label: string;
  onClick: () => void;
};

export type ListDropdownProps = {
  trigger: React.ReactNode;
  items: ListDropdownItem[];
  className?: string;
  menuClassName?: string;
};

export type SelectDropdownItem<T extends string> = {
  label: string;
  value: T;
};

export type SelectDropdownProps<T extends string> = {
  items: SelectDropdownItem<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
};
