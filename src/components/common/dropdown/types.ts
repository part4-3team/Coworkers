/** 드롭다운 컴포넌트에서 사용하는 타입 정의입니다. */

export type ListDropdownItem = {
  label: string;
  onClick: () => void;
};

/** 메뉴 항목 라벨 정렬. 기본 center(수정·삭제 등). start는 긴 문구·반복 설정 등 왼쪽 정렬에 사용 */
export type ListDropdownItemTextAlign = 'center' | 'start';

export type ListDropdownProps = {
  trigger: React.ReactNode;
  items: ListDropdownItem[];
  className?: string;
  itemClassName?: string;
  menuClassName?: string;
  itemTextAlign?: ListDropdownItemTextAlign;
  horizontalAlign?: 'start' | 'end';
  verticalPosition?: 'top' | 'bottom';
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
