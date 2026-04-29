'use client';

import {
  DATE_TIME_TIME_POPOVER_COLUMN_CLASS,
  DATE_TIME_TIME_POPOVER_OPTION_ACTIVE_CLASS,
  DATE_TIME_TIME_POPOVER_OPTION_CLASS,
} from '@/app/(service)/[teamid]/tasklist/createTaskModalConstants';
import { cn } from '@/utils/cn';

const TIME_PICKER_HOURS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, '0'),
);
const TIME_PICKER_MINUTES = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, '0'),
);

function getTimeParts(time: string) {
  const [hour = '00', minute = '00'] = time.split(':');

  return {
    hour: hour.padStart(2, '0'),
    minute: minute.padStart(2, '0'),
  };
}

type TaskListTimePopoverProps = {
  formId: string;
  selectedTime: string;
  onSelectTime: (value: string) => void;
};

export default function TaskListTimePopover({
  formId,
  selectedTime,
  onSelectTime,
}: TaskListTimePopoverProps) {
  const { hour, minute } = getTimeParts(selectedTime);

  return (
    <div
      className="grid grid-cols-2 gap-3"
      role="dialog"
      aria-label="시간 선택"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-text-secondary">시</p>
        <div className={DATE_TIME_TIME_POPOVER_COLUMN_CLASS}>
          {TIME_PICKER_HOURS.map((optionHour) => (
            <button
              key={optionHour}
              type="button"
              className={cn(
                DATE_TIME_TIME_POPOVER_OPTION_CLASS,
                optionHour === hour &&
                  DATE_TIME_TIME_POPOVER_OPTION_ACTIVE_CLASS,
              )}
              onClick={() => onSelectTime(`${optionHour}:${minute}`)}
            >
              {optionHour}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-text-secondary">분</p>
        <div className={DATE_TIME_TIME_POPOVER_COLUMN_CLASS}>
          {TIME_PICKER_MINUTES.map((optionMinute) => (
            <button
              key={optionMinute}
              type="button"
              aria-controls={`${formId}-time-value`}
              className={cn(
                DATE_TIME_TIME_POPOVER_OPTION_CLASS,
                optionMinute === minute &&
                  DATE_TIME_TIME_POPOVER_OPTION_ACTIVE_CLASS,
              )}
              onClick={() => onSelectTime(`${hour}:${optionMinute}`)}
            >
              {optionMinute}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
