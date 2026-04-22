export type BadgeStatus = 'start' | 'ongoing' | 'done';

export type BadgeProps = {
  completed: number;
  total: number;
  className?: string;
};

export type ProgressCircleProps = {
  percentage: number;
  status: BadgeStatus;
};
