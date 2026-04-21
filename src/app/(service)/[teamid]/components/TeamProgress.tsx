import Image from 'next/image';
import MemberChip from './MemberChip';
import { icSettingsLarge } from '@/assets/index';
import { MOCK_MEMBERS } from '../constants';
import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

export default function TeamProgress() {
  return (
    <section className="w-full bg-background-inverse p-6 flex flex-col gap-5 md:rounded-[20px]">
      <div className="flex gap-3">
        <h2 className="text-text-primary font-bold text-xl">경영관리팀</h2>
        <div className="flex justify-between flex-1 items-center lg:hidden">
          <MemberChip members={MOCK_MEMBERS.members} />
          <button>
            <Image
              src={icSettingsLarge}
              width="24"
              height="24"
              alt="설정 아이콘"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-medium text-interaction-inactive">
              오늘의 진행 상황
            </p>
            <p className="text-[32px] font-bold text-brand-primary">25%</p>
          </div>
          <div className="flex items-end">
            <div className="px-4 flex flex-col gap-1 justify-center items-center border-r border-background-tertiary">
              <span className="text-xs font-medium text-interaction-inactive">
                오늘의 할 일
              </span>
              <p className="text-2xl text-text-default font-bold">20</p>
            </div>
            <div className="pl-4 flex flex-col gap-1 justify-center items-center">
              <span className="text-xs font-medium text-interaction-inactive">
                완료 🙌
              </span>
              <p className="text-2xl text-brand-primary font-bold">5</p>
            </div>
          </div>
        </div>
        <div>
          <div className="h-[20px] md:h-[28px]">
            <ProgressBar
              completed="25"
              bgColor="var(--color-brand-primary)"
              baseBgColor="var(--color-background-secondary)"
              height="100%"
              labelSize="0px"
              animateOnRender
              transitionDuration="1s"
            ></ProgressBar>
          </div>
          <button className="hidden lg:block">
            <Image
              src={icSettingsLarge}
              width="24"
              height="24"
              alt="설정 아이콘"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
