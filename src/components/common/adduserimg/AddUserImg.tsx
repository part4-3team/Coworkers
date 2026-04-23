/**
 * 공용 유저 이미지 등록 컴포넌트입니다.
 */
'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { icUserXlarge, icProfileEditLarge } from '@/assets/index';
import { ImgAddButtonProps } from './types';

export default function AddUserImg({ src, onChangeFile }: ImgAddButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [localImgSrc, setLocalImgSrc] = useState<string | null>(null);
  const imgSrc = localImgSrc ?? src ?? null;

  useEffect(() => {
    return () => {
      if (localImgSrc) {
        URL.revokeObjectURL(localImgSrc);
      }
    };
  }, [localImgSrc]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    const imgFileURL = URL.createObjectURL(imgFile);
    setLocalImgSrc(imgFileURL);
    onChangeFile?.(imgFile);
  }

  return (
    <div className="w-fit mx-auto">
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-16 h-16 md:w-25 md:h-25 relative"
      >
        <div className="bg-border-secondary border-2 border-border-primary rounded-[20px] flex justify-center items-center w-full h-full md:rounded-4xl overflow-hidden">
          {!imgSrc && (
            <Image
              src={icUserXlarge}
              alt="프로필 기본 이미지"
              width="64"
              height="64"
              className="w-10 h-10 md:w-16 md:h-16"
            />
          )}

          {imgSrc && (
            <Image
              src={imgSrc}
              alt="유저 프로필 이미지"
              width="98"
              height="98"
              className="object-cover h-full"
            />
          )}
        </div>
        <Image
          src={icProfileEditLarge}
          alt="프로필 수정"
          width="32"
          height="32"
          className="absolute bottom-0 -right-1 border-2 border-background-secondary rounded-3xl w-5 h-5 md:w-8 md:h-8 md:-right-2 md:border-0"
        />
      </button>
    </div>
  );
}
