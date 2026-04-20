/**
 * 랜딩 페이지에서 사용하는 TypeScript 타입을 정의하는 파일입니다.
 */

import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type LandingTaskColumnImage = {
  alt: string;
  image: StaticImageData;
};

export type LandingFeatureSectionData = {
  description: string;
  eyebrow: string;
  image?: StaticImageData;
  imageAlt?: string;
  title: string;
};

export type LandingFeatureSectionProps = {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  image?: StaticImageData;
  imageAlt?: string;
  imagePlacement?: 'start' | 'end';
  isTextInverse?: boolean;
  title: string;
  variant?: 'default' | 'brand' | 'muted';
};
