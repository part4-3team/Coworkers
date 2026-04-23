import { BADGE_STATUS } from '@/components/common/badge/constants';

export type BadgeStatus = (typeof BADGE_STATUS)[keyof typeof BADGE_STATUS];

export type BadgeProps = {
  completed: number;
  total: number;
  className?: string;
};

export type ProgressCircleProps = {
  percentage: number;
  status: BadgeStatus;
};
