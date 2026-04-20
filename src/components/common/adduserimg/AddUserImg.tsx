/**
 * 공용 유저 이미지 등록 컴포넌트입니다.
 */
'use client';
import Image from 'next/image';
import { icUserLarge, icProfileEditLarge } from '@/assets/index';
import { useRef, useState } from 'react';
import { ImgAddButtonProps } from './type';

export default function AddUserImg({ src, onChangeFile }: ImgAddButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(src ?? null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0];

    if (!imgFile) return;

    const imgFileURL = URL.createObjectURL(imgFile);

    setImgSrc(imgFileURL);
    onChangeFile?.(imgFile);

    return () => {
      URL.revokeObjectURL(imgFileURL);
    };
  }

  return (
    <div className="w-fit ml-auto mr-auto">
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
              src={icUserLarge}
              alt="프로필 기본 이미지"
              width="40"
              height="40"
            />
          )}

          {imgSrc && (
            <Image
              src={imgSrc}
              alt="유저 프로필 이미지"
              width="98"
              height="98"
              className="object-cover h-full mx-1"
            />
          )}
        </div>
        <Image
          src={icProfileEditLarge}
          alt="프로필 기본 이미지"
          width="32"
          height="32"
          className="absolute bottom-0 -right-1 border-2 border-background-secondary rounded-3xl w-5 h-5 md:w-8 md:h-8 md:-right-2 md:border-0"
        />
      </button>
    </div>
  );
}
