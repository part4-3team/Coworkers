/**
 * 모달의 공통 프레임을 담당하는 컴포넌트입니다.
 */
'use client';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { icCloseMedium, icAlertCircleLarge } from '@/assets/index';
import { useState } from 'react';

type ModalFrameProps = {
  children?: ReactNode;
  icon?: boolean;
  showCloseButton?: boolean; // 1. 닫기 버튼 유무
  title?: string; // 2. 타이틀
  subTitle?: string; // 3. 서브타이틀
  description?: string; // 4. 기본문구 (진함)
  subDescription?: string; // 5. 서브문구 (회색)
  onClose?: () => void; // 6. 닫기 버튼 클릭 핸들러
  lineButtonText?: string; // 7. 라인버튼 텍스트
  onLineButtonClick?: () => void; // 7-2. 라인버튼 핸들러
  primaryButtonText?: string; // 8. 파란 버튼 텍스트
  onPrimaryButtonClick?: () => void; // 8-2. 파란 버튼 핸들러
  subButtonText?: string; // 9. 빨간 버튼 텍스트
  onSubButtonClick?: () => void; // 9-2. 빨간 버튼 핸들러
  buttonAlign?: boolean; //버튼 정렬 true는 1열 / false 2열
};
export default function ModalFrame({
  children,
  icon,
  showCloseButton = true,
  title,
  subTitle,
  description,
  subDescription,
  lineButtonText,
  onLineButtonClick,
  primaryButtonText,
  onPrimaryButtonClick,
  subButtonText,
  onSubButtonClick,
  buttonAlign,
  onClose,
}: ModalFrameProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000a] z-9999 px-4"
      onClick={onClose}
    >
      <div
        className="max-w-sm bg-white rounded-2xl p-6 pt-10 min-w-80 w-full relative text-center flex flex-col gap-4 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button className="absolute right-4 top-4" onClick={onClose}>
            <Image src={icCloseMedium} alt="모달 닫기" width="24" height="24" />
          </button>
        )}
        {icon && (
          <Image
            src={icAlertCircleLarge}
            alt="모달 닫기"
            width="24"
            height="24"
          />
        )}
        <div className="flex gap-1 items-center justify-center">
          {title && <p className="text-xl font-bold">{title}</p>}
          {subTitle && (
            <p className="text-base text-text-default">{subTitle}</p>
          )}
        </div>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
        {subDescription && (
          <p className="text-sm text-gray-400">{subDescription}</p>
        )}

        {children && <div>{children}</div>}

        <div
          className={`flex gap-2 mt-2 w-full ${buttonAlign ? 'flex-col px-4' : 'flex-row px-0'} `}
        >
          {lineButtonText && (
            <button
              className="border border-border-secondary rounded-xl px-4 py-2 w-full text-text-default font-medium"
              onClick={onLineButtonClick}
            >
              {lineButtonText}
            </button>
          )}
          {primaryButtonText && (
            <button
              className="bg-blue-500 rounded-xl px-4 py-2 w-full text-white font-medium"
              onClick={onPrimaryButtonClick}
            >
              {primaryButtonText}
            </button>
          )}
          {subButtonText && (
            <button
              className="bg-red-500 rounded-xl px-4 py-2 w-full text-white font-medium"
              onClick={onSubButtonClick}
            >
              {subButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
