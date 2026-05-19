/** 이미지 크롭 canvas 변환 유틸 함수입니다. */

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** 5MB 파일 크기 제한 (바이트 단위) */
export const IMAGE_UPLOAD_MAX_SIZE = 5 * 1024 * 1024;

/**
 * 이미지 URL을 <img> 요소로 로드합니다.
 *
 * 현대 브라우저(Chrome 81+, Firefox 79+, Safari 14+)에서는
 * CSS image-orientation: from-image 가 기본값으로 적용되어,
 * naturalWidth/naturalHeight 및 drawImage() 모두 EXIF 회전이 반영된
 * 픽셀 데이터를 반환합니다. react-easy-crop도 동일한 기준을 사용하므로
 * 좌표계가 자동으로 일치합니다.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 고정 출력 크기 (px).
 * zoom 배율·원본 이미지 해상도에 관계없이 항상 이 크기로 저장됩니다.
 * - zoom=1: 넓은 영역을 300×300으로 축소
 * - zoom=2: 좁은 영역(더 확대된 부분)을 300×300으로 스트레칭 → 줌 반영
 */
const OUTPUT_SIZE = 300;

/**
 * 이미지 소스와 픽셀 크롭 영역을 받아 크롭된 File 객체를 반환합니다.
 * 출력 크기는 OUTPUT_SIZE × OUTPUT_SIZE 로 고정되므로 zoom 배율이
 * 항상 결과 이미지에 올바르게 반영됩니다.
 */
export async function getCroppedImageFile(
  imageSrc: string,
  pixelCrop: PixelCrop,
  fileName: string,
  mimeType = 'image/jpeg',
): Promise<File> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement('canvas');

  // 출력 크기 고정 — zoom·원본 해상도와 무관하게 일정한 파일이 생성됨
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D 컨텍스트를 가져올 수 없습니다.');
  }

  ctx.drawImage(
    image,
    pixelCrop.x, // 원본에서 crop 시작 x
    pixelCrop.y, // 원본에서 crop 시작 y
    pixelCrop.width, // 원본에서 crop 너비 (zoom 클수록 이 값이 작아짐)
    pixelCrop.height, // 원본에서 crop 높이
    0,
    0,
    OUTPUT_SIZE, // 고정 출력 너비로 스트레칭
    OUTPUT_SIZE, // 고정 출력 높이로 스트레칭
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('이미지 변환에 실패했습니다.'));
          return;
        }
        resolve(new File([blob], fileName, { type: mimeType }));
      },
      mimeType,
      0.9,
    );
  });
}
